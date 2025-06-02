import { Table, Text, ActionIcon, Tooltip, Group } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import classes from '../Books/components/BooksTable/BooksTable.module.css';
import { Book } from '../../../dummyData/adminPages/booksData';

interface ArchiveTableProps {
  books: Book[];
  onRemove: (book: Book) => void;
}

const ArchiveTable: React.FC<ArchiveTableProps> = ({ books, onRemove }) => (
  <Table className={classes.table}>
    <Table.Thead className={classes.tableHead}>
      <Table.Tr>
        <Table.Th className={classes.tableHeader}>ID</Table.Th>
        <Table.Th className={classes.tableHeader}>Name</Table.Th>
        <Table.Th className={classes.tableHeader}>Type</Table.Th>
        <Table.Th className={classes.tableHeader}>Language</Table.Th>
        <Table.Th className={classes.tableHeader}>Actions</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      {books.map((book) => (
        <Table.Tr key={book.id} className={classes.tableRow}>
          <Table.Td className={classes.tableCell}>{book.id}</Table.Td>
          <Table.Td className={classes.tableCell}>{book.name}</Table.Td>
          <Table.Td className={classes.tableCell}>{book.type}</Table.Td>
          <Table.Td className={classes.tableCell}>{book.language}</Table.Td>
          <Table.Td className={classes.tableCell}>
            <Group gap="xs" justify="center">
              <Tooltip label="Remove from Archive" withArrow>
                <ActionIcon color="red" variant="subtle" onClick={() => onRemove(book)}>
                  <IconTrash size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  </Table>
);

export default ArchiveTable;