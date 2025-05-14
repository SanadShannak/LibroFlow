import React, { useState } from 'react';
import {
  Box,
  Text,
  Group,
  Paper,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Avatar,
  Table,
  Progress,
  Button,
} from '@mantine/core';
import bookImage from '../../../assets/book.png';
import employeesImage from '../../../assets/employees.png';
import pendingOrdersImage from '../../../assets/pendingOrder.png';
import borrowedBooksImage from '../../../assets/borrowedBooks.png';
import { LineChart, BarChart } from '@mantine/charts';
import { IconRefresh, IconPlus } from '@tabler/icons-react';
import styles from './DepManagerPageStyles.module.css';
import theme from '../../../utils/theme';
import AddEventModal from '../components/DepAddEvent/AddEventModal';

// Define the MiniDashboardItem interface
interface MiniDashboardItem {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  bgImage?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Define the Event interface
interface Event {
  title: string;
  date: string;
  location: string;
  progress: number;
}

// Dummy data definitions
const miniDashboardData: MiniDashboardItem[] = [
  {
    title: "Total Books",
    value: "1,245",
    subtitle: "+5% from last month",
    subtitleColor: "#4CAF50",
    bgImage: bookImage,
  },
  {
    title: "Active Members",
    value: "342",
    subtitle: "-2% from last month",
    subtitleColor: "#EF5350",
    bgImage: employeesImage,
  },
  {
    title: "Borrowed Books",
    value: "189",
    subtitle: "+10% this week",
    subtitleColor: "#4CAF50",
    bgImage: borrowedBooksImage,
  },
  {
    title: "Pending Tasks",
    value: "12",
    subtitle: "Due this week",
    subtitleColor: "#FFB300",
    bgImage: pendingOrdersImage,
  },
];

const topEmployees = [
  {
    name: "Alice Johnson",
    department: "Fiction",
    color: "blue",
  },
  {
    name: "Bob Smith",
    department: "Non-Fiction",
    color: "green",
  },
  {
    name: "Clara Davis",
    department: "Children's",
    color: "purple",
  },
];

const mostBorrowedBooks = [
  { title: "To Kill a Mockingbird", borrows: 45 },
  { title: "1984", borrows: 38 },
  { title: "Pride and Prejudice", borrows: 32 },
  { title: "The Great Gatsby", borrows: 29 },
];

const ongoingCompetitions = [
  { name: "Reading Challenge 2025", endDate: "2025-06-30" },
  { name: "Book Review Contest", endDate: "2025-05-20" },
  { name: "Literary Quiz", endDate: "2025-05-15" },
];

const inventoryData = [
  { month: "Jan", books: 1200 },
  { month: "Feb", books: 1220 },
  { month: "Mar", books: 1180 },
  { month: "Apr", books: 1240 },
  { month: "May", books: 1260 },
];

const employeePerformanceData = [
  { name: "Alice", performance: 85 },
  { name: "Bob", performance: 78 },
  { name: "Clara", performance: 92 },
  { name: "David", performance: 65 },
];

// Initial upcoming events
const initialUpcomingEvents: Event[] = [
  {
    title: "Book Club Meeting",
    date: "2025-05-15",
    location: "Main Hall",
    progress: 80,
  },
  {
    title: "Author Talk: Jane Doe",
    date: "2025-05-20",
    location: "Room 101",
    progress: 50,
  },
  {
    title: "Children's Story Time",
    date: "2025-05-25",
    location: "Kids Area",
    progress: 30,
  },
];

// Interface for SummaryCardProps
interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  bgImage?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const LocalSummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  subtitleColor,
  bgImage,
}) => (
  <Paper p="sm" radius="18" bg="#37474f" className={styles.summaryCard}>
    <Box style={{ position: 'relative', flex: 1, zIndex: 1 }}>
      <Group gap="1" className={styles.circles}>
        <ThemeIcon color="red" size="sm" radius="xl" />
        <ThemeIcon color="yellow" size="sm" radius="xl" />
      </Group>
      <Stack gap={2} pt={6} className={styles.content}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.value}>{value}</Text>
        <Text className={styles.subtitle} style={{ color: subtitleColor }}>
          {subtitle}
        </Text>
      </Stack>
    </Box>
    <Box className={styles.bgContainer}>
      {bgImage && <img src={bgImage} alt="background" className={styles.bgIcon} width="130px" />}
    </Box>
  </Paper>
);

