import { Container, Title, Table, Text } from '@mantine/core';
import classes from './Bills.module.css';
import { useOrders } from '../../../OrderContext';

const Bills = () => {
  const { orders } = useOrders();

  const rows = orders.map((order) => (
    <Table.Tr key={order.orderId}> {/* orderId is string, works as key */}
      <Table.Td className={classes.tableCell}>{order.orderId}</Table.Td>
      <Table.Td className={classes.tableCell}>{order.book.name}</Table.Td>
      <Table.Td className={classes.tableCell}>{order.quantity}</Table.Td>
      <Table.Td className={classes.tableCell}>${order.totalPrice.toFixed(2)}</Table.Td>
      <Table.Td className={classes.tableCell}>{order.orderDate}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container fluid className={classes.container}>
      <Title order={3} c="white" mb="md">
        Order Bills
      </Title>
      <Table className={classes.table}>
        <Table.Thead className={classes.tableHead}>
          <Table.Tr>
            <Table.Th className={classes.tableHeader}>Order ID</Table.Th>
            <Table.Th className={classes.tableHeader}>Book Name</Table.Th>
            <Table.Th className={classes.tableHeader}>Quantity</Table.Th>
            <Table.Th className={classes.tableHeader}>Total Price</Table.Th>
            <Table.Th className={classes.tableHeader}>Order Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={5} className={classes.tableCell}>
                <Text ta="center" c="dimmed">
                  No orders placed yet.
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default Bills;