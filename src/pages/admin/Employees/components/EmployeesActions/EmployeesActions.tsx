import { Button, Group, TextInput, Select, Box } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import classes from './EmployeesActions.module.css';
import { Employee } from '../../employeesData';

interface EmployeesActionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAdd: () => void;
  onRoleFilterChange: (value: string | null) => void;
  onBranchFilterChange: (value: string | null) => void;
  roleFilter: string | null;
  branchFilter: string | null;
  employees: Employee[];
}

const EmployeesActions: React.FC<EmployeesActionsProps> = ({
  searchQuery,
  onSearchChange,
  onAdd,
  onRoleFilterChange,
  onBranchFilterChange,
  roleFilter,
  branchFilter,
  employees,
}) => {
  const roles = Array.from(new Set(employees.map((employee) => employee.role)));
  const branches = Array.from(new Set(employees.map((employee) => employee.branch)));

  const unselectedBackgroundColor = '#4A5E6A';
  const selectedBackgroundColor = '#E0E0E0';
  const defaultTextColor = '#E0E0E0';
  const selectedTextColor = '#333333';
  const hoverTextColor = '#333333';

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Group gap="xs" className={classes.actionGroup} justify="flex-end" mb="md">
        <Button
          onClick={onAdd}
          leftSection={<IconPlus size={18} color="white" />}
          style={{ backgroundColor: '#1971C2', color: 'white' }}
          className={classes.addButton}
        >
          Add User
        </Button>
        <TextInput
          placeholder="Search by ID or Name"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
          rightSection={<IconSearch size={16} />}
          className={classes.searchInput}
        />
      </Group>
      <Group gap="md" justify="flex-end">
        <Select
          placeholder="Filter by Role"
          data={roles}
          value={roleFilter}
          onChange={onRoleFilterChange}
          clearable
          className={classes.filterInput}
          styles={{
            input: {
              backgroundColor: roleFilter ? selectedBackgroundColor : unselectedBackgroundColor,
              color: roleFilter ? selectedTextColor : defaultTextColor,
              border: '1px solid #4A5E6A',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: roleFilter ? selectedTextColor : hoverTextColor,
              },
            },
            dropdown: { backgroundColor: unselectedBackgroundColor, border: '1px solid #4A5E6A' },
            option: { color: defaultTextColor },
          }}
          rightSection={<span style={{ color: roleFilter ? selectedTextColor : defaultTextColor, pointerEvents: 'none' }} />}
        />
        <Select
          placeholder="Filter by Branch"
          data={branches}
          value={branchFilter}
          onChange={onBranchFilterChange}
          clearable
          className={classes.filterInput}
          styles={{
            input: {
              backgroundColor: branchFilter ? selectedBackgroundColor : unselectedBackgroundColor,
              color: branchFilter ? selectedTextColor : defaultTextColor,
              border: '1px solid #4A5E6A',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: branchFilter ? selectedTextColor : hoverTextColor,
              },
            },
            dropdown: { backgroundColor: unselectedBackgroundColor, border: '1px solid #4A5E6A' },
            option: { color: defaultTextColor },
          }}
          rightSection={<span style={{ color: branchFilter ? selectedTextColor : defaultTextColor, pointerEvents: 'none' }} />}
        />
      </Group>
    </Box>
  );
};

export default EmployeesActions;