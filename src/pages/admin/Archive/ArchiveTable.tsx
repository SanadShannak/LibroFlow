import { Table, Text } from '@mantine/core';
import classes from '../Books/components/BooksTable/BooksTable.module.css';
import { Book } from '../../../dummyData/adminPages/booksData';

interface ArchiveTableProps {
  books: Book[];
}

const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case 'Available':
      return '#28A745';
    case 'Borrowed':
      return '#FFC107';
    case 'Not Available':
      return '#F08080';
    default:
      return '#FFFFFF';
  }
};

const ArchiveTable: React.FC<ArchiveTableProps> = ({ books }) => (
  <Table className={classes.table}>
    <Table.Thead className={classes.tableHead}>
      <Table.Tr>
        <Table.Th className={classes.tableHeader}>ID</Table.Th>
        <Table.Th className={classes.tableHeader}>Name</Table.Th>
        <Table.Th className={classes.tableHeader}>Type</Table.Th>
        <Table.Th className={classes.tableHeader}>Language</Table.Th>
        <Table.Th className={classes.tableHeader}>Quantity</Table.Th>
        <Table.Th className={classes.tableHeader}>Reserved Quantity</Table.Th>
        <Table.Th className={classes.tableHeader}>Availability</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      {books.map((book) => (
        <Table.Tr key={book.id} className={classes.tableRow}>
          <Table.Td className={classes.tableCell}>{book.id}</Table.Td>
          <Table.Td className={classes.tableCell}>{book.name}</Table.Td>
          <Table.Td className={classes.tableCell}>{book.type}</Table.Td>
          <Table.Td className={classes.tableCell}>{book.language}</Table.Td>
          <Table.Td className={`${classes.tableCell} ${classes.centered}`}>{book.quantity}</Table.Td>
          <Table.Td className={`${classes.tableCell} ${classes.centered}`}>{book.reservedQuantity}</Table.Td>
          <Table.Td className={classes.tableCell}>
            <Text size="sm" color={getAvailabilityColor(book.availability)} style={{ fontWeight: 500 }}>
              {book.availability}
            </Text>
          </Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  </Table>
);

export default ArchiveTable; 