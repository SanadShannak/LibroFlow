import React from 'react';
import { Title, Text, Paper, Stack } from '@mantine/core';

const DepartmentManagerOrders: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Orders</Title>
      <Paper p="md" shadow="xs">
        <Text>Manage your department's orders here.</Text>
      </Paper>
    </Stack>
  );
};

export default DepartmentManagerOrders; 