import React from 'react';
import { Title, Text, Paper, Stack, Table, Badge } from '@mantine/core';

const SupplierInvoices: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Invoices</Title>
      
      <Paper p="md" shadow="xs">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Invoice ID</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Client</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[1, 2, 3, 4, 5].map((invoice) => (
              <Table.Tr key={invoice}>
                <Table.Td>INV-{invoice}789</Table.Td>
                <Table.Td>2024-03-{invoice}</Table.Td>
                <Table.Td>Client {invoice}</Table.Td>
                <Table.Td>${(invoice * 1000).toFixed(2)}</Table.Td>
                <Table.Td>
                  <Badge color={invoice % 2 === 0 ? 'green' : 'yellow'}>
                    {invoice % 2 === 0 ? 'Paid' : 'Pending'}
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

export default SupplierInvoices; 