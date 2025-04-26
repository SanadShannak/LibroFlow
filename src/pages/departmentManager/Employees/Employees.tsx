import React from 'react';
import { Title, Text, Paper, Stack } from '@mantine/core';

const DepartmentManagerEmployees: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Employees</Title>
      <Paper p="md" shadow="xs">
        <Text>Manage your department's employees here.</Text>
      </Paper>
    </Stack>
  );
};

export default DepartmentManagerEmployees; 