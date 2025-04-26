import React from 'react';
import { Title, Text, Paper, Stack, TextInput, Button, Group } from '@mantine/core';

const UserProfile: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Profile</Title>
      
      <Paper p="md" shadow="xs">
        <Stack gap="md">
          <TextInput
            label="Full Name"
            placeholder="John Doe"
            defaultValue="John Doe"
          />
          <TextInput
            label="Email"
            placeholder="john@example.com"
            defaultValue="john@example.com"
          />
          <TextInput
            label="Phone"
            placeholder="+1 (555) 123-4567"
            defaultValue="+1 (555) 123-4567"
          />
          <TextInput
            label="Address"
            placeholder="123 Main St, City, Country"
            defaultValue="123 Main St, City, Country"
          />
          
          <Group justify="flex-end" mt="md">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default UserProfile; 