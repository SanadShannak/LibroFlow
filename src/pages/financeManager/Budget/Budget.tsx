import React from 'react';
import { Title, Text, Paper, Stack, SimpleGrid } from '@mantine/core';

const FinanceManagerBudget: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Budget Management</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Marketing Budget</Text>
          <Text size="sm" c="dimmed">Q1 2024</Text>
          <Text mt="sm">Allocated: $5,000</Text>
          <Text>Spent: $3,200</Text>
          <Text>Remaining: $1,800</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Inventory Budget</Text>
          <Text size="sm" c="dimmed">Q1 2024</Text>
          <Text mt="sm">Allocated: $20,000</Text>
          <Text>Spent: $15,000</Text>
          <Text>Remaining: $5,000</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Operations Budget</Text>
          <Text size="sm" c="dimmed">Q1 2024</Text>
          <Text mt="sm">Allocated: $10,000</Text>
          <Text>Spent: $8,500</Text>
          <Text>Remaining: $1,500</Text>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
};

export default FinanceManagerBudget; 