const DepartmentManagerDashboard: React.FC = () => {
  // State for upcoming events
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>(initialUpcomingEvents);
  // State for modal
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // State for new event form
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    date: '',
    location: '',
    progress: 0,
  });
  const [addDateInput, setAddDateInput] = useState<string>('');
  const [addDateError, setAddDateError] = useState<string | null>(null);

  // Handle input changes
  const handleTitleChange = (title: string): void => {
    setNewEvent((prev) => ({ ...prev, title }));
  };

  const handleLocationChange = (location: string): void => {
    setNewEvent((prev) => ({ ...prev, location }));
  };

  const handleProgressChange = (progress: number): void => {
    setNewEvent((prev) => ({ ...prev, progress }));
  };

  const handleDateChange = (date: string): void => {
    setAddDateInput(date);
    setAddDateError(null);
    setNewEvent((prev) => ({ ...prev, date }));
    // Validate date
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date && selectedDate < today) {
      setAddDateError('Event date must be today or in the future');
    }
  };

  // Format date for display
  const formatDateForDisplay = (date: string): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle adding new event
  const handleAddEvent = (): void => {
    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.location ||
      newEvent.progress < 0 ||
      newEvent.progress > 100
    ) {
      alert('Please fill in all fields correctly.');
      return;
    }
    if (addDateError) {
      alert('Please fix the date error.');
      return;
    }
    setUpcomingEvents((prev) => [...prev, newEvent]);
    // Reset form and close modal
    setNewEvent({ title: '', date: '', location: '', progress: 0 });
    setAddDateInput('');
    setAddDateError(null);
    setModalOpened(false);
  };

  // Custom Tooltip Component for charts
  interface ChartTooltipProps {
    payload?: Array<{ value?: any; name?: string; payload?: any }>;
    label?: string;
  }

  const CustomTooltip: React.FC<ChartTooltipProps> = ({ payload, label }) => {
    if (!payload || !payload.length) return null;
    const value = payload[0].value;
    const name = payload[0].name === 'books' ? 'Books' : 'Performance';

    return (
      <Paper
        p="xs"
        radius="sm"
        style={{
          backgroundColor: '#455A64',
          borderColor: '#546E7A',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
          color: 'white',
          padding: '10px',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: '5px' }}>
          {label}
        </Text>
        <Text style={{ color: 'white' }}>
          {name}: {value}
        </Text>
      </Paper>
    );
  };

  return (
    <Box className={styles.container}>
      <SimpleGrid cols={{ base: 1, sm: 4 }} mb="xl" spacing="4%">
        {miniDashboardData.map((data, index) => (
          <LocalSummaryCard
            key={index}
            title={data.title}
            value={data.value}
            subtitle={data.subtitle}
            subtitleColor={data.subtitleColor}
            bgImage={data.bgImage}
            icon={data.icon}
          />
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="md">
        <Box className={styles.responsibilitiesWrapper}>
          <Paper
            p="lg"
            radius="lg"
            bg={theme.colors.darkBlueLighter}
            className={styles.responsibilitiesContainer}
          >
            <Text size="xl" c={theme.colors.white} fw={700} mb="lg">
              Department Overview
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
              <Paper
                p="md"
                radius="md"
                bg={theme.colors.transparentWhiteDarker}
                className={styles.chartCard}
              >
                <Text size="md" c={theme.colors.white} fw={600} mb="sm">
                  Inventory Trends
                </Text>
                <LineChart
                  h={250}
                  w="100%"
                  data={inventoryData}
                  dataKey="month"
                  series={[{ name: 'books', color: 'cyan.5' }]}
                  curveType="monotone"
                  withLegend={false}
                  strokeWidth={3}
                  tickLine="none"
                  gridAxis="xy"
                  withDots={true}
                  dotProps={{ r: 4, strokeWidth: 2, stroke: theme.colors.lightBlue }}
                  xAxisProps={{ stroke: '#A0AEC0', color: '#A0AEC0' }}
                  yAxisProps={{
                    stroke: '#A0AEC0',
                    domain: [
                      Math.min(...inventoryData.map((data) => data.books)) - 5,
                      Math.max(...inventoryData.map((data) => data.books)) + 5,
                    ],
                    tickCount: inventoryData.length,
                    color: '#A0AEC0',
                  }}
                  gridProps={{ stroke: theme.colors.blueishGrey, strokeOpacity: 0.2 }}
                  withTooltip
                  tooltipProps={{
                    content: ({ payload, label }: ChartTooltipProps) => (
                      <CustomTooltip payload={payload} label={label} />
                    ),
                  }}
                  className={styles.lineChartAnimation}
                />
              </Paper>
              <Paper
                p="md"
                radius="md"
                bg={theme.colors.transparentWhiteDarker}
                className={styles.chartCard}
              >
                <Text size="md" c={theme.colors.white} fw={600} mb="sm">
                  Employee Performance
                </Text>
                <BarChart
                  h={250}
                  data={employeePerformanceData}
                  dataKey="name"
                  series={[{ name: 'performance', color: 'yellow.5' }]}
                  withLegend={false}
                  tickLine="none"
                  gridAxis="xy"
                  barProps={{ radius: 4 }}
                  xAxisProps={{ color: '#A0AEC0' }}
                  yAxisProps={{ stroke: 'white', color: '#A0AEC0' }}
                  gridProps={{ stroke: theme.colors.blueishGrey, strokeOpacity: 0.3 }}
                  withTooltip
                  tooltipProps={{
                    content: ({ payload, label }: ChartTooltipProps) => (
                      <CustomTooltip payload={payload} label={label} />
                    ),
                    cursor: false,
                  }}
                  className={styles.employeePerformanceChart}
                />
              </Paper>
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="lg">
              <Paper p="md" radius="md" bg="#37474f" className={styles.cardTable}>
                <Text size="sm" fw={700} c="white" ta="center" mb="md">
                  Most Borrowed Books
                </Text>
                <Table verticalSpacing="xs" horizontalSpacing="sm">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th c="white" fz="xs" fw={600}>
                        Title
                      </Table.Th>
                      <Table.Th c="white" fz="xs" fw={600}>
                        Borrows
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {mostBorrowedBooks.map((book, index) => (
                      <Table.Tr key={index}>
                        <Table.Td c="#A0AEC0" fz="xs">
                          {book.title}
                        </Table.Td>
                        <Table.Td c="#A0AEC0" fz="xs">
                          {book.borrows}
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Paper>
              <Paper p="md" radius="md" bg="#37474f" className={styles.cardTable}>
                <Text size="sm" fw={700} c="white" ta="center" mb="md">
                  Ongoing Competitions
                </Text>
                <Table verticalSpacing="xs" horizontalSpacing="sm">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th c="white" fz="xs" fw={600}>
                        Name
                      </Table.Th>
                      <Table.Th c="white" fz="xs" fw={600}>
                        End Date
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {ongoingCompetitions.map((comp, index) => (
                      <Table.Tr key={index}>
                        <Table.Td c="#A0AEC0" fz="xs">
                          {comp.name}
                        </Table.Td>
                        <Table.Td c="#A0AEC0" fz="xs">
                          {comp.endDate}
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Paper>
            </SimpleGrid>
          </Paper>
        </Box>

        <Stack gap="md" style={{ gridColumn: 'span 1', gridRow: 'span 2' }}>
          <Paper p="md" pl={12} radius="lg" bg="#37474f" className={styles.topEmployees}>
            <Text mb="md" size="lg" fw={700} c="white" ta="center">
              Top Employees
            </Text>
            <Stack gap="lg">
              {topEmployees.map((e, i) => (
                <Group key={i} justify="space-between" wrap="nowrap">
                  <Group wrap="nowrap">
                    <Avatar color={e.color} radius="xl" size="md">
                      {e.name.split(' ').map((n) => n[0]).join('')}
                    </Avatar>
                    <Stack gap={0}>
                      <Text size="sm" c="white">
                        {e.name}
                      </Text>
                      <Text size="xs" c="#A0AEC0">
                        Department: {e.department}
                      </Text>
                    </Stack>
                  </Group>
                  <ThemeIcon
                    size="sm"
                    radius="xl"
                    color="dark"
                    variant="outline"
                    style={{ borderColor: '#A0AEC0', cursor: 'pointer' }}
                  >
                    <IconRefresh size={14} color="#A0AEC0" />
                  </ThemeIcon>
                </Group>
              ))}
            </Stack>
          </Paper>
          <Paper p="md" radius="lg" bg="#37474f" className={styles.upcomingEvents}>
            <Group mb="md" justify="space-between" align="center">
              <Text size="lg" fw={700} c="white">
                Upcoming Events
              </Text>
              <Button
                size="xs"
                variant="filled"
                style={{ backgroundColor: theme.colors.darkBlueLighter }}
                onClick={() => setModalOpened(true)}
                leftSection={<IconPlus size={14} />}
              >
                Add Event
              </Button>
            </Group>
            <Stack gap="md">
              {upcomingEvents.map((event, index) => (
                <Box key={index}>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" fw={600} c="white">
                      {event.title}
                    </Text>
                    <Text size="xs" c="#A0AEC0">
                      {event.date}
                    </Text>
                  </Group>
                  <Group justify="space-between" mb={2} align="center">
                    <Text size="xs" c="#A0AEC0">
                      {event.location}
                    </Text>
                    <Text size="xs" c="#4CAF50">
                      {event.progress}%
                    </Text>
                  </Group>
                  <Progress
                    value={event.progress}
                    size="xs"
                    radius="xs"
                    color={event.progress > 70 ? 'green' : event.progress > 40 ? 'yellow' : 'blue'}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </SimpleGrid>

      <AddEventModal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setNewEvent({ title: '', date: '', location: '', progress: 0 });
          setAddDateInput('');
          setAddDateError(null);
        }}
        newEvent={newEvent}
        addDateInput={addDateInput}
        addDateError={addDateError}
        onAddEvent={handleAddEvent}
        onTitleChange={handleTitleChange}
        onLocationChange={handleLocationChange}
        onProgressChange={handleProgressChange}
        onDateChange={handleDateChange}
        formatDateForDisplay={formatDateForDisplay}
      />
    </Box>
  );
};

export default DepartmentManagerDashboard;