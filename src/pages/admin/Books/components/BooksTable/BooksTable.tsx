import { Table, ActionIcon, Group, Text, Button, Tooltip } from '@mantine/core';
import { IconSearch, IconPencil, IconTrash, IconChevronUp, IconChevronDown, IconArchive } from '@tabler/icons-react';
import classes from './BooksTable.module.css';
import { Book } from '../../../../../dummyData/adminPages/booksData';
import { useState } from 'react';

interface BooksTableProps {
  books: Book[];
  onShowDetails: (book: Book) => void;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onArchive: (book: Book) => void;
}

const BooksTable: React.FC<BooksTableProps> = ({
  books,
  onShowDetails,
  onEdit,
  onDelete,
  onArchive,
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
      <Table.Td className={`${classes.tableCell} ${classes.centered}`}>{book.reservedQuantity}</Table.Td>
      <Table.Td className={`${classes.tableCell} ${classes.centered}`}>
        <Text size="sm" color={getAvailabilityColor(book.availability)} style={{ fontWeight: 500 }}>
          {book.availability}
        </Text>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <Group gap="xs" justify="center">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Tooltip label="View Details" withArrow>
              <ActionIcon
                variant="transparent"
                color="white"
                onClick={() => onShowDetails(book)}
                aria-label="View Details"
              >
                <IconSearch size={16} />
              </ActionIcon>
            </Tooltip>
            <Text size="xs" c="dimmed">View</Text>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Tooltip label="Edit Book" withArrow>
              <ActionIcon
                variant="transparent"
                color="white"
                onClick={() => onEdit(book)}
                aria-label="Edit Book"
              >
                <IconPencil size={16} />
              </ActionIcon>
            </Tooltip>
            <Text size="xs" c="dimmed">Edit</Text>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Tooltip label="Delete Book" withArrow>
              <ActionIcon
                variant="transparent"
                color="white"
                onClick={() => onDelete(book)}
                aria-label="Delete Book"
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
            <Text size="xs" c="dimmed">Delete</Text>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Tooltip label="Archive Book" withArrow>
              <ActionIcon
                variant="transparent"
                color="white"
                onClick={() => onArchive(book)}
                aria-label="Archive Book"
              >
                <IconArchive size={16} />
              </ActionIcon>
            </Tooltip>
            <Text size="xs" c="dimmed">Archive</Text>
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
          <Table.Th className={classes.tableHeader}>Quantity</Table.Th>
          <Table.Th className={classes.tableHeader}>Reserved</Table.Th>
          <Table.Th className={classes.tableHeader}>Availability</Table.Th>
          <Table.Th className={classes.tableHeader}>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default BooksTable;