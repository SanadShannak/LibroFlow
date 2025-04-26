import React from 'react';
import { Title, Text, Paper, Stack, SimpleGrid } from '@mantine/core';

const UserDashboard: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>User Dashboard</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Books in Cart</Text>
          <Text size="xl" fw={700}>3</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Wishlist</Text>
          <Text size="xl" fw={700}>12</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Orders</Text>
          <Text size="xl" fw={700}>5</Text>
        </Paper>
        <Paper p="md" shadow="xs">
          <Text fw={500}>Reviews</Text>
          <Text size="xl" fw={700}>8</Text>
        </Paper>
      </SimpleGrid>

      <Paper p="md" shadow="xs">
        <Text>Your recent activities and recommendations will be displayed here.</Text>
      </Paper>
    </Stack>
  );
};

export default UserDashboard; 