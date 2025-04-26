import React from 'react';
import { Title, Text, Paper, Stack, Table } from '@mantine/core';

const FinanceManagerTransactions: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2}>Transactions</Title>
      
      <Paper p="md" shadow="xs">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Transaction ID</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Type</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[1, 2, 3, 4, 5].map((transaction) => (
              <Table.Tr key={transaction}>
                <Table.Td>TRX-{transaction}789</Table.Td>
                <Table.Td>2024-03-{transaction}</Table.Td>
                <Table.Td>Book Purchase</Table.Td>
                <Table.Td>${(transaction * 29.99).toFixed(2)}</Table.Td>
                <Table.Td>Income</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
};

export default FinanceManagerTransactions; 