import { useState } from 'react';
import { Container, Grid, Paper, Table, Text, Stack, Group, Box, Select, Modal, Button, NumberInput, TextInput, ThemeIcon, SimpleGrid } from '@mantine/core';
import SummaryCards from '../../../components/SummaryCards';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './userDashboard.module.css';
import { userDashboardData } from '../../../dummyData/userPages/dashboardData';
import membershipImage from '../../../assets/membership.png';
import bookGenreImage from '../../../assets/book-genre.png';
import topBorrowedBookImage from '../../../assets/topBorrowedBook.png';

export default function UserDashboard() {
  const { kpis, genreTrends, upcomingEvents, borrowedBooks, topUsers, userRank, currentUser } = userDashboardData;
  const [selectedBranch, setSelectedBranch] = useState<string | null>('Al-Zarqaa');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{ title: string; branch: string; location: string; date: string } | null>(null);
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [names, setNames] = useState<string[]>(['']);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookedEvents, setBookedEvents] = useState<Set<string>>(new Set());

  // Filter events by selected branch
  const filteredEvents = upcomingEvents.filter(event => event.branch === selectedBranch);

  // Generate unique event ID for tracking bookings
  const getEventId = (event: { title: string; branch: string; date: string }) =>
    `${event.title}-${event.branch}-${event.date}`;

  // Handle booking button click
  const handleBookPlace = (event: { title: string; branch: string; location: string; date: string }) => {
    setSelectedEvent(event);
    setTicketCount(1);
    setNames(['']);
    setBookingConfirmed(false);
    setModalOpen(true);
  };

  // Update names array based on ticket count
  const handleTicketCountChange = (value: number) => {
    setTicketCount(value);
    setNames(prev => {
      const newNames = [...prev];
      while (newNames.length < value) newNames.push('');
      while (newNames.length > value) newNames.pop();
      return newNames;
    });
  };

  // Handle name input change
  const handleNameChange = (index: number, value: string) => {
    setNames(prev => {
      const newNames = [...prev];
      newNames[index] = value;
      return newNames;
    });
  };

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (names.every(name => name.trim() !== '') && selectedEvent) {
      setBookedEvents(prev => new Set(prev).add(getEventId(selectedEvent)));
      setBookingConfirmed(true);
    }
  };

  // Define SummaryCards configurations
  const cardConfigs = [
    {
      title: 'Total Books Borrowed',
      subtitle: 'Books this year',
      subtitleColor: '#4CAF50',
      bgImage: topBorrowedBookImage,
      image: topBorrowedBookImage,
      value: kpis[0].value,
    },
    {
      title: 'Top Genre',
      subtitle: 'Most borrowed',
      subtitleColor: '#2196F3',
      bgImage: bookGenreImage,
      image: bookGenreImage,
      value: kpis[1].value,
    },
    {
      title: 'Membership Status',
      subtitle: kpis[2].value === 'Active' ? `Valid until ${kpis[3].value}` : 'Expired',
      subtitleColor: '#FFC107',
      bgImage: membershipImage,
      image: membershipImage,
      value: kpis[2].value,
    },
  ];

  // Prepare the display list for top users
  const displayUsers = userRank <= 10
    ? topUsers.map((user, index) =>
        userRank - 1 === index ? { name: 'Sanad Shannak', credits: user.credits } : user
      )
    : [...topUsers, { name: 'Sanad Shannak', credits: currentUser ? currentUser.credits : 50 }];

  return (
    <Container size="xl" className={styles.container}>
      {/* Booking Modal */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={bookingConfirmed ? 'Booking Confirmation' : 'Book Your Place'}
        centered
        radius="lg"
        styles={{
          content: { backgroundColor: '#37474f', color: 'white' },
          header: { backgroundColor: '#37474f', color: 'white' },
          title: { color: 'white', fontWeight: 700 },
        }}
      >
        {selectedEvent && (
          <Stack gap="md">
            {bookingConfirmed ? (
              <>
                <Text size="sm" c="#A0AEC0">
                  Booking confirmed for <strong>{names.join(', ')}</strong> for <strong>{selectedEvent.title}</strong> at{' '}
                  <strong>{selectedEvent.branch} - {selectedEvent.location}</strong> on <strong>{selectedEvent.date}</strong>.
                </Text>
                <Button
                  onClick={() => setModalOpen(false)}
                  color="#4CAF50"
                  radius="md"
                  fullWidth
                >
                  Close
                </Button>
              </>
            ) : (
              <>
                <Text size="sm" c="#A0AEC0">
                  Booking for <strong>{selectedEvent.title}</strong> at{' '}
                  <strong>{selectedEvent.branch} - {selectedEvent.location}</strong> on <strong>{selectedEvent.date}</strong>.
                </Text>
                <NumberInput
                  label="Number of Tickets"
                  value={ticketCount}
                  onChange={(value) => handleTicketCountChange(value as number)}
                  min={1}
                  max={5}
                  clampBehavior="strict"
                  styles={{
                    label: { color: 'white' },
                    input: { backgroundColor: '#263238', color: 'white', border: 'none' },
                  }}
                />
                {names.map((name, index) => (
                  <TextInput
                    key={index}
                    label={`Name for Ticket ${index + 1}`}
                    value={name}
                    onChange={(e) => handleNameChange(index, e.currentTarget.value)}
                    placeholder="Enter full name"
                    styles={{
                      label: { color: 'white' },
                      input: { backgroundColor: '#263238', color: 'white', border: 'none' },
                    }}
                    error={name.trim() === '' && names.some(n => n.trim() !== '') ? 'Name is required' : null}
                  />
                ))}
                <Group justify="space-between">
                  <Button
                    onClick={() => setModalOpen(false)}
                    color="#A0AEC0"
                    radius="md"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmBooking}
                    color="#4CAF50"
                    radius="md"
                    disabled={names.some(name => name.trim() === '')}
                  >
                    Confirm Booking
                  </Button>
                </Group>
              </>
            )}
          </Stack>
        )}
      </Modal>

      {/* KPIs */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} mb="xl" spacing="6%" >
        {cardConfigs.map((config, index) => (
          <SummaryCards
        key={index}
        title={config.title}
        value={config.value}
        subtitle={config.subtitle}
        subtitleColor={config.subtitleColor}
        bgImage={config.bgImage}
        bgImageSize="120px"
          />
        ))}
      </SimpleGrid>

      {/* Borrows by Genre Bar Chart and Top Users Table */}
      <Grid gutter="md" className={styles.chartContainer}>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Paper p="md" radius="lg" bg="#37474f" style={{ minHeight: 350, maxHeight: 300 }}>
            <Text size="lg" fw={700} c="white" mb="md" ta="center">
              Borrows by Genre
            </Text>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={genreTrends} margin={{ left: 0, right: 0 }}>
                <XAxis dataKey="genre" stroke="#A0AEC0" />
                <YAxis stroke="#A0AEC0" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#263238', border: 'none', color: '#fff' }}
                />
                <Bar
                  dataKey="totalBooks"
                  fill="#4CAF50"
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                  radius={[12, 12, 0, 0]} // Curvier bars
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Paper p="md" radius="lg" bg="#37474f" style={{ minHeight: 350, maxHeight: 350, overflowY: 'auto' }}>
            <Text size="lg" fw={700} c="white" mb="md">
              Top Users
            </Text>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th c="white" w={60}>Rank</Table.Th>
                  <Table.Th c="white">Name</Table.Th>
                  <Table.Th c="white">No. Credits</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {displayUsers.map((user, index) => {
                  const displayRank = userRank > 10 && index === displayUsers.length - 1 ? userRank : index + 1;
                  const rankBadge = displayRank === 1 ? '1st' : displayRank === 2 ? '2nd' : displayRank === 3 ? '3rd' : displayRank;
                  const badgeColor = displayRank === 1 ? '#FFD700' : displayRank === 2 ? '#C0C0C0' : displayRank === 3 ? '#CD7F32' : '#A0AEC0';
                  const isCurrentUser = userRank === displayRank;
                  return (
                    <Table.Tr
                      key={index}
                      style={{
                        background: isCurrentUser ? '#4a5961' : 'transparent',
                        borderRadius: isCurrentUser ? '8px' : '0',
                        transition: 'transform 0.2s, background 0.2s',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          background: '#4a5961',
                        },
                      }}
                    >
                      <Table.Td c="white">
                        {displayRank <= 3 ? (
                          <ThemeIcon color={badgeColor} size="md" radius="xl">
                            <Text size="xs" fw={700} c="white">{rankBadge}</Text>
                          </ThemeIcon>
                        ) : (
                          <Text size="xs" c="#A0AEC0">{rankBadge}</Text>
                        )}
                      </Table.Td>
                      <Table.Td c="white">{user.name}</Table.Td>
                      <Table.Td c="white">{user.credits}</Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Upcoming Events */}
      <Paper p="md" radius="lg" bg="#37474f" className={styles.eventsContainer}>
        <Group mb="md" justify="space-between" align="center">
          <Text size="lg" fw={700} c="white">
            Upcoming Events
          </Text>
          <Select
            value={selectedBranch}
            onChange={setSelectedBranch}
            data={['Al-Zarqaa', 'Shmeisani', 'Jabal Amman']}
            placeholder="Select branch"
            size="sm"
            styles={{
              input: { backgroundColor: '#263238', color: 'white', border: 'none' },
              dropdown: { backgroundColor: '#263238' },
              option: {
                color: 'white',
                '&:hover': {
                  backgroundColor: '#A0AEC0',
                  color: '#263238', // Dark grey-blue text on hover
                },
              },
            }}
          />
        </Group>
        <Stack gap="md">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => {
              const eventId = getEventId(event);
              const isBooked = bookedEvents.has(eventId);
              return (
                <Box key={index}>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" fw={600} c="white">{event.title}</Text>
                    <Text size="xs" c="#A0AEC0">{event.date}</Text>
                  </Group>
                  <Group justify="space-between" mb={2} align="center">
                    <Text size="xs" c="#A0AEC0">{event.branch} - {event.location}</Text>
                    {event.hasSpace ? (
                      <Group gap="xs">
                        <Text size="xs" c={isBooked ? '#FFC107' : '#4CAF50'}>
                          {isBooked ? 'Already Booked' : 'Spaces Available'}
                        </Text>
                        <Button
                          size="xs"
                          color="#4CAF50"
                          radius="md"
                          onClick={() => handleBookPlace(event)}
                        >
                          {isBooked ? 'Book More?' : 'Book Place'}
                        </Button>
                      </Group>
                    ) : (
                      <Text size="xs" c="#FF5252">Sorry, this event is fully booked.</Text>
                    )}
                  </Group>
                </Box>
              );
            })
          ) : (
            <Text size="sm" c="#A0AEC0" ta="center">Please select a branch to view upcoming events</Text>
          )}
        </Stack>
      </Paper>

      {/* Current Borrowed Books Table */}
      <Paper p="md" radius="lg" bg="#37474f" className={styles.tableContainer}>
        <Text size="lg" fw={700} c="white" mb="md" ta="center">
          Current Borrowed Books
        </Text>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th c="white">Book Title</Table.Th>
              <Table.Th c="white">Due Date</Table.Th>
              <Table.Th c="white">Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {borrowedBooks.map((book, index) => (
              <Table.Tr key={index}>
                <Table.Td c="white">{book.title}</Table.Td>
                <Table.Td c="white">{book.dueDate}</Table.Td>
                <Table.Td>
                  <Text
                    size="sm"
                    c={
                      book.status === 'Overdue'
                        ? 'red'
                        : book.status === 'Due Soon'
                        ? 'yellow'
                        : 'green'
                    }
                  >
                    {book.status}
                  </Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Container>
  );
}