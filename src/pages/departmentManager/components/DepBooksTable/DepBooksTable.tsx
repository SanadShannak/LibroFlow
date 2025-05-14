import { Table, ActionIcon, Group, Text, Button } from '@mantine/core';
import { IconSearch, IconPencil, IconTrash, IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import classes from './BooksTable.module.css';
import { Book } from '../../../../dummyData/adminPages/booksData';
import { useState } from 'react';

interface BooksTableProps {
  books: Book[];
  onShowDetails: (book: Book) => void;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

const BooksTable: React.FC<BooksTableProps> = ({
  books,
  onShowDetails,
  onEdit,
  onDelete,
}) => {
  const [sortColumn, setSortColumn] = useState<'quantity' | 'availability' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: 'quantity' | 'availability') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedBooks = [...books].sort((a, b) => {
    if (!sortColumn) return 0;
    if (sortColumn === 'quantity') {
      return sortDirection === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
    }
    if (sortColumn === 'availability') {
      return sortDirection === 'asc'
        ? a.availability.localeCompare(b.availability)
        : b.availability.localeCompare(a.availability);
    }
    return 0;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return '#28A745'; // Green
      case 'Borrowed':
        return '#FFC107'; // Yellow
      case 'Not Available':
        return '#F08080'; // Light Red
      default:
        return '#FFFFFF';
    }
  };

  const rows = sortedBooks.map((book) => (
    <Table.Tr
      key={book.id}
      className={classes.tableRow}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <Table.Td className={classes.tableCell}>{book.id}</Table.Td>
      <Table.Td className={classes.tableCell}>{book.name}</Table.Td>
      <Table.Td className={classes.tableCell}>{book.type}</Table.Td>
      <Table.Td className={classes.tableCell}>{book.language}</Table.Td>
      <Table.Td className={`${classes.tableCell} ${classes.centered}`}>{book.quantity}</Table.Td>
      <Table.Td className={`${classes.tableCell} ${classes.centered}`}>
        <Text size="sm" color={getAvailabilityColor(book.availability)} style={{ fontWeight: 500 }}>
          {book.availability}
        </Text>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <Group gap="md" justify="center">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ActionIcon
              variant="transparent"
              color="white"
              onClick={() => onShowDetails(book)}
              aria-label="View book"
            >
              <IconSearch size={16} />
            </ActionIcon>
            <Text size="xs" c="dimmed">View</Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ActionIcon
              variant="transparent"
              color="white"
              onClick={() => onEdit(book)}
              aria-label="Edit book"
            >
              <IconPencil size={16} />
            </ActionIcon>
            <Text size="xs" c="dimmed">Update</Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ActionIcon
              variant="transparent"
              color="white"
              onClick={() => onDelete(book)}
              aria-label="Delete book"
            >
              <IconTrash size={16} />
            </ActionIcon>
            <Text size="xs" c="dimmed">Delete</Text>
          </div>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table className={classes.table}>
      <Table.Thead className={classes.tableHead}>
        <Table.Tr>
          <Table.Th className={classes.tableHeader}>ID</Table.Th>
          <Table.Th className={classes.tableHeader}>Name</Table.Th>
          <Table.Th className={classes.tableHeader}>Type</Table.Th>
          <Table.Th className={classes.tableHeader}>Language</Table.Th>
          <Table.Th className={classes.tableHeader}>
            <Group gap="xs" align="center" justify="center">
              Quantity
              <Button
                variant="subtle"
                size="xs"
                onClick={() => handleSort('quantity')}
                rightSection={
                  sortColumn === 'quantity' && sortDirection === 'asc' ? (
                    <IconChevronUp size={14} />
                  ) : (
                    <IconChevronDown size={14} />
                  )
                }
              />
            </Group>
          </Table.Th>
          <Table.Th className={classes.tableHeader}>
            <Group gap="xs" align="center" justify="center">
              Availability
              <Button
                variant="subtle"
                size="xs"
                onClick={() => handleSort('availability')}
                rightSection={
                  sortColumn === 'availability' && sortDirection === 'asc' ? (
                    <IconChevronUp size={14} />
                  ) : (
                    <IconChevronDown size={14} />
                  )
                }
              />
            </Group>
          </Table.Th>
          <Table.Th className={classes.tableHeader}>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default BooksTable;