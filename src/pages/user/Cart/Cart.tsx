import React from 'react';
import { Title, Text, Paper, Stack, Table, Button, Group } from '@mantine/core';

const UserCart: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Shopping Cart</Title>
      
      <Paper p="md" shadow="xs">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Book</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Total</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[1, 2, 3].map((item) => (
              <Table.Tr key={item}>
                <Table.Td>Book Title {item}</Table.Td>
                <Table.Td>$29.99</Table.Td>
                <Table.Td>1</Table.Td>
                <Table.Td>$29.99</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Group justify="flex-end" mt="md">
          <Text fw={500}>Total: $89.97</Text>
          <Button>Checkout</Button>
        </Group>
      </Paper>
    </Stack>
  );
};

export default UserCart; 