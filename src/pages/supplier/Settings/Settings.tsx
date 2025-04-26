import React from 'react';
import { Title, Text, Paper, Stack, TextInput, Button, Group } from '@mantine/core';

const SupplierSettings: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Settings</Title>
      
      <Paper p="md" shadow="xs">
        <Stack gap="md">
          <TextInput
            label="Company Name"
            placeholder="Your Company Name"
            defaultValue="Book Supplier Inc."
          />
          <TextInput
            label="Contact Email"
            placeholder="contact@example.com"
            defaultValue="contact@booksupplier.com"
          />
          <TextInput
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
            defaultValue="+1 (555) 123-4567"
          />
          <TextInput
            label="Address"
            placeholder="123 Business St, City, Country"
            defaultValue="123 Business St, City, Country"
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

export default SupplierSettings; 