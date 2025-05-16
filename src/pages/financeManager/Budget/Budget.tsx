import React, { useState } from 'react';
import { Title, Text, Paper, Stack, SimpleGrid, Select, Progress, Group, Button } from '@mantine/core';
import './Budget.css';

interface BudgetData {
  id: string;
  category: string;
  period: string;
  allocated: number;
  spent: number;
  remaining: number;
}

const FinanceManagerBudget: React.FC = () => {
  // Mock budget data
  const budgets: BudgetData[] = [
    {
      id: 'BUD-001',
      category: 'Marketing Budget',
      period: 'Q1 2025',
      allocated: 5000,
      spent: 3200,
      remaining: 1800,
    },
    {
      id: 'BUD-002',
      category: 'Inventory Budget',
      period: 'Q1 2025',
      allocated: 20000,
      spent: 15000,
      remaining: 5000,
    },
    {
      id: 'BUD-003',
      category: 'Operations Budget',
      period: 'Q1 2025',
      allocated: 10000,
      spent: 8500,
      remaining: 1500,
    },
  ];

  // State for filter
  const [periodFilter, setPeriodFilter] = useState<string | null>('All');

  // Filter budgets (mocked for single period, extendable for multiple periods)
  const filteredBudgets = periodFilter === 'All' || periodFilter === 'Q1 2025'
    ? budgets
    : []; // In a real app, filter by actual period data

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

  return (
    <div className="budget-container">
      <Stack gap="md">
        <Title order={2}>Budget Management</Title>

        {/* Filter Section */}
        <Paper p="md" shadow="xs" className="filter-section">
          <Select
            label="Filter by Period"
            placeholder="Select period"
            data={['All', 'Q1 2025']} // Add more periods as needed
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
                    <Text className="budget-value">${budget.allocated.toLocaleString()}</Text>
                  </Group>
                  <Group gap="xs" align="center">
                    <Text className="budget-label">Spent:</Text>
                    <Text className="budget-value">${budget.spent.toLocaleString()}</Text>
                  </Group>
                  <Group gap="xs" align="center">
                    <Text className="budget-label">Remaining:</Text>
                    <Text className="budget-value">${budget.remaining.toLocaleString()}</Text>
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
                    variant="outline"
                    size="sm"
                    onClick={() => alert(`Viewing details for ${budget.category}`)}
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
    </div>
  );
};

export default FinanceManagerBudget;