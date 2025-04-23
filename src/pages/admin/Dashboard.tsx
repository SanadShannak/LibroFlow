import React, { useState, useEffect, useRef } from 'react';
import promotionsImage from '../../assets/promotions.png';
import bookImage from '../../assets/book.png';
import revenueImage from '../../assets/revenue.png';
import SummaryCard from '../../components/SummaryCards';
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

} from 'recharts';
import { useTheme, useMediaQuery } from '@mui/material';

// Sample data for the line chart
const monthlyData = [
  { day: '1st', sales: 2200 },
  { day: '5th', sales: 3500 },
  { day: '10th', sales: 1500 },
  { day: '15th', sales: 4500 },
  { day: '20th', sales: 8000 },
  { day: '25th', sales: 3500 },
  { day: '30th', sales: 9800 },
];

// Sample data for top employees
const topEmployees = [
  { name: 'Sanad Shannak', branch: 'Shmeisani', color: 'yellow' },
  { name: 'Motasem AlAtawneh', branch: 'Yajouz', color: 'gray' },
  { name: 'Ahmad Aljazaere', branch: 'Tabarbour', color: 'gray' },
  { name: 'Malek Alkhader', branch: 'AlHashmi', color: 'gray' },
  { name: 'Mohammad Sabri', branch: 'Al-Zarqa', color: 'gray' },
  { name: 'Muhab AlAfandi', branch: 'Arjan', color: 'gray' },
];

// Data for Mantine PieChart
const pieChartData = [
  { name: 'Jabal Amman', value: 400, color: '#08212D' },
  { name: 'AlZarqaa', value: 300, color: '#70A5BF' },
  { name: 'Shmeisani', value: 300, color: '#395B75' },
];

const AdminDashboardPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Ref and state to track PieChart width
  const pieChartRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(0);

  // Update chart width dynamically based on the container's width
  useEffect(() => {
    if (pieChartRef.current) {
      setChartWidth(pieChartRef.current.offsetWidth); // Set width in pixels
    }

    const handleResize = () => {
      if (pieChartRef.current) {
        setChartWidth(pieChartRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box p="90">
      {/* Summary Cards */}
      <SimpleGrid cols={{ base: 1, sm: 4 }} mb="xl" spacing="sm" mr={10}>
        <SummaryCard
          title="Total Sales"
          value="JOD 11,207.00"
          subtitle="+12.5% from last month"
          subtitleColor="#4CAF50"
          bgImage={revenueImage}
        />
        <SummaryCard
          title="Total Books Sold"
          value="171 Books"
          subtitle="-11% from last month"
          subtitleColor="#F44336"
          bgImage={bookImage}
        />
        <SummaryCard
          title="Promotional Contribution"
          value="16%"
          subtitle="1800 JOD"
          subtitleColor="#22C35D"
          bgImage={promotionsImage}
        />
      </SimpleGrid>

      {/* Main Content */}
      <SimpleGrid cols={{ base: 1, lg: 4 }} spacing="md">
       {/* Enhanced Line Chart with Glow Effect */}
<Paper
  p="md"
  radius="md"
  bg="#37474F"
  
  style={{ 
    gridColumn: 'span 3',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(71, 85, 105, 0.3)'
  }}
  mr={9}
  mb={-11}
>
  {/* Background Elements */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    opacity: 0.1,
    zIndex: 0
  }}>
    <div style={{
      position: 'absolute',
      top: '25%',
      left: '25%',
      width: '128px',
      height: '128px',
      borderRadius: '50%',
      background: '#FFFFFF',
      filter: 'blur(40px)'
    }}></div>
    <div style={{
      position: 'absolute',
      bottom: '33%',
      right: '25%',
      width: '128px',
      height: '128px',
      borderRadius: '50%',
      background: '#FFFFFF',
      filter: 'blur(40px)'
    }}></div>
  </div>
  
  <div style={{ position: 'relative', zIndex: 1   }}>
    <Group justify="space-between" mb="sm">
      <Text size="sm" fw={500} c="#A0AEC0">
        Monthly Sales Trends
      </Text>
      <Group gap="xs">

        <Box
          style={{
            padding: '4px 10px',
            background: '#3B82F6',
            borderRadius: '9999px',
            fontSize: '12px',
            color: 'white'
          }}
        >
          Last 30 Days
        </Box>
      </Group>
    </Group>
    
    <Box style={{ height: 370 }}>
      {/* SVG Filter for Glow Effect */}
      <svg width="0" height="0">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"></feGaussianBlur>
            <feMerge>
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
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
          margin={{ top: 10, right: 19, bottom: 0, left: -10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#455A64" vertical={false} opacity={0.5} />
          <XAxis
            dataKey="day"
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
            contentStyle={{
              backgroundColor: '#455A64',
              borderColor: '#546E7A',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
              color: 'white',
              padding: '10px',
            }}
            itemStyle={{ color: 'white' }}
            labelStyle={{ color: 'white', fontWeight: 'bold', marginBottom: '5px' }}
            cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '5 5' }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={{ fill: '#FFFFFF', r: 5, strokeWidth: 0, stroke: '#0EA5E9' }}
            activeDot={{ r: 7, fill: '#22D3EE', stroke: '#06B6D4', strokeWidth: 2 }}
            style={{ filter: 'url(#glow)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
    
    
  </div>
</Paper>

        {/* Sidebar */}
        <Stack gap="md" mt={-221} style={{ gridColumn: 'span 1' }} >
          {/* Top Employees */}
          <Paper p="md" radius="md" bg="#37474f" mr={-50} pl={12}>
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
                      <Text size="sm" c="white">
                        {e.name}
                      </Text>
                      <Text size="xs" c="#A0AEC0">
                        Branch: {e.branch}
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

          {/* Pie Chart with Glow Effect */}
<MantinePaper
  p="md"
  mr={-50}
  radius="md"
  bg="#37474f"
  style={{
    width: '120%',
    maxWidth: 400,
    height: isMobile ? 250 : 300,
    maxHeight: 280,
    margin: '0 auto',
    padding: isMobile ? '16px' : '24px',
    position: 'relative',
    overflow: 'hidden',
  }}
>
  {/* Background ambient glow */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0.2,
      zIndex: 0,
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: '60%',
        left: '30%',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: '#70A5BF',
        filter: 'blur(30px)',
      }}
    ></div>
    <div
      style={{
        position: 'absolute',
        bottom: '60%',
        right: '30%',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: '#395B75',
        filter: 'blur(30px)',
      }}
    ></div>
  </div>

  <Text
    mb="-2"
    size="xl"
    fw={700}
    c="white"
    ta="center"
    style={{ position: 'relative', zIndex: 2 ,}}
    
  >
    Sales by Branch
  </Text>

  <div ref={pieChartRef} style={{ position: 'relative', zIndex: 2 }}>
    {/* SVG Filter for Glow Effect */}
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

    {/* Custom wrapper for Mantine PieChart to add glow effect */}
    <div
      style={{
        position: 'relative',
        filter: 'url(#pieGlow)',
        animation: 'softPulse 4s infinite alternate ease-in-out',
      }}
    >
      <style>{`
        @keyframes softPulse {
          0% { filter: drop-shadow(0 0 3px rgba(8, 33, 45, 0.4)); }
          100% { filter: drop-shadow(0 0 7px rgba(112, 165, 191, 0.7)); }
        }
      `}</style>

      <MantinePieChart
        data={pieChartData}
        withTooltip
        style={{ height: isMobile ? 180 : 220 }}
        mx="auto"
        size={chartWidth > 0 ? Math.min(chartWidth, 200) : 200} // Dynamic sizing
        mt={-18}
        strokeWidth={0}
        tooltipProps={{
          content: ({ payload }) => {
            if (!payload || !payload[0]) return null;
            const { name, value, color } = payload[0].payload;
            return (
              <Paper p="xs" radius="sm" style={{ background: '#455A64', color: 'white' }}>
                <Group gap="xs">
                  <Box
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: color,
                      borderRadius: 4,
                    }}
                  />
                  <Text size="sm">
                    {name}: {value} JOD
                  </Text>
                </Group>
              </Paper>
            );
          },
        }}
      />
    </div>
  </div>
</MantinePaper>
        </Stack>
      </SimpleGrid>
      {/* New Features Section for Library Business Owner */}
      ```tsx
{/* New Features Section for Library Business Owner */}
<SimpleGrid cols={{ base: 1, lg: 4 }} spacing="33" mt="2"  w={'103%'}>
  {/* Circulation Overview Card */}
  <Paper p="md" radius="md" bg="#37474f" style={{ gridColumn: 'span 1' }}>
    <Text size="sm" fw={500} c="#A0AEC0" mb="sm">
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

  {/* Top Borrowed Books List (Replaces Popular Genres Pie Chart) */}
  <Paper
    p="md"
    radius="md"
    bg="#37474f"
    style={{ gridColumn: 'span 1', position: 'relative', overflow: 'hidden' }}
  >
    {/* Background ambient glow */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        opacity: 0.2,
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '30%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: '#70A5BF',
          filter: 'blur(30px)',
        }}
      ></div>
    </div>
    <Text size="sm" fw={500} c="#A0AEC0" mb="sm" ta="center" style={{ position: 'relative', zIndex: 2 }}>
      Top Borrowed Books
    </Text>
    <Stack gap="sm" style={{ position: 'relative', zIndex: 2 }}>
      {[
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', borrows: 45 },
        { title: '1984', author: 'George Orwell', borrows: 38 },
        { title: 'To Kill a Mockingbird', author: 'Harper Lee', borrows: 32 },
      ].map((book, index) => (
        <Group
          key={index}
          justify="space-between"
          p="xs"
          style={{
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            ':hover': {
              background: 'rgba(71, 85, 105, 0.3)',
              filter: 'drop-shadow(0 0 5px rgba(112, 165, 191, 0.5))',
            },
          }}
        >
          <Stack gap={0}>
            <Text size="sm" c="white">{book.title}</Text>
            <Text size="xs" c="#A0AEC0">{book.author}</Text>
          </Stack>
          <Text size="sm" c="white" fw={700}>{book.borrows} Borrows</Text>
        </Group>
      ))}
    </Stack>
  </Paper>

  {/* Staff Performance Card (New, to the Left of Patron Activity) */}
  <Paper
    p="md"
    radius="md"
    bg="#37474f"
    style={{ gridColumn: 'span 1', position: 'relative', overflow: 'hidden' }}
  >
    {/* Background ambient glow */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        opacity: 0.2,
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '30%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: '#395B75',
          filter: 'blur(30px)',
        }}
      ></div>
    </div>
    <Text size="sm" fw={500} c="#A0AEC0" mb="sm" style={{ position: 'relative', zIndex: 2 }}>
      Staff Performance
    </Text>
    <Stack gap="sm" style={{ position: 'relative', zIndex: 2 }}>
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
  </Paper>

  {/* Patron Activity Card */}
  <Paper p="md" radius="md" bg="#37474f" style={{ gridColumn: 'span 1' }}>
    <Text size="sm" fw={500} c="#A0AEC0" mb="sm">
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

  {/* Inventory Status Bar Chart */}
  <Paper
    p="md"
    radius="md"
    bg="#37474f"
    style={{ gridColumn: 'span 4', position: 'relative', overflow: 'hidden' }}
  >
    <Text size="sm" fw={500} c="#A0AEC0" mb="sm">
      Inventory Status
    </Text>
    <Box style={{ height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[
            { category: 'Fiction', available: 500, borrowed: 120, reserved: 20 },
            { category: 'Non-Fiction', available: 300, borrowed: 80, reserved: 10 },
            { category: 'Mystery', available: 200, borrowed: 50, reserved: 5 },
            { category: 'Sci-Fi', available: 150, borrowed: 30, reserved: 8 },
            { category: 'Romance', available: 250, borrowed: 90, reserved: 15 },
            { category: 'Biography', available: 180, borrowed: 40, reserved: 6 },
            { category: 'Children’s', available: 400, borrowed: 150, reserved: 25 },
            { category: 'Historical Fiction', available: 220, borrowed: 60, reserved: 12 },
          ]}
          margin={{ top: 10, right: 19, bottom: 0, left: -10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#455A64" vertical={false} opacity={0.5} />
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
          <Bar dataKey="borrowed" fill="#395B75" radius={[4, 4, 0, 0]} />
          <Bar dataKey="reserved" fill="#A0AEC0" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </Paper>

  
</SimpleGrid>
```    </Box>
  
  );
};


export default AdminDashboardPage;