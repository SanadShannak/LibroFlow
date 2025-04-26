import React from 'react';
import { Title, Text, Paper, Stack, SimpleGrid } from '@mantine/core';

const SupplierDashboard: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Supplier Dashboard</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Active Products</Text>
          <Text size="xl" fw={700}>156</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Pending Orders</Text>
          <Text size="xl" fw={700}>23</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Total Revenue</Text>
          <Text size="xl" fw={700}>$78,543</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Pending Deliveries</Text>
          <Text size="xl" fw={700}>8</Text>
        </Paper>
      </SimpleGrid>

      <Paper p="md" shadow="xs">
        <Text>Recent supplier activities and overview will be displayed here.</Text>
      </Paper>
    </Stack>
  );
};

export default SupplierDashboard; 