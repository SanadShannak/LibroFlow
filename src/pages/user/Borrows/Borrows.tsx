import React from 'react';
import { MantineProvider, Container, Box, Title, Text, ScrollArea } from '@mantine/core';
import { Table } from '@mantine/core';
import classes from './BorrowsPage.module.css';
import tableClasses from './BorrowsTable/BorrowsTable.module.css';
import { useBorrowedBooks } from '../../../context/BorrowedBooksContext';

const UserBorrows: React.FC = () => {
  const { borrowedBooks } = useBorrowedBooks();
  const currentDate = new Date('2025-05-10');

  const getBorrowStatusAndNote = (reservedDates: Date[], claimed: boolean, returned: boolean, points: number) => {
    const sortedDates = [...reservedDates].sort((a, b) => a.getTime() - b.getTime());
    const firstDate = sortedDates[0];
    const lastDate = sortedDates[sortedDates.length - 1];

    // Check if close to deadline (last date is today or tomorrow)
    const isCloseToDeadline = () => {
      const deadline = new Date(lastDate);
      const today = new Date(currentDate);
      const diffDays = Math.round((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 1;
    };

    // Returned: Book was returned on time
    if (returned) {
      return {
        status: 'Returned',
        color: '#4CAF50',
        note: `Returned on time! Earned ${points} points.`,
      };
    }

    // Overdue: Last reserved date is before current date
    if (lastDate < currentDate) {
      return {
        status: 'Overdue',
        color: '#F08080',
        note: 'Ticket issued: Please return the book immediately.',
      };
    }

    // Awaiting Pickup: First reserved date is in the future
    if (firstDate > currentDate) {
      return {
        status: 'Awaiting Pickup',
        color: '#A0AEC0',
        note: `Pickup available on ${firstDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      };
    }

    // Not Claimed: First date is today or past, not claimed, within 2-day pickup window
    const pickupWindowEnd = new Date(firstDate);
    pickupWindowEnd.setDate(pickupWindowEnd.getDate() + 2);
    if (!claimed && currentDate <= pickupWindowEnd) {
      return {
        status: 'Not Claimed',
        color: '#FF9800',
        note: isCloseToDeadline() ? 'Warning: Pickup deadline approaching!' : '',
      };
    }

    // Claimed: Current date is within reserved dates and claimed
    if (claimed && currentDate >= firstDate && currentDate <= lastDate) {
      return {
        status: 'Claimed',
        color: '#4CAF50',
        note: isCloseToDeadline() ? 'Warning: Return due soon!' : '',
      };
    }

    // Default to Not Claimed if within dates but not explicitly handled
    return {
      status: 'Not Claimed',
      color: '#FF9800',
      note: isCloseToDeadline() ? 'Warning: Pickup deadline approaching!' : '',
    };
  };

  const rows = borrowedBooks.map(({ book, reservedDates, copyId, claimed, returned, points }, index) => {
    const { status, color, note } = getBorrowStatusAndNote(reservedDates, claimed, returned, points);
    return (
      <Table.Tr
        key={`${book.id}-${copyId}-${index}`}
        className={tableClasses.tableRow}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Table.Td className={tableClasses.tableCell}>{book.id}</Table.Td>
        <Table.Td className={tableClasses.tableCell}>{book.name}</Table.Td>
        <Table.Td className={tableClasses.tableCell}>{book.type}</Table.Td>
        <Table.Td className={tableClasses.tableCell}>{book.language}</Table.Td>

        <Table.Td className={tableClasses.tableCell}>
          {reservedDates
            .map((date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
            .join(', ')}
        </Table.Td>
        <Table.Td className={`${tableClasses.tableCell} ${tableClasses.centered}`}>
          <Text size="sm" style={{ color, fontWeight: 500 }}>
            {status}
          </Text>
        </Table.Td>
        <Table.Td className={tableClasses.tableCell}>
          <Text size="sm" c={status === 'Overdue' ? '#F08080' : status === 'Returned' ? '#4CAF50' : '#FF9800'}>
            {note}
          </Text>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <MantineProvider>
      <Container fluid className={classes.container}>
        <Box className={classes.header}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box>
              <Title order={3} c="white" mb="xs">
                My Borrowed Books
              </Title>
              <Text size="sm" c="dimmed" style={{ textTransform: 'uppercase' }}>
                Total Borrowed: {borrowedBooks.length}
              </Text>
            </Box>
          </Box>
        </Box>
        <ScrollArea className={classes.tableContainer}>
          <Table className={tableClasses.table}>
            <Table.Thead className={tableClasses.tableHead}>
              <Table.Tr>
                <Table.Th className={tableClasses.tableHeader}>ID</Table.Th>
                <Table.Th className={tableClasses.tableHeader}>Name</Table.Th>
                <Table.Th className={tableClasses.tableHeader}>Type</Table.Th>
                <Table.Th className={tableClasses.tableHeader}>Language</Table.Th>
                <Table.Th className={tableClasses.tableHeader}>Reserved Dates</Table.Th>
                <Table.Th className={tableClasses.tableHeader}>Status</Table.Th>
                <Table.Th className={tableClasses.tableHeader}>Note</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Container>
    </MantineProvider>
  );
};

export default UserBorrows;