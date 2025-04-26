import React from 'react';
import { Title, Text, Paper, Stack } from '@mantine/core';

const DepartmentManagerEvents: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Events</Title>
      <Paper p="md" shadow="xs">
        <Text>Manage your department's events here.</Text>
      </Paper>
    </Stack>
  );
};

export default DepartmentManagerEvents; 