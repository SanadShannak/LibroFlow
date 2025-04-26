import React from 'react';
import { Title, Text, Paper, Stack, SimpleGrid } from '@mantine/core';

const FinanceManagerDashboard: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Finance Dashboard</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Total Revenue</Text>
          <Text size="xl" fw={700}>$45,231</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Expenses</Text>
          <Text size="xl" fw={700}>$12,345</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Profit</Text>
          <Text size="xl" fw={700}>$32,886</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Pending Invoices</Text>
          <Text size="xl" fw={700}>12</Text>
        </Paper>
      </SimpleGrid>

      <Paper p="md" shadow="xs">
        <Text>Recent financial activities and overview will be displayed here.</Text>
      </Paper>
    </Stack>
  );
};

export default FinanceManagerDashboard; 