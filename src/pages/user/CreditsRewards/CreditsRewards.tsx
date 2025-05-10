import React from 'react';
import { Title, Text, Paper, Stack, Table } from '@mantine/core';

const UserHistory: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Order History</Title>
      
      <Paper p="md" shadow="xs">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Order ID</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Items</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[1, 2, 3, 4, 5].map((order) => (
              <Table.Tr key={order}>
                <Table.Td>ORD-{order}234</Table.Td>
                <Table.Td>2024-03-{order}</Table.Td>
                <Table.Td>{order} items</Table.Td>
                <Table.Td>${(order * 29.99).toFixed(2)}</Table.Td>
                <Table.Td>Delivered</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
};

export default UserHistory; 