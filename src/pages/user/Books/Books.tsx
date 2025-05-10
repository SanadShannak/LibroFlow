import { useState } from 'react';
import { MantineProvider, Container, Box, ScrollArea, Text, Title, Group, Modal, Notification, Button, SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import classes from './BooksPage.module.css';
import { initialBooks, Book } from '../../../dummyData/userPages/booksData';
import BooksActions from './components/BooksActions/BooksActions';
import BooksTable from './components/BooksTable/BooksTable';
import { useBorrowedBooks } from '../../../context/BorrowedBooksContext';

const UserBooks = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [reservedDates, setReservedDates] = useState<Date[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const { addBorrowedBook } = useBorrowedBooks();

  const filteredData = books.filter((book) => {
    const matchesSearch =
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.id.toString().includes(searchQuery);
    const matchesType = typeFilter ? book.type === typeFilter : true;
    const matchesLanguage = languageFilter ? book.language === languageFilter : true;
    const matchesAvailability = availabilityFilter ? book.availability === availabilityFilter : true;
    return matchesSearch && matchesType && matchesLanguage && matchesAvailability;
  });

  // Generate list of dates between minDate and maxDate
  const minDate = new Date('2025-05-10');
  const maxDate = new Date('2025-06-10');
  const dateList: Date[] = [];
  let currentDate = new Date(minDate);
  while (currentDate <= maxDate) {
    dateList.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Check if a date is unavailable for all copies of the book
  const isDateUnavailable = (date: Date) => {
    if (!selectedBook) return true;

    const totalCopies = selectedBook.quantity;
    const reservationsOnDate = selectedBook.reservations.reduce((count, reservation) => {
      return count + (reservation.reservedDates.some(d => d.toDateString() === date.toDateString()) ? 1 : 0);
    }, 0);

    const isFullyReserved = reservationsOnDate >= totalCopies;

    const isInUnavailableDates = selectedBook.unavailableDates.some(unavailableDate =>
      unavailableDate.toDateString() === date.toDateString()
    );

    return isFullyReserved || isInUnavailableDates;
  };

  // Validate if dates are consecutive
  const areDatesConsecutive = (dates: Date[]) => {
    if (dates.length <= 1) return true;
    const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());
    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const nextDate = new Date(sortedDates[i]);
      prevDate.setDate(prevDate.getDate() + 1);
      if (prevDate.toDateString() !== nextDate.toDateString()) {
        return false;
      }
    }
    return true;
  };

  // Toggle date selection with consecutive days enforcement
  const toggleDate = (date: Date) => {
    if (isDateUnavailable(date)) return;

    setReservedDates((prev) => {
      let newDates: Date[];
      if (prev.some((d) => d.toDateString() === date.toDateString())) {
        // Remove date
        newDates = prev.filter((d) => d.toDateString() !== date.toDateString());
      } else {
        // Add date
        newDates = [...prev, date];
      }

      // Check if new selection is consecutive
      if (!areDatesConsecutive(newDates)) {
        setErrorMessage('Please select consecutive dates only.');
        return prev; // Don't update if not consecutive
      }

      setErrorMessage(null); // Clear error if consecutive
      return newDates;
    });
  };

  // Handle reserve action
  const handleReserve = (book: Book) => {
    setSelectedBook(book);
    setReservedDates([]);
    setErrorMessage(null);
    open();
  };

  // Confirm reservation
  const confirmReservation = () => {
    if (!selectedBook || reservedDates.length === 0) {
      setErrorMessage('Please select at least one date to reserve.');
      return;
    }

    // Find an available copy for all selected dates
    const totalCopies = selectedBook.quantity;
    const reservedCopyIds = new Set(selectedBook.reservations.map((r) => r.copyId));
    let availableCopyId: number | null = null;

    for (let i = 1; i <= totalCopies; i++) {
      const copyReservations = selectedBook.reservations.find((r) => r.copyId === i)?.reservedDates || [];
      const isCopyAvailableForDates = reservedDates.every(
        (date) => !copyReservations.some((d) => d.toDateString() === date.toDateString())
      );
      if (isCopyAvailableForDates && (!reservedCopyIds.has(i) || copyReservations.length === 0)) {
        availableCopyId = i;
        break;
      }
    }

    if (!availableCopyId) {
      setErrorMessage('No copies are available for the selected dates.');
      return;
    }

    // Update the book's reservations
    setBooks((books) =>
      books.map((b) => {
        if (b.id === selectedBook.id) {
          const existingReservation = b.reservations.find((r) => r.copyId === availableCopyId);
          if (existingReservation) {
            return {
              ...b,
              reservations: b.reservations.map((r) =>
                r.copyId === availableCopyId
                  ? { ...r, reservedDates: [...new Set([...r.reservedDates, ...reservedDates])] }
                  : r
              ),
              reservedQuantity: Math.min(b.reservedQuantity + 1, b.quantity),
              unavailableDates: [...new Set([...b.unavailableDates, ...reservedDates])],
            };
          } else {
            return {
              ...b,
              reservations: [...b.reservations, { copyId: availableCopyId, reservedDates: [...reservedDates] }],
              reservedQuantity: Math.min(b.reservedQuantity + 1, b.quantity),
              unavailableDates: [...new Set([...b.unavailableDates, ...reservedDates])],
            };
          }
        }
        return b;
      })
    );

    // Add to borrowed books context (new reservations are not claimed or returned, no points)
    addBorrowedBook(selectedBook, reservedDates, availableCopyId, false, false, 0);

    close();
  };

  return (
    <MantineProvider>
      <Container fluid className={classes.container}>
        <Box className={classes.header}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box>
              <Title order={3} c="white" mb="xs">
                Book Management
              </Title>
              <Text size="sm" c="dimmed" style={{ textTransform: 'uppercase' }}>
                Total Unique Books: {filteredData.length}
              </Text>
            </Box>
            <Box>
              <BooksActions
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onTypeFilterChange={setTypeFilter}
                onLanguageFilterChange={setLanguageFilter}
                onAvailabilityFilterChange={setAvailabilityFilter}
                typeFilter={typeFilter}
                languageFilter={languageFilter}
                availabilityFilter={availabilityFilter}
                books={books}
              />
            </Box>
          </Box>
        </Box>

        <ScrollArea className={classes.tableScrollArea}>
          <Box className={classes.tableContainer}>
            <BooksTable books={filteredData} onReserve={handleReserve} />
          </Box>
        </ScrollArea>

        <Modal
          opened={opened}
          onClose={close}
          title={<Title order={4} c="white">Reserve {selectedBook?.name}</Title>}
          centered
          radius="lg"
          styles={{
            content: { backgroundColor: '#37474f', color: 'white', padding: '24px' },
            header: { backgroundColor: '#37474f', color: 'white', paddingBottom: '8px' },
            title: { color: 'white', fontWeight: 700 },
          }}
        >
          {errorMessage && (
            <Notification color="red" onClose={() => setErrorMessage(null)} mb="lg">
              {errorMessage}
            </Notification>
          )}
          <Text size="sm" mb="md" c="white">
            Select consecutive reservation dates (Available dates are clickable)
          </Text>
          <ScrollArea style={{ height: '200px', backgroundColor: '#263238', borderRadius: '8px', padding: '12px' }}>
            <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
              {dateList.map((date) => {
                const isUnavailable = isDateUnavailable(date);
                const isSelected = reservedDates.some((d) => d.toDateString() === date.toDateString());
                return (
                  <Box key={date.toISOString()} style={{ position: 'relative', width: '100%' }}>
                    <Button
                      onClick={() => toggleDate(date)}
                      disabled={isUnavailable}
                      variant={isSelected ? 'filled' : 'outline'}
                      color={isSelected ? '#4CAF50' : isUnavailable ? '#A0AEC0' : 'white'}
                      size="xs"
                      radius="md"
                      fullWidth
                      style={{
                        height: '40px',
                        opacity: isUnavailable ? 0.5 : 1,
                        transition: 'all 0.2s ease',
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                        padding: '0 8px',
                      }}
                      onMouseEnter={(e) => {
                        if (!isUnavailable) e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = isSelected ? 'scale(1.05)' : 'scale(1)';
                      }}
                    >
                      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </Button>
                    {isUnavailable && (
                      <Box
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          backgroundColor: '#F08080',
                          borderRadius: '50%',
                          width: '16px',
                          height: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                          zIndex: 1,
                        }}
                      >
                        <IconX size={10} color="white" stroke={2} />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </SimpleGrid>
          </ScrollArea>
          <Group justify="center" mt="lg">
            <Button onClick={close} color="#A0AEC0" radius="md" variant="outline">
              Cancel
            </Button>
            <Button onClick={confirmReservation} color="#4CAF50" radius="md">
              Confirm Reservation
            </Button>
          </Group>
        </Modal>
      </Container>
    </MantineProvider>
  );
};

export default UserBooks;