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
  Button,
  Progress,
} from '@mantine/core';
import { LineChart, BarChart } from '@mantine/charts';
import {
  IconCalendarEvent,
  IconRefresh,
} from '@tabler/icons-react';
import styles from './adminBranchPageStyles.module.css';
import theme from '../../../utils/theme';
import {
  responsibilities,
  miniDashboardData,
  topEmployees,
  mostBorrowedBooks,
  ongoingCompetitions,
  inventoryData,
  employeePerformanceData,
  upcomingEvents,
  MiniDashboardItem,
} from '../../../dummyData/adminPages/shmeisaniBranchData';

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
      {bgImage && <img src={bgImage} alt="background" className={styles.bgIcon} width={'130px'}/>}
    </Box>
  </Paper>
);

const ShmeisaniBranch: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Custom Tooltip Component for both charts
  const CustomTooltip = ({ payload, label }: { payload?: any[], label?: string }) => {
    if (!payload || !payload.length) return null;
    const data = payload[0].payload;
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
      <SimpleGrid cols={{ base: 1, sm: 4 }} mb="xl" spacing={"4%"} >
        {miniDashboardData.map((data: MiniDashboardItem, index: number) => (
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
              Branch Overview
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
                  w='100%'
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
                    content: ({ payload, label }) => (
                      <CustomTooltip payload={payload} label={label} />
                    ),
                  }}
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
                  xAxisProps={{  color: '#A0AEC0' }}
                  yAxisProps={{ stroke: 'white', color: '#A0AEC0' }}
                  gridProps={{ stroke: theme.colors.blueishGrey, strokeOpacity: 0.3 }}
                  withTooltip
                  tooltipProps={{
                    content: ({ payload, label }) => (
                      <CustomTooltip payload={payload} label={label} />
                    ),
                    cursor: false,
                  }}
                  className={styles.employeePerformanceChart}
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

        <Stack gap="md" style={{ gridColumn: 'span 1', gridRow: 'span 2' }}>
          <Paper
            p="md"
            pl={12}
            radius="lg"
            bg="#37474f"
            className={styles.topEmployees}
          >
            <Text mb="md" size="xs" fw={700} c="white" ta="center">
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
          <Paper
            p="md"
            radius="lg"
            bg="#37474f"
            className={styles.upcomingEvents}
          >
            <Group justify="space-between" mb="md">
              <Text size="xs" fw={700} c="white" ta="center">
                Upcoming Events
              </Text>
              <ThemeIcon
                size="sm"
                radius="xl"
                color="dark"
                variant="outline"
                style={{ borderColor: '#A0AEC0', cursor: 'pointer' }}
              >
                <IconCalendarEvent size="14" color="#A0AEC0" />
              </ThemeIcon>
            </Group>
            
            <Stack gap="md">
              {upcomingEvents.map((event, index) => (
                <Box key={index}>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" fw={600} c="white">{event.title}</Text>
                    <Text size="xs" c="#A0AEC0">{event.date}</Text>
                  </Group>
                  <Group justify="space-between" mb={2} align="center">
                    <Text size="xs" c="#A0AEC0">{event.location}</Text>
                    <Text size="xs" c="#4CAF50">{event.progress}%</Text>
                  </Group>
                  <Progress
                    value={event.progress}
                    size="xs"
                    radius="xs"
                    color={event.progress > 70 ? "green" : event.progress > 40 ? "yellow" : "blue"}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};

export default ShmeisaniBranch;