import { useState, useEffect, useRef } from 'react';
import { Container, Grid, Paper, Text, Stack, Group, Box, Select, Modal, Button, NumberInput, TextInput, ThemeIcon, SimpleGrid, Title, Table, Tooltip, ActionIcon } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import SummaryCards from '../../../components/SummaryCards';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import styles from './userDashboard.module.css';
import { userDashboardData } from '../../../dummyData/userPages/dashboardData';
import membershipImage from '../../../assets/membership.png';
import bookGenreImage from '../../../assets/book-genre.png';
import topBorrowedBookImage from '../../../assets/topBorrowedBook.png';

// Helper function to get the OpenAI API key based on the environment
const getOpenAIApiKey = () => {
  const reactAppKey = typeof process !== 'undefined' && process.env && process.env.REACT_APP_OPENAI_API_KEY;
  const viteKey = import.meta.env?.VITE_OPENAI_API_KEY;
  return reactAppKey || viteKey || '';
};

// Define the type for borrowed books
interface BorrowedBook {
  title: string;
  dueDate: string;
  status: string;
  genre?: string;
}

export default function UserDashboard() {
  const { kpis, genreTrends, upcomingEvents, borrowedBooks, topUsers, userRank, currentUser } = userDashboardData as {
    kpis: any[];
    genreTrends: any[];
    upcomingEvents: any[];
    borrowedBooks: BorrowedBook[];
    topUsers: any[];
    userRank: number;
    currentUser: any;
  };
  const [selectedBranch, setSelectedBranch] = useState<string | null>('Al-Zarqaa');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{ title: string; branch: string; location: string; date: string } | null>(null);
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [names, setNames] = useState<string[]>(['']);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookedEvents, setBookedEvents] = useState<Set<string>>(new Set());
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [recommendationReasons, setRecommendationReasons] = useState<string[]>([]);
  const [recommendationError, setRecommendationError] = useState<string | null>(null);
  const [borrowedBooksHeight, setBorrowedBooksHeight] = useState<number | undefined>(undefined);
  const borrowedBooksRef = useRef<HTMLDivElement>(null);

  // Measure the height of the borrowed books card
  useEffect(() => {
    const updateHeight = () => {
      if (borrowedBooksRef.current) {
        setBorrowedBooksHeight(borrowedBooksRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [borrowedBooks]);

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

  // Fetch recommendations and reasons from OpenAI API
  useEffect(() => {
    const fetchRecommendations = async () => {
      const apiKey = getOpenAIApiKey();

      if (!apiKey) {
        setRecommendationError('OpenAI API key is missing. Please configure it in the environment variables.');
        setRecommendations(['To Kill a Mockingbird', 'Brave New World', 'Jane Eyre', 'The Catcher in the Rye']);
        setRecommendationReasons(['', '', '', '']);
        return;
      }

      const prompt = `Based on the following borrowed books: ${borrowedBooks.map(book => book.title).join(', ')}, suggest 5 book titles that the user might enjoy, and for each book, provide a brief reason (1-2 sentences) explaining why it was recommended. Format the response as a JSON object with two arrays: 'books' for the titles and 'reasons' for the corresponding explanations, e.g., { "books": ["Book1", "Book2"], "reasons": ["Reason1", "Reason2"] }.`;
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a book recommendation assistant.' },
              { role: 'user', content: prompt },
            ],
            max_tokens: 300,
            temperature: 0.7,
          }),
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        const result = JSON.parse(data.choices[0].message.content.trim());
        setRecommendations(result.books.slice(0, 4)); // Limit to 4 recommendations
        setRecommendationReasons(result.reasons.slice(0, 4)); // Limit to 4 reasons
      } catch (error) {
        setRecommendationError('Failed to load recommendations. Please try again later.');
        setRecommendations(['To Kill a Mockingbird', 'Brave New World', 'Jane Eyre', 'The Catcher in the Rye']);
        setRecommendationReasons(['', '', '', '']);
      }
    };
    fetchRecommendations();
  }, [borrowedBooks]);

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
      <SimpleGrid cols={{ base: 1, sm: 3 }} mb="xl" spacing="17%" >
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
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#d1d1d1" />
      <stop offset="100%" stopColor="#d1d1d1" />
    </linearGradient>
  </defs>
  <XAxis dataKey="genre" stroke="#A0AEC0" />
  <YAxis stroke="#A0AEC0" />
  <RechartsTooltip
    contentStyle={{ backgroundColor: '#263238', border: 'none', color: '#fff' }}
  />
  <Bar
    dataKey="totalBooks"
    fill="url(#barGradient)"
    filter="url(#glow)"
    radius={[20, 20, 0, 0]}
    activeBar={{ fill: "#1f2d38", radius: 20, stroke: "#00d1b2", strokeWidth: 0.2 }}
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
              dropdown: { backgroundColor: '#263238', border: 'none' },
              option: {
                color: 'white',
                '&:hover': {
                  backgroundColor: '#A0AEC0',
                  color: '#263238',
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
                          {isBooked ? 'Book More?' : 'Book Ticket'}
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

      {/* Current Borrowed Books and Recommended Books */}
      <Grid gutter="md" className={styles.tableContainer}>
        {/* Current Borrowed Books Table */}
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Paper p="md" radius="lg" bg="#37474f" ref={borrowedBooksRef}>
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
        </Grid.Col>

        {/* AI Recommendations */}
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Paper p="md" radius="lg" bg="#37474f" style={{ height: borrowedBooksHeight ? `${borrowedBooksHeight}px` : 'auto' }}>
            <Title order={3} c="white" mb="md">
              AI Book Recommendations
            </Title>
            <Stack gap="sm">
              {recommendationError ? (
                <Text size="sm" c="#FF5252">{recommendationError}</Text>
              ) : recommendations.length > 0 ? (
                recommendations.map((book, index) => (
                  <Group key={index} align="center" justify="space-between">
                    <Text size="sm" c="#A0AEC0">{index + 1}. {book}</Text>
                    <Tooltip label={recommendationReasons[index] || 'Reason not available'} withArrow position="top" color="#263238">
                      <ActionIcon variant="transparent" color="gray">
                        <IconInfoCircle size={16} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                ))
              ) : (
                <Text size="sm" c="#A0AEC0">Loading recommendations...</Text>
              )}
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}