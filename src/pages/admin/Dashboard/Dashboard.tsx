import React, { useState, useEffect, useRef } from 'react';
import promotionsImage from '../../../assets/promotions.png';
import bookImage from '../../../assets/book.png';
import revenueImage from '../../../assets/revenue.png';
import membersImage from '../../../assets/members.svg';
import SummaryCard from '../../../components/SummaryCards';
import { Paper as MantinePaper } from '@mantine/core';
import { PieChart as MantinePieChart } from '@mantine/charts';
import { Box, Text, Group, Paper, Stack, ThemeIcon, SimpleGrid, Avatar } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  TooltipProps,
} from 'recharts';
import { useTheme, useMediaQuery } from '@mui/material';
import { monthlyData, topEmployees, pieChartData, topBorrowedBooks, inventoryData } from '../../../dummyData/adminPages/dashboardData';
import styles from './dashboardStyles.module.css';

const AdminDashboardPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const pieChartRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(0);

  useEffect(() => {
    if (pieChartRef.current) {
      setChartWidth(pieChartRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (pieChartRef.current) {
        setChartWidth(pieChartRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Custom Tooltip for the LineChart
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <Paper
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
            Day: {label}
          </Text>
          <Text style={{ color: 'white' }}>
            Sales: {payload[0].value} JOD
          </Text>
        </Paper>
      );
    }
    return null;
  };

  const xAxisTicks = monthlyData
    .map((entry, index) => ((index+1) % 5 === 0 ? entry.day : null))
    .filter((tick): tick is string => tick !== null);

  return (
    <Box className={styles.mainContainer}>
      <SimpleGrid cols={{ base: 1, sm: 4 }} mb="xl" spacing="4%">
        <SummaryCard
          title="Total Sales"
          value="JOD 11,207.00"
          subtitle="-6.5% from last month"
          subtitleColor="#D0342C"
          bgImage={revenueImage}
          bgImageSize="120px"
        />
        <SummaryCard
          title="Total Books in Inventory"
          value="2,500"
          subtitle="+5% from last month"
          subtitleColor="#4CAF50"
          bgImage={bookImage}
          bgImageSize="130px"
        />
        <SummaryCard
          title="Promotional Contribution"
          value="16%"
          subtitle="1800 JOD"
          subtitleColor="#22C35D"
          bgImage={promotionsImage}
          bgImageSize="120px"
        />
        <SummaryCard
          title="Total Active Members"
          value="1,230"
          subtitle="+8% from last month"
          subtitleColor="#4CAF50"
          bgImage={membersImage}
          bgImageSize="120px"
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 7 }} spacing="md">
        <Paper
          className={`${styles.lineChartPaper} ${styles.containerShadow}`}
        >
          <div className={styles.lineChartBackgroundOverlay}>
            <div className={styles.lineChartBlurCircle1} />
            <div className={styles.lineChartBlurCircle2} />
          </div>

          <div className={styles.lineChartContent}>
            <Group className={styles.lineChartHeaderGroup}>
              <Text size="sm" fw={500} c="#A0AEC0">
                Monthly Sales Trends
              </Text>
              <Group gap="xs">
                <Box className={styles.lineChartPeriodBox}>Last 30 Days</Box>
              </Group>
            </Group>

            <Box className={styles.lineChartChartContainer}>
              <svg width="0" height="0">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                </defs>
              </svg>

              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{ top: 10, right: 19, bottom: -5, left: -10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#455A64"
                    vertical={false}
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="day"
                    stroke="#A0AEC0"
                    tick={{ fill: '#A0AEC0', fontSize: 12 }}
                    axisLine={{ stroke: '#455A64' }}
                    tickLine={false}
                    dy={5}
                    ticks={xAxisTicks}
                  />
                  <YAxis
                    stroke="#A0AEC0"
                    tick={{ fill: '#A0AEC0', fontSize: 12 }}
                    axisLine={{ stroke: '#455A64' }}
                    tickLine={false}
                    label={{
                      value: 'Sales (JOD)',
                      angle: -90,
                      position: 'insideLeft',
                      fill: '#A0AEC0',
                      fontSize: 12,
                      dx: -10,
                    }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '5 5' }}
                    isAnimationActive={false}
                    trigger="hover"
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="url(#lineGradient)"
                    strokeWidth={3}
                    dot={{ r: 0 }}
                    activeDot={{ r: 7, fill: '#22D3EE', stroke: '#06B6D4', strokeWidth: 2 }}
                    style={{ filter: 'url(#glow)', pointerEvents: 'auto' }}
                    isAnimationActive={true} // Enable animation
                    animationDuration={1500} // 1.5 seconds for the line drawing
                    className={styles.lineChartLine} // Add class for CSS animation
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </div>
        </Paper>

        <Stack className={styles.sidebarStack}>
          <Paper className={`${styles.topEmployeesPaper} ${styles.containerShadow}`}>
            <Text mb="md" size="s" fw={700} c="white" ta="center">
              Top Employees
            </Text>
            <Stack gap="sm">
              {topEmployees.map((e, i) => (
                <Group key={i} justify="space-between" wrap="nowrap">
                  <Group wrap="nowrap">
                    <Avatar color={e.color} radius="xl" size="md">
                      {e.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
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
                    className={styles.topEmployeesRefreshIcon}
                  >
                    <IconRefresh size={14} color="#A0AEC0" />
                  </ThemeIcon>
                </Group>
              ))}
            </Stack>
          </Paper>

          <MantinePaper
            className={`${styles.salesByBranchPaper} ${styles.containerShadow} ${
              isMobile ? styles.salesByBranchPaperMobile : styles.salesByBranchPaperDesktop
            }`}
          >
            <div className={styles.salesByBranchBackgroundOverlay}>
              <div className={styles.salesByBranchBlurCircle1} />
              <div className={styles.salesByBranchBlurCircle2} />
            </div>

            <Text mb='-2px' size="" fw={700} c="white" ta="center">Sales by Branch</Text>

            <div ref={pieChartRef} className={styles.salesByBranchChartContainer}>
              <svg width="0" height="0">
                <defs>
                  <filter id="pieGlow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>

              <div>
                <MantinePieChart
                  data={pieChartData}
                  withTooltip
                  className={isMobile ? styles.salesByBranchChartMobile : styles.salesByBranchChart}
                  mx="auto"
                  size={chartWidth > 0 ? Math.min(chartWidth, 200) : 200}
                  mt={-18}
                  strokeWidth={0}
                  tooltipProps={{
                    content: ({ payload }: TooltipProps<number, string>) => {
                      if (!payload || !payload[0]) return null;
                      const { name, value, color } = payload[0].payload;
                      return (
                        <Paper p="xs" radius="sm" className={styles.salesByBranchTooltip}>
                          <Group gap="xs">
                            <Box
                              className={styles.salesByBranchTooltipBox}
                              style={{ backgroundColor: color }}
                            />
                            <Text size="sm">{name}: {value} JOD</Text>
                          </Group>
                        </Paper>
                      );
                    },
                  }}
                  pieProps={{
                    isAnimationActive: true, // Enable animation
                    animationDuration: 1000, // 1 second for each slice
                  }}
                />
              </div>
            </div>
          </MantinePaper>
        </Stack>
      </SimpleGrid>

      <div className={styles.spacer} />
      <SimpleGrid cols={{ base: 1, lg: 4 }} spacing="33" mt="2" w="100%">
        <Paper className={`${styles.unifiedCardPaper} ${styles.containerShadow}`}>
          <Text size="sm" fw={500} c="#A0AEC0" mb="sm" ta="center">
            Circulation Overview
          </Text>
          <Stack gap="sm">
            <Group justify="space-between">
              <Text size="sm" c="white">Books Borrowed</Text>
              <Text size="sm" c="white" fw={700}>245</Text>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="white">Books Returned</Text>
              <Text size="sm" c="white" fw={700}>210</Text>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="white">Overdue Books</Text>
              <Text size="sm" c="#F44336" fw={700}>12</Text>
            </Group>
          </Stack>
        </Paper>

        <Paper className={`${styles.unifiedCardPaper} ${styles.containerShadow}`}>
          <div className={styles.cardBackgroundOverlay}>
            <div className={styles.topBooksBlurCircle} />
          </div>
          <div className={styles.cardContent}>
            <Text size="sm" fw={500} c="#A0AEC0" mb="sm" ta="center">
              Top Borrowed Books
            </Text>
            <Stack gap="sm">
              {topBorrowedBooks.map((book, index) => (
                <Stack key={index} gap={0}>
                  <div className={styles.topBooksBookItem}>
                    <Text size="sm" c="white" className={styles.topBooksTitle}>{book.title}</Text>
                    <Text size="sm" c="white" fw={700} className={styles.topBooksBorrows}>{book.borrows} Borrows</Text>
                  </div>
                  <Text size="xs" c="#A0AEC0">{book.author}</Text>
                </Stack>
              ))}
            </Stack>
          </div>
        </Paper>

        <Paper className={`${styles.unifiedCardPaper} ${styles.containerShadow}`}>
          <div className={styles.cardBackgroundOverlay}>
            <div className={styles.staffPerformanceBlurCircle} />
          </div>
          <div className={styles.cardContent}>
            <Text size="sm" fw={500} c="#A0AEC0" mb="sm" ta="center">
              Staff Performance
            </Text>
            <Stack gap="sm">
              <Group justify="space-between">
                <Text size="sm" c="white">Books Processed</Text>
                <Text size="sm" c="white" fw={700}>1,450</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm" c="white">Patron Interactions</Text>
                <Text size="sm" c="white" fw={700}>320</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm" c="white">Tasks Completed</Text>
                <Text size="sm" c="white" fw={700}>85</Text>
              </Group>
            </Stack>
          </div>
        </Paper>

        <Paper className={`${styles.unifiedCardPaper} ${styles.containerShadow}`}>
          <Text size="sm" fw={500} c="#A0AEC0" mb="sm" ta="center">
            Patron Activity
          </Text>
          <Stack gap="sm">
            <Group justify="space-between">
              <Text size="sm" c="white">Active Patrons</Text>
              <Text size="sm" c="white" fw={700}>1,230</Text>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="white">New Registrations</Text>
              <Text size="sm" c="#4CAF50" fw={700}>45</Text>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="white">Avg. Visits/Month</Text>
              <Text size="sm" c="white" fw={700}>3.2</Text>
            </Group>
          </Stack>
        </Paper>

        <Paper className={`${styles.inventoryPaper} ${styles.containerShadow}`}>
          <Text size="sm" fw={500} c="#A0AEC0" mb="sm">
            Inventory Status
          </Text>
          <Box className={styles.inventoryChartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={inventoryData}
                margin={{ top: 10, right: 19, bottom: 0, left: -10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#455A64"
                  vertical={false}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="category"
                  stroke="#A0AEC0"
                  tick={{ fill: '#A0AEC0', fontSize: 12 }}
                  axisLine={{ stroke: '#455A64' }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#A0AEC0"
                  tick={{ fill: '#A0AEC0', fontSize: 12 }}
                  axisLine={{ stroke: '#455A64' }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#455A64',
                    borderColor: '#546E7A',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
                <Bar dataKey="available" fill="#70A5BF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="borrowed" fill="#F0F5A7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reserved" fill="#A0AEC0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </SimpleGrid>
    </Box>
  );
};

export default AdminDashboardPage;