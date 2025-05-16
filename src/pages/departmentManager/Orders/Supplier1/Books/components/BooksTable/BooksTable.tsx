import { Table, ActionIcon, Group, Text, Button } from '@mantine/core';
import { IconSearch, IconPlus, IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import classes from './BooksTable.module.css';
import { Book } from '../../../../../../../dummyData/adminPages/booksData';
import { useState } from 'react';

interface BooksTableProps {
  books: Book[];
  onShowDetails: (book: Book) => void;
  onAddToOrder: (book: Book) => void;
}

const BooksTable: React.FC<BooksTableProps> = ({
  books,
  onShowDetails,
  onAddToOrder,
}) => {
  const [sortColumn, setSortColumn] = useState<'quantity' | 'pricePerOne' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: 'quantity' | 'pricePerOne') => {
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
    if (sortColumn === 'pricePerOne') {
      return sortDirection === 'asc' ? a.pricePerOne - b.pricePerOne : b.pricePerOne - a.pricePerOne;
    }
    return 0;
  });

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
      <Table.Td className={classes.tableCell}>{book.name}</Table.Td>
      <Table.Td className={classes.tableCell}>{book.type}</Table.Td>
      <Table.Td className={classes.tableCell}>{book.language}</Table.Td>
      <Table.Td className={`${classes.tableCell} ${classes.centered}`}>{book.quantity}</Table.Td>
      <Table.Td className={`${classes.tableCell} ${classes.centered}`}>
        <Text size="sm" style={{ fontWeight: 500 }}>
          ${book.pricePerOne.toFixed(2)}
        </Text>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <Group gap="md" justify="center">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ActionIcon
              variant="transparent"
              color="white"
              onClick={() => onShowDetails(book)}
              aria-label="View book details"
            >
              <IconSearch size={16} />
            </ActionIcon>
            <Text size="xs" c="dimmed">View</Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ActionIcon
              variant="transparent"
              color="white"
              onClick={() => onAddToOrder(book)}
              aria-label="Add to order"
            >
              <IconPlus size={16} />
            </ActionIcon>
            <Text size="xs" c="dimmed">Add</Text>
          </div>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table className={classes.table}>
      <Table.Thead className={classes.tableHead}>
        <Table.Tr>
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
              Price Per One
              <Button
                variant="subtle"
                size="xs"
                onClick={() => handleSort('pricePerOne')}
                rightSection={
                  sortColumn === 'pricePerOne' && sortDirection === 'asc' ? (
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