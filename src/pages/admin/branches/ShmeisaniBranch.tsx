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
} from '@mantine/core';
import { LineChart, BarChart } from '@mantine/charts';
import {
  IconChevronDown,
  IconChevronUp,
  IconRefresh,
} from '@tabler/icons-react';
import { IoIosPerson, IoMdBook } from 'react-icons/io';
import { MdPendingActions } from 'react-icons/md';
import styles from '../../../styles/shmeisaniBranchStyles.module.css';
import theme from '../../../utils/theme';

// Background icons
import bookImage from '../../../assets/book.png';

interface Responsibility {
  title: string;
  subItems?: string[];
  action?: () => void;
}

const responsibilities: Responsibility[] = [
  { 
    title: 'Manage Employees', 
    subItems: ['Add employees/give employee roles'],
    action: () => console.log('Navigating to Employee Management')
  },
  { 
    title: 'Monitor Department Performance',
    action: () => console.log('Opening Performance Dashboard')
  },
  { 
    title: 'Make Book Order', 
    subItems: ['Ask approval from accountant', 'Report on order status to accountant'],
    action: () => console.log('Initiating Book Order')
  },
  { 
    title: 'Manage Book Inventory', 
    subItems: ['Add/Remove Books'],
    action: () => console.log('Opening Inventory Management')
  },
  { 
    title: 'Department-specific dashboard', 
    subItems: ['Top Books/Top Customers, etc.', 'View borrowed books (department-specific) and their status'],
    action: () => console.log('Viewing Department Dashboard')
  },
  { 
    title: 'Chat with supplier',
    action: () => console.log('Opening Supplier Chat')
  },
  { 
    title: 'Chatbot',
    action: () => console.log('Opening Chatbot')
  },
];

const miniDashboardData = [
  {
    title: 'Total Employees',
    value: '15',
    subtitle: '+2 this month',
    subtitleColor: '#4CAF50',
    icon: IoIosPerson,
  },
  {
    title: 'Books in Inventory',
    value: '320',
    subtitle: '-5 this month',
    subtitleColor: '#F44336',
    bgImage: bookImage,
  },
  {
    title: 'Pending Orders',
    value: '3',
    subtitle: 'Awaiting approval',
    subtitleColor: '#FF9800',
    icon: MdPendingActions,
  },
  {
    title: 'Borrowed Books',
    value: '45',
    subtitle: '+3 this month',
    subtitleColor: '#4CAF50',
    icon: IoMdBook,
  },
];

const topEmployees = [
  { name: 'Kareem Abu-sharifeh', branch: 'Shmeisani', color: 'yellow' },
  { name: 'Motasem AlAtawneh', branch: 'Yajouz', color: 'gray' },
  { name: 'Ahmad Aljazaere', branch: 'Tabarbour', color: 'gray' },
];

const mostBorrowedBooks = [
  { title: 'The Great Gatsby', borrows: 42 },
  { title: '1984', borrows: 35 },
  { title: 'To Kill a Mockingbird', borrows: 28 },
];

const ongoingCompetitions = [
  { name: 'Summer Reading Challenge', endDate: 'Aug 15, 2025' },
  { name: 'Book Trivia Contest', endDate: 'Jul 30, 2025' },
];

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
  icon: Icon,
}) => (
  <Paper
    p="sm"
    radius="18"
    bg="#37474f"
    className={styles.summaryCard}
  >
    <Box style={{ position: 'relative', flex: 1, zIndex: 1 }}>
      {/* Top-right Circles */}
      <Group gap="1" className={styles.circles}>
        <ThemeIcon color="red" size="sm" radius="xl" />
        <ThemeIcon color="yellow" size="sm" radius="xl" />
      </Group>

      {/* Left-aligned Content */}
      <Stack gap={2} pt={6} className={styles.content}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.value}>{value}</Text>
        <Text className={styles.subtitle} style={{ color: subtitleColor }}>
          {subtitle}
        </Text>
      </Stack>
    </Box>

    {/* Background Image/Icon on the right */}
    <Box className={styles.bgContainer}>
      {bgImage && <img src={bgImage} alt="background" className={styles.bgIcon} />}
      {Icon && <Icon className={styles.reactIcon} />}
    </Box>
  </Paper>
);

