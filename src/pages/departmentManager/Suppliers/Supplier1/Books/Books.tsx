import { useState } from 'react';
import { MantineProvider, Container, Box, ScrollArea, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import classes from './BooksPage.module.css';
import { initialBooks, Book } from '../../../../../dummyData/adminPages/supplier1Books';
import BooksActions from './components/BooksActions/BooksActions';
import BooksTable from './components/BooksTable/BooksTable';
import AddBooksModal from './components/AddBooksModal/AddBooksModal';
import ViewBooksModal from './components/ViewBooksModal/ViewBooksModal';
import AddToOrderModal from './components/AddToOrderModal/AddToOrderModal';
import { useOrders } from '../../../../../OrderContext';
import { Order } from '../../../../../types/orders';

const SupplierBooksPage = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const { addOrder } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(null);

  // Modals
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [orderModalOpened, { open: openOrderModal, close: closeOrderModal }] = useDisclosure(false);
  const [viewModalOpened, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);

  const filteredData = books.filter((book) => {
    const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter ? book.type === typeFilter : true;
    const matchesLanguage = languageFilter ? book.language === languageFilter : true;
    const matchesAvailability = availabilityFilter ? book.availability === availabilityFilter : true;
    return matchesSearch && matchesType && matchesLanguage && matchesAvailability;
  });

  const handleAddBook = (newBook: Omit<Book, 'id' | 'availability' | 'savedBy'>) => {
    const newId = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;
    const availableQuantity = newBook.quantity - newBook.reservedQuantity;
    const availability = availableQuantity > 0 ? 'Available' : newBook.reservedQuantity > 0 ? 'Borrowed' : 'Not Available';
    setBooks([...books, { id: newId, ...newBook, availability, savedBy: 'Nisal Gunasekara (Admin)' }]);
    closeAddModal();
  };

  const handleAddToOrder = (book: Book, quantity: number) => {
    const totalPrice = quantity * book.pricePerOne;
    const orderId = uuidv4(); // Use uuid instead of Date.now()
    const orderDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const order: Order = { orderId, book, quantity, totalPrice, orderDate };
    addOrder(order);
    // Update book quantity
    setBooks(
      books.map((b) =>
        b.id === book.id
          ? { ...b, quantity: b.quantity - quantity, reservedQuantity: b.reservedQuantity + quantity }
          : b
      )
    );
    closeOrderModal();
  };

  const handleViewBook = (book: Book) => {
    setSelectedBook(book);
    openViewModal();
  };

  const handleAddToOrderClick = (book: Book) => {
    setSelectedBook(book);
    openOrderModal();
  };

  return (
    <MantineProvider>
      <Container fluid className={classes.container}>
        <Box className={classes.header}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box>
              <Title order={3} c="white" mb="xs">Supplier 1 Books</Title>
              <Text size="sm" c="dimmed" style={{ textTransform: 'uppercase' }}>
                Total Unique Books: {filteredData.length}
              </Text>
            </Box>
            <Box>
              <BooksActions
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAdd={openAddModal}
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
            <BooksTable
              books={filteredData}
              onShowDetails={handleViewBook}
              onAddToOrder={handleAddToOrderClick}
            />
          </Box>
        </ScrollArea>

        {addModalOpened && (
          <AddBooksModal
            opened={addModalOpened}
            onClose={closeAddModal}
            onAddBook={handleAddBook}
          />
        )}

        {orderModalOpened && selectedBook && (
          <AddToOrderModal
            opened={orderModalOpened}
            onClose={closeOrderModal}
            book={selectedBook}
            onAddToOrder={handleAddToOrder}
          />
        )}

        {viewModalOpened && selectedBook && (
          <ViewBooksModal
            opened={viewModalOpened}
            onClose={closeViewModal}
            book={selectedBook}
          />
        )}
      </Container>
    </MantineProvider>
  );
};

export default SupplierBooksPage;