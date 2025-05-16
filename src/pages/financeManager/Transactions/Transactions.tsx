import React, { useState } from 'react';
import { Title, Text, Paper, Stack, Table, Select, Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './Transactions.css';

interface TransactionData {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  status: 'Completed' | 'Pending' | 'Cancelled';
}

const FinanceManagerTransactions: React.FC = () => {
  // Mock transaction data
  const transactions: TransactionData[] = [
    { id: 'TRX-1001', date: '2025-05-10', description: 'Supplier Payment', amount: 5000, type: 'Expense', status: 'Completed' },
    { id: 'TRX-1002', date: '2025-05-09', description: 'Book Sales', amount: 1500, type: 'Income', status: 'Completed' },
    { id: 'TRX-1003', date: '2025-05-08', description: 'Office Rent', amount: 2000, type: 'Expense', status: 'Pending' },
    { id: 'TRX-1004', date: '2025-05-07', description: 'Marketing Campaign', amount: 3000, type: 'Expense', status: 'Cancelled' },
    { id: 'TRX-1005', date: '2025-05-06', description: 'Customer Invoice', amount: 4500, type: 'Income', status: 'Completed' },
  ];

  // State for filter and modal
  const [statusFilter, setStatusFilter] = useState<string | null>('All');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Filter transactions
  const filteredTransactions = statusFilter === 'All'
    ? transactions
    : transactions.filter((transaction) => transaction.status === statusFilter);

  // Get status class for styling
  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'Completed':
        return 'status-completed';
      case 'Pending':
        return 'status-pending';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  // Function to handle view details click
  const handleViewDetails = (transaction: TransactionData) => {
    console.log('Opening modal for transaction:', transaction);
    setSelectedTransaction(transaction);
    open();
  };

  return (
    <div className="transactions-container">
      <Stack gap="md">
        <Title order={2}>Transactions</Title>

        {/* Filter Section */}
        <Paper p="md" shadow="xs" className="filter-section">
          <Select
            label="Filter by Status"
            placeholder="Select status"
            data={['All', 'Completed', 'Pending', 'Cancelled']}
            value={statusFilter}
            onChange={setStatusFilter}
            className="status-filter"
          />
        </Paper>

        {/* Transactions Table */}
        <Paper p="md" shadow="xs" className="table-container">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Transaction ID</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredTransactions.map((transaction) => (
                <Table.Tr key={transaction.id}>
                  <Table.Td className="transaction-id">{transaction.id}</Table.Td>
                  <Table.Td className="transaction-date">{formatDate(transaction.date)}</Table.Td>
                  <Table.Td>{transaction.description}</Table.Td>
                  <Table.Td>${transaction.amount.toFixed(2)}</Table.Td>
                  <Table.Td>{transaction.type}</Table.Td>
                  <Table.Td>
                    <span className={`status-pill ${getStatusClass(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </Table.Td>
                  <Table.Td>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleViewDetails(transaction)}
                      className="view-button"
                    >
                      View
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>

      {/* Transaction Details Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="Transaction Details"
        size="md"
        styles={{
          title: { color: 'white', fontSize: '1.2rem', fontWeight: 600 },
          header: { backgroundColor: '#263238' },
          content: { backgroundColor: '#37474f' },
          body: { color: 'white' }
        }}
      >
        {selectedTransaction && (
          <Stack gap="sm" mt="md">
            <Text><strong style={{ color: 'var(--text-secondary)' }}>Transaction ID:</strong> {selectedTransaction.id}</Text>
            <Text><strong style={{ color: 'var(--text-secondary)' }}>Date:</strong> {formatDate(selectedTransaction.date)}</Text>
            <Text><strong style={{ color: 'var(--text-secondary)' }}>Description:</strong> {selectedTransaction.description}</Text>
            <Text><strong style={{ color: 'var(--text-secondary)' }}>Amount:</strong> ${selectedTransaction.amount.toFixed(2)}</Text>
            <Text><strong style={{ color: 'var(--text-secondary)' }}>Type:</strong> {selectedTransaction.type}</Text>
            <Text><strong style={{ color: 'var(--text-secondary)' }}>Status:</strong> {selectedTransaction.status}</Text>
            <Button
              variant="filled"
              onClick={close}
              className="close-button"
            >
              Close
            </Button>
          </Stack>
        )}
      </Modal>
    </div>
  );
};

export default FinanceManagerTransactions;