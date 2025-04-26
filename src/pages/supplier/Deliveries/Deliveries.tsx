import React from 'react';
import { Title, Text, Paper, Stack, Table, Badge } from '@mantine/core';

const SupplierDeliveries: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Deliveries</Title>
      
      <Paper p="md" shadow="xs">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Delivery ID</Table.Th>
              <Table.Th>Order ID</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Items</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[1, 2, 3, 4, 5].map((delivery) => (
              <Table.Tr key={delivery}>
                <Table.Td>DEL-{delivery}123</Table.Td>
                <Table.Td>ORD-{delivery}456</Table.Td>
                <Table.Td>2024-03-{delivery}</Table.Td>
                <Table.Td>{delivery} items</Table.Td>
                <Table.Td>
                  <Badge color={
                    delivery === 1 ? 'green' :
                    delivery === 2 ? 'yellow' :
                    'blue'
                  }>
                    {delivery === 1 ? 'Delivered' :
                     delivery === 2 ? 'In Transit' :
                     'Processing'}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
};

export default SupplierDeliveries; 