const ShmeisaniBranch: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Sample data for charts
  const inventoryData = [
    { month: 'Jan', books: 300 },
    { month: 'Feb', books: 310 },
    { month: 'Mar', books: 305 },
    { month: 'Apr', books: 320 },
    { month: 'May', books: 315 },
    { month: 'Jun', books: 320 },
  ];

  const employeePerformanceData = [
    { name: 'Sanad', performance: 95 },
    { name: 'Motasem', performance: 85 },
    { name: 'Ahmad', performance: 80 },
    { name: 'Others', performance: 70 },
  ];

  return (
    <Box className={styles.container}>
      <SimpleGrid cols={{ base: 1, sm: 4 }} mb="xl" spacing="sm" mr={20}>
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
              Admin Dashboard Overview
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
                  data={inventoryData}
                  dataKey="month"
                  series={[{ name: 'books', color: 'cyan.5' }]}
                  curveType="monotone"
                  withLegend={false}
                  strokeWidth={3}
                  tickLine="none"
                  gridAxis="xy"
                  withDots={true}
                  dotProps={{ r: 4, strokeWidth: 2, stroke: theme.colors.lightBlue } as any}
                  xAxisProps={{ stroke: theme.colors.blueishGrey }}
                  yAxisProps={{ stroke: theme.colors.blueishGrey }}
                  gridProps={{ stroke: theme.colors.blueishGrey, strokeOpacity: 0.3 }}
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
                  xAxisProps={{ stroke: theme.colors.blueishGrey }}
                  yAxisProps={{ stroke: theme.colors.blueishGrey }}
                  gridProps={{ stroke: theme.colors.blueishGrey, strokeOpacity: 0.3 }}
                />
              </Paper>
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="lg">
              <Paper
                p="md"
                radius="md"
                bg="#37474f"
                className={styles.cardTable}
              >
                <Text size="sm" fw={700} c="white" ta="center" mb="md">
                  Most Borrowed Books
                </Text>
                <Table verticalSpacing="xs" horizontalSpacing="sm">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th c="white" fz="xs" fw={600}>Title</Table.Th>
                      <Table.Th c="white" fz="xs" fw={600}>Borrows</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {mostBorrowedBooks.map((book, index) => (
                      <Table.Tr key={index}>
                        <Table.Td c="#A0AEC0" fz="xs">{book.title}</Table.Td>
                        <Table.Td c="#A0AEC0" fz="xs">{book.borrows}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Paper>
              <Paper
                p="md"
                radius="md"
                bg="#37474f"
                className={styles.cardTable}
              >
                <Text size="sm" fw={700} c="white" ta="center" mb="md">
                  Ongoing Competitions
                </Text>
                <Table verticalSpacing="xs" horizontalSpacing="sm">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th c="white" fz="xs" fw={600}>Name</Table.Th>
                      <Table.Th c="white" fz="xs" fw={600}>End Date</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {ongoingCompetitions.map((comp, index) => (
                      <Table.Tr key={index}>
                        <Table.Td c="#A0AEC0" fz="xs">{comp.name}</Table.Td>
                        <Table.Td c="#A0AEC0" fz="xs">{comp.endDate}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Paper>
            </SimpleGrid>
          </Paper>
        </Box>

        <Stack gap="md" style={{ gridColumn: 'span 1' }}>
          <Paper
            p="md"
            pl={12}
            mr={-50}
            radius="md"
            bg="#37474f"
            className={styles.topEmployees}
          >
            <Text mb="md" size="xs" fw={700} c="white" ta="center">
              Top Employees
            </Text>
            <Stack gap="sm">
              {topEmployees.map((e, i) => (
                <Group key={i} justify="space-between" wrap="nowrap">
                  <Group wrap="nowrap">
                    <Avatar color={e.color} radius="xl" size="md">
                      {e.name.split(' ').map((n) => n[0]).join('')}
                    </Avatar>
                    <Stack gap={0}>
                      <Text size="sm" c="white">{e.name}</Text>
                      <Text size="xs" c="#A0AEC0">Branch: {e.branch}</Text>
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
        </Stack>
      </SimpleGrid>
    </Box>
  );
};

export default ShmeisaniBranch;