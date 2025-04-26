import React from 'react';
import { Title, Text, Paper, Stack } from '@mantine/core';

const DepartmentManagerDashboard: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Dashboard</Title>
      <Paper p="md" shadow="xs">
        <Text>Welcome to your dashboard. Here you can manage your department's activities.</Text>
      </Paper>
    </Stack>
  );
};

export default DepartmentManagerDashboard; 