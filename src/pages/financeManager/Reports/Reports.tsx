import React from 'react';
import { Title, Text, Paper, Stack, SimpleGrid } from '@mantine/core';

const FinanceManagerReports: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Financial Reports</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Monthly Revenue Report</Text>
          <Text size="sm" c="dimmed">March 2024</Text>
          <Text mt="sm">Total Revenue: $45,231</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Expense Report</Text>
          <Text size="sm" c="dimmed">March 2024</Text>
          <Text mt="sm">Total Expenses: $12,345</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Profit & Loss Statement</Text>
          <Text size="sm" c="dimmed">Q1 2024</Text>
          <Text mt="sm">Net Profit: $32,886</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Tax Report</Text>
          <Text size="sm" c="dimmed">Q1 2024</Text>
          <Text mt="sm">Tax Due: $6,577</Text>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
};

export default FinanceManagerReports; 