import React from 'react';
import { Title, Text, Paper, Stack, Table, Button, Group } from '@mantine/core';

const SupplierProducts: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Products</Title>
      
      <Group justify="flex-end">
        <Button>Add New Product</Button>
      </Group>

      <Paper p="md" shadow="xs">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Product ID</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Stock</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[1, 2, 3, 4, 5].map((product) => (
              <Table.Tr key={product}>
                <Table.Td>PROD-{product}789</Table.Td>
                <Table.Td>Book Title {product}</Table.Td>
                <Table.Td>Fiction</Table.Td>
                <Table.Td>$29.99</Table.Td>
                <Table.Td>{product * 10}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Button size="xs">Edit</Button>
                    <Button size="xs" color="red">Delete</Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
};

export default SupplierProducts; 