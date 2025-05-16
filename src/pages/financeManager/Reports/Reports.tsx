import React, { useState } from 'react';
import { Title, Text, Paper, Stack, SimpleGrid, Select, Button, Modal, Table, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './Reports.css';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ReportData {
  id: string;
  title: string;
  period: string;
  summary: string;
  type: 'Revenue' | 'Expense' | 'Profit & Loss' | 'Tax';
  details?: {
    items: Array<{
      description: string;
      amount: number;
      date: string;
    }>;
    total: number;
    currency: string;
  };
}

const FinanceManagerReports: React.FC = () => {
  // Mock report data with detailed information
  const reports: ReportData[] = [
    {
      id: 'RPT-001',
      title: 'Monthly Revenue Report',
      period: 'March 2025',
      summary: 'Total Revenue: $45,231',
      type: 'Revenue',
      details: {
        items: [
          { description: 'Book Sales', amount: 25000, date: '2025-03-01' },
          { description: 'Membership Fees', amount: 12000, date: '2025-03-15' },
          { description: 'Event Revenue', amount: 8231, date: '2025-03-20' },
        ],
        total: 45231,
        currency: 'USD'
      }
    },
    {
      id: 'RPT-002',
      title: 'Expense Report',
      period: 'March 2025',
      summary: 'Total Expenses: $12,345',
      type: 'Expense',
      details: {
        items: [
          { description: 'Inventory Purchase', amount: 5000, date: '2025-03-05' },
          { description: 'Staff Salaries', amount: 4500, date: '2025-03-15' },
          { description: 'Utilities', amount: 1500, date: '2025-03-20' },
          { description: 'Maintenance', amount: 1345, date: '2025-03-25' },
        ],
        total: 12345,
        currency: 'USD'
      }
    },
    {
      id: 'RPT-003',
      title: 'Profit & Loss Statement',
      period: 'Q1 2025',
      summary: 'Net Profit: $32,886',
      type: 'Profit & Loss',
      details: {
        items: [
          { description: 'Total Revenue', amount: 45231, date: '2025-03-31' },
          { description: 'Total Expenses', amount: -12345, date: '2025-03-31' },
        ],
        total: 32886,
        currency: 'USD'
      }
    },
    {
      id: 'RPT-004',
      title: 'Tax Report',
      period: 'Q1 2025',
      summary: 'Tax Due: $6,577',
      type: 'Tax',
      details: {
        items: [
          { description: 'Income Tax', amount: 5000, date: '2025-03-31' },
          { description: 'VAT', amount: 1577, date: '2025-03-31' },
        ],
        total: 6577,
        currency: 'USD'
      }
    },
  ];

  // State for filter and modal
  const [reportTypeFilter, setReportTypeFilter] = useState<string | null>('All');
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  // Filter reports
  const filteredReports = reportTypeFilter === 'All'
    ? reports
    : reports.filter((report) => report.type === reportTypeFilter);

  // Function to generate PDF report
  const generatePDF = (report: ReportData) => {
    console.log('Generating PDF for report:', report);
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text(report.title, 14, 20);
    
    // Add period
    doc.setFontSize(12);
    doc.text(`Period: ${report.period}`, 14, 30);
    
    // Add summary
    doc.text(`Summary: ${report.summary}`, 14, 40);
    
    // Add table if details exist
    if (report.details && report.details.items) {
      console.log('Adding table with details:', report.details);
      const tableData = report.details.items.map(item => [
        item.date,
        item.description,
        `${report.details!.currency} ${item.amount.toFixed(2)}`
      ]);
      
      // Add total row
      tableData.push([
        '',
        'Total',
        `${report.details!.currency} ${report.details!.total.toFixed(2)}`
      ]);
      
      try {
        autoTable(doc, {
          startY: 50,
          head: [['Date', 'Description', 'Amount']],
          body: tableData,
          theme: 'grid',
          headStyles: { fillColor: [38, 50, 56] },
          styles: { fontSize: 10 },
          margin: { top: 50 }
        });
        console.log('Table added successfully');
      } catch (error) {
        console.error('Error adding table:', error);
      }
    }
    
    // Add footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Generated on ${new Date().toLocaleDateString()}`,
        14,
        doc.internal.pageSize.height - 10
      );
    }
    
    return doc;
  };

  // Download function
  const handleDownload = (reportId: string, reportTitle: string) => {
    console.log('Download clicked for report:', reportId, reportTitle);
    const report = reports.find(r => r.id === reportId);
    if (!report) {
      console.error('Report not found:', reportId);
      return;
    }
    
    try {
      const doc = generatePDF(report);
      const fileName = `${reportTitle.replace(/\s+/g, '_')}_${report.period.replace(/\s+/g, '_')}.pdf`;
      console.log('Saving PDF as:', fileName);
      doc.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  // Function to handle view details click
  const handleViewDetails = (report: ReportData) => {
    console.log('Opening modal for report:', report);
    setSelectedReport(report);
    open();
  };

  // Function to format currency
  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} ${amount.toFixed(2)}`;
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
                <Group>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(report.id, report.title)}
                    className="download-button"
                  >
                    Download Report
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => handleViewDetails(report)}
                  >
                    View Details
                  </Button>
                </Group>
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>

      {/* Report Details Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={selectedReport?.title}
        size="lg"
        styles={{
          title: { color: 'white', fontSize: '1.2rem', fontWeight: 600 },
          header: { backgroundColor: '#263238' },
          content: { backgroundColor: '#37474f' },
          body: { color: 'white' }
        }}
      >
        {selectedReport && (
          <Stack gap="md">
            <Text size="sm" c="dimmed">Period: {selectedReport.period}</Text>
            <Text>{selectedReport.summary}</Text>
            
            {selectedReport.details && (
              <>
                <Title order={4} mt="md">Detailed Breakdown</Title>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th style={{ color: 'white' }}>Date</Table.Th>
                      <Table.Th style={{ color: 'white' }}>Description</Table.Th>
                      <Table.Th style={{ color: 'white' }}>Amount</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedReport.details.items.map((item, index) => (
                      <Table.Tr key={index}>
                        <Table.Td style={{ color: 'white' }}>{formatDate(item.date)}</Table.Td>
                        <Table.Td style={{ color: 'white' }}>{item.description}</Table.Td>
                        <Table.Td style={{ color: 'white' }}>
                          {formatCurrency(item.amount, selectedReport.details!.currency)}
                        </Table.Td>
                      </Table.Tr>
                    ))}
                    <Table.Tr style={{ fontWeight: 'bold' }}>
                      <Table.Td style={{ color: 'white' }}></Table.Td>
                      <Table.Td style={{ color: 'white' }}>Total</Table.Td>
                      <Table.Td style={{ color: 'white' }}>
                        {formatCurrency(selectedReport.details.total, selectedReport.details.currency)}
                      </Table.Td>
                    </Table.Tr>
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

export default FinanceManagerReports;