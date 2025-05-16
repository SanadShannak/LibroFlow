import React, { useState } from 'react';
import { Title, Text, Paper, Stack, SimpleGrid, Select, Button } from '@mantine/core';
import './Reports.css';

interface ReportData {
  id: string;
  title: string;
  period: string;
  summary: string;
  type: 'Revenue' | 'Expense' | 'Profit & Loss' | 'Tax';
}

const FinanceManagerReports: React.FC = () => {
  // Mock report data
  const reports: ReportData[] = [
    {
      id: 'RPT-001',
      title: 'Monthly Revenue Report',
      period: 'March 2025',
      summary: 'Total Revenue: $45,231',
      type: 'Revenue',
    },
    {
      id: 'RPT-002',
      title: 'Expense Report',
      period: 'March 2025',
      summary: 'Total Expenses: $12,345',
      type: 'Expense',
    },
    {
      id: 'RPT-003',
      title: 'Profit & Loss Statement',
      period: 'Q1 2025',
      summary: 'Net Profit: $32,886',
      type: 'Profit & Loss',
    },
    {
      id: 'RPT-004',
      title: 'Tax Report',
      period: 'Q1 2025',
      summary: 'Tax Due: $6,577',
      type: 'Tax',
    },
  ];

  // State for filter
  const [reportTypeFilter, setReportTypeFilter] = useState<string | null>('All');

  // Filter reports
  const filteredReports = reportTypeFilter === 'All'
    ? reports
    : reports.filter((report) => report.type === reportTypeFilter);

  // Mock download function
  const handleDownload = (reportId: string, reportTitle: string) => {
    // Simulate downloading a report (e.g., PDF)
    alert(`Downloading ${reportTitle} (ID: ${reportId})...`);
    // In a real app, this would trigger a file download via API or blob
  };

  return (
    <div className="reports-container">
      <Stack gap="md">
        <Title order={2}>Financial Reports</Title>

        {/* Filter Section */}
        <Paper p="md" shadow="xs" className="filter-section">
          <Select
            label="Filter by Report Type"
            placeholder="Select report type"
            data={['All', 'Revenue', 'Expense', 'Profit & Loss', 'Tax']}
            value={reportTypeFilter}
            onChange={setReportTypeFilter}
            className="report-filter"
          />
        </Paper>

        {/* Reports Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {filteredReports.map((report) => (
            <Paper key={report.id} p="md" shadow="xs" className="report-card">
              <Stack gap="sm">
                <Text fw={500} className="report-title">{report.title}</Text>
                <Text size="sm" c="dimmed" className="report-period">{report.period}</Text>
                <Text className="report-summary">{report.summary}</Text>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(report.id, report.title)}
                  className="download-button"
                >
                  Download Report
                </Button>
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    </div>
  );
};

export default FinanceManagerReports;