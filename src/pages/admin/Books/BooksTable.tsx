import React from 'react';
import { Table, ActionIcon, Group, Text } from '@mantine/core';
import { IconArchive, IconEdit, IconEye } from '@tabler/icons-react';
import { Book } from '../../../dummyData/adminPages/booksData';
import classes from './BooksTable.module.css';

interface BooksTableProps {
  books: Book[];
  onArchive: (book: Book) => void;
  onEdit?: (book: Book) => void;
  onShowDetails?: (book: Book) => void;
}

const BooksTable: React.FC<BooksTableProps> = ({ books, onArchive, onEdit, onShowDetails }) => {
  return (
    <Table className={classes.table}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ISBN</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th>Language</Table.Th>
          <Table.Th>Quantity</Table.Th>
          <Table.Th>Reserved</Table.Th>
          <Table.Th>Availability</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {books.map((book) => (
          <Table.Tr key={book.isbn}>
            <Table.Td>{book.isbn}</Table.Td>
            <Table.Td>{book.name}</Table.Td>
            <Table.Td>{book.type}</Table.Td>
            <Table.Td>{book.language}</Table.Td>
            <Table.Td>{book.quantity}</Table.Td>
            <Table.Td>{book.reservedQuantity}</Table.Td>
            <Table.Td>
              <Text
                size="sm"
                fw={500}
                c={book.availability === 'Available' ? 'green' : 'red'}
              >
                {book.availability}
              </Text>
            </Table.Td>
            <Table.Td>${book.pricePerOne.toFixed(2)}</Table.Td>
            <Table.Td>
              <Group gap={4} justify="flex-end">
                {onShowDetails && (
                  <ActionIcon
                    variant="subtle"
                    color="blue"
                    onClick={() => onShowDetails(book)}
                    title="View Details"
                  >
                    <IconEye size={16} />
                  </ActionIcon>
                )}
                {onEdit && (
                  <ActionIcon
                    variant="subtle"
                    color="yellow"
                    onClick={() => onEdit(book)}
                    title="Edit Book"
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                )}
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={() => onArchive(book)}
                  title="Archive Book"
                >
                  <IconArchive size={16} />
                </ActionIcon>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default BooksTable; 