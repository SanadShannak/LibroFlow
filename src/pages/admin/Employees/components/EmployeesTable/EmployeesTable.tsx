import { Table, ActionIcon, Group, Text } from '@mantine/core';
import { IconSearch, IconPencil, IconTrash } from '@tabler/icons-react';
import classes from './EmployeesTable.module.css';
import { Employee } from '../../employeesData';

interface EmployeesTableProps {
  employees: Employee[];
  onShowDetails: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({
  employees,
  onShowDetails,
  onEdit,
  onDelete,
}) => {
  const rows = employees.map((employee) => (
    <Table.Tr
      key={employee.id}
      className={classes.tableRow}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <Table.Td className={classes.tableCell}>{employee.id}</Table.Td>
      <Table.Td className={classes.tableCell}>{employee.name}</Table.Td>
      <Table.Td className={classes.tableCell}>{employee.email}</Table.Td>
      <Table.Td className={classes.tableCell}>{employee.role}</Table.Td>
      <Table.Td className={classes.tableCell}>{employee.branch}</Table.Td>
      <Table.Td className={classes.tableCell}>
        <Group gap="md" justify="center">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ActionIcon
              variant="transparent"
              color="white"
              onClick={() => onShowDetails(employee)}
              aria-label="View employee"
            >
              <IconSearch size={16} />
            </ActionIcon>
            <Text size="xs" c="dimmed">View</Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ActionIcon
              variant="transparent"
              color="white"
              onClick={() => onEdit(employee)}
              aria-label="Edit employee"
            >
              <IconPencil size={16} />
            </ActionIcon>
            <Text size="xs" c="dimmed">Update</Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ActionIcon
              variant="transparent"
              color="white"
              onClick={() => onDelete(employee)}
              aria-label="Delete employee"
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
          <Table.Th className={classes.tableHeader}>Email</Table.Th>
          <Table.Th className={classes.tableHeader}>Role</Table.Th>
          <Table.Th className={classes.tableHeader}>Branch</Table.Th>
          <Table.Th className={classes.tableHeader}>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default EmployeesTable;