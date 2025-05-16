import React, { useState } from 'react';
import { Title, Text, Paper, Stack, SimpleGrid, Select, Progress, Group, Button, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './Budget.css';

interface BudgetData {
  id: string;
  category: string;
  period: string;
  allocated: number;
  spent: number;
  remaining: number;
  details?: {
    items: Array<{
      description: string;
      amount: number;
      date: string;
      status: 'completed' | 'pending' | 'planned';
    }>;
  };
}

const FinanceManagerBudget: React.FC = () => {
  // Mock budget data with detailed information
  const budgets: BudgetData[] = [
    {
      id: 'BUD-001',
      category: 'Marketing Budget',
      period: 'Q1 2025',
      allocated: 5000,
      spent: 3200,
      remaining: 1800,
      details: {
        items: [
          { description: 'Social Media Campaign', amount: 1500, date: '2025-01-15', status: 'completed' },
          { description: 'Print Advertising', amount: 800, date: '2025-02-01', status: 'completed' },
          { description: 'Email Marketing', amount: 900, date: '2025-03-01', status: 'pending' },
          { description: 'Event Sponsorship', amount: 1800, date: '2025-03-15', status: 'planned' },
        ]
      }
    },
    {
      id: 'BUD-002',
      category: 'Inventory Budget',
      period: 'Q2 2025',
      allocated: 22000,
      spent: 12000,
      remaining: 10000,
      details: {
        items: [
          { description: 'New Book Titles', amount: 6000, date: '2025-04-10', status: 'completed' },
          { description: 'Replacement Stock', amount: 3000, date: '2025-05-05', status: 'completed' },
          { description: 'Special Editions', amount: 3000, date: '2025-06-01', status: 'pending' },
          { description: 'Seasonal Collection', amount: 10000, date: '2025-06-20', status: 'planned' },
        ]
      }
    },
    {
      id: 'BUD-003',
      category: 'Operations Budget',
      period: 'Q3 2025',
      allocated: 12000,
      spent: 9000,
      remaining: 3000,
      details: {
        items: [
          { description: 'Office Supplies', amount: 2000, date: '2025-07-05', status: 'completed' },
          { description: 'Equipment Maintenance', amount: 4000, date: '2025-08-01', status: 'completed' },
          { description: 'Software Licenses', amount: 2000, date: '2025-08-15', status: 'completed' },
          { description: 'Staff Training', amount: 3000, date: '2025-09-10', status: 'pending' },
        ]
      }
    },
    {
      id: 'BUD-004',
      category: 'Expansion Budget',
      period: 'Q4 2025',
      allocated: 30000,
      spent: 5000,
      remaining: 25000,
      details: {
        items: [
          { description: 'New Branch Setup', amount: 5000, date: '2025-10-10', status: 'pending' },
          { description: 'Furniture', amount: 0, date: '2025-11-01', status: 'planned' },
          { description: 'IT Infrastructure', amount: 0, date: '2025-12-01', status: 'planned' },
        ]
      }
    },
  ];

  // State for filter and modal
  const [periodFilter, setPeriodFilter] = useState<string | null>('All');
  const [selectedBudget, setSelectedBudget] = useState<BudgetData | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  // Filter budgets
  const filteredBudgets = periodFilter === 'All'
    ? budgets
    : budgets.filter(budget => budget.period === periodFilter);

  // Calculate progress percentage
  const getProgress = (spent: number, allocated: number): number => {
    return (spent / allocated) * 100;
  };

  // Get progress bar color based on usage
  const getProgressColor = (progress: number): string => {
    if (progress >= 90) return 'var(--danger)';
    if (progress >= 70) return 'var(--warning)';
    return 'var(--success)';
  };

  // Function to handle view details click
  const handleViewDetails = (budget: BudgetData) => {
    console.log('Opening modal for budget:', budget);
    setSelectedBudget(budget);
    open();
  };

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'var(--success)';
      case 'pending':
        return 'var(--warning)';
      case 'planned':
        return 'var(--accent)';
      default:
        return 'var(--text-secondary)';
    }
  };

  return (
    <div className="budget-container">
      <Stack gap="md">
        <Title order={2}>Budget Management</Title>

        {/* Filter Section */}
        <Paper p="md" shadow="xs" className="filter-section">
          <Select
            label="Filter by Period"
            placeholder="Select period"
            data={['All', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025']}
            value={periodFilter}
            onChange={setPeriodFilter}
            className="period-filter"
          />
        </Paper>

        {/* Budget Cards */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {filteredBudgets.map((budget) => {
            const progress = getProgress(budget.spent, budget.allocated);
            return (
              <Paper key={budget.id} p="md" shadow="xs" className="budget-card">
                <Stack gap="sm">
                  <Text fw={500} className="budget-category">{budget.category}</Text>
                  <Text size="sm" c="dimmed" className="budget-period">{budget.period}</Text>
                  <Group gap="xs" align="center">
                    <Text className="budget-label">Allocated:</Text>
                    <Text className="budget-value">{formatCurrency(budget.allocated)}</Text>
                  </Group>
                  <Group gap="xs" align="center">
                    <Text className="budget-label">Spent:</Text>
                    <Text className="budget-value">{formatCurrency(budget.spent)}</Text>
                  </Group>
                  <Group gap="xs" align="center">
                    <Text className="budget-label">Remaining:</Text>
                    <Text className="budget-value">{formatCurrency(budget.remaining)}</Text>
                  </Group>
                  <Stack gap="xs">
                    <Text size="sm" className="budget-progress-label">Budget Usage</Text>
                    <Progress
                      value={progress}
                      color={getProgressColor(progress)}
                      size="md"
                      className="budget-progress"
                    />
                    <Text size="xs" c="dimmed">{progress.toFixed(0)}% Used</Text>
                  </Stack>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => handleViewDetails(budget)}
                    className="details-button"
                  >
                    View Details
                  </Button>
                </Stack>
              </Paper>
            );
          })}
        </SimpleGrid>
      </Stack>

      {/* Budget Details Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={selectedBudget?.category}
        size="lg"
        styles={{
          title: { color: 'white', fontSize: '1.2rem', fontWeight: 600 },
          header: { backgroundColor: '#263238' },
          content: { backgroundColor: '#37474f' },
          body: { color: 'white' }
        }}
      >
        {selectedBudget && (
          <Stack gap="md">
            <Text size="sm" c="dimmed">Period: {selectedBudget.period}</Text>
            
            <Group grow>
              <Paper p="md" bg="#455A64" radius="md">
                <Text size="sm" c="dimmed">Allocated</Text>
                <Text fw={500} size="lg">{formatCurrency(selectedBudget.allocated)}</Text>
              </Paper>
              <Paper p="md" bg="#455A64" radius="md">
                <Text size="sm" c="dimmed">Spent</Text>
                <Text fw={500} size="lg">{formatCurrency(selectedBudget.spent)}</Text>
              </Paper>
              <Paper p="md" bg="#455A64" radius="md">
                <Text size="sm" c="dimmed">Remaining</Text>
                <Text fw={500} size="lg">{formatCurrency(selectedBudget.remaining)}</Text>
              </Paper>
            </Group>

            <Progress
              value={getProgress(selectedBudget.spent, selectedBudget.allocated)}
              color={getProgressColor(getProgress(selectedBudget.spent, selectedBudget.allocated))}
              size="md"
              className="budget-progress"
            />
            
            {selectedBudget.details && (
              <>
                <Title order={4} mt="md">Expense Breakdown</Title>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th style={{ color: 'white' }}>Date</Table.Th>
                      <Table.Th style={{ color: 'white' }}>Description</Table.Th>
                      <Table.Th style={{ color: 'white' }}>Amount</Table.Th>
                      <Table.Th style={{ color: 'white' }}>Status</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedBudget.details.items.map((item, index) => (
                      <Table.Tr key={index}>
                        <Table.Td style={{ color: 'white' }}>{formatDate(item.date)}</Table.Td>
                        <Table.Td style={{ color: 'white' }}>{item.description}</Table.Td>
                        <Table.Td style={{ color: 'white' }}>{formatCurrency(item.amount)}</Table.Td>
                        <Table.Td>
                          <Text
                            size="sm"
                            style={{
                              color: getStatusColor(item.status),
                              textTransform: 'capitalize'
                            }}
                          >
                            {item.status}
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </>
            )}
          </Stack>
        )}
      </Modal>
    </div>
  );
};

export default FinanceManagerBudget;