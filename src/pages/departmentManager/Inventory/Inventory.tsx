import React from 'react';
import { Title, Text, Paper, Stack } from '@mantine/core';

const DepartmentManagerInventory: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Inventory</Title>
      <Paper p="md" shadow="xs">
        <Text>Manage your department's inventory here.</Text>
      </Paper>
    </Stack>
  );
};

export default DepartmentManagerInventory; 