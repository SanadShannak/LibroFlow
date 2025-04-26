import React from 'react';
import { Title, Text, Paper, Stack, SimpleGrid } from '@mantine/core';

const UserBooks: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Books</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
        {[1, 2, 3, 4, 5, 6].map((book) => (
          <Paper key={book} p="md" shadow="xs">
            <Text fw={500}>Book Title {book}</Text>
            <Text size="sm" c="dimmed">Author Name</Text>
            <Text mt="sm">$29.99</Text>
          </Paper>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default UserBooks; 