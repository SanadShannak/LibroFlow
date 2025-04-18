import { useState } from 'react';
import { MantineProvider, Container, Box, ScrollArea, Text, Title, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './EmployeesPage.module.css';
import { initialEmployees, Employee } from './employeesData';
import EmployeesActions from './components/EmployeesActions/EmployeesActions';
import EmployeesTable from './components/EmployeesTable/EmployeesTable';
import AddEmployeesModal from './components/AddEmployeesModal/AddEmployeesModal';
import UpdateEmployeesModal from './components/UpdateEmployeesModal/UpdateEmployeesModal';
import DeleteEmployeesModal from './components/DeleteEmployeesModal/DeleteEmployeesModal';
import ViewEmployeesModal from './components/ViewEmployeesModal/ViewEmployeesModal';

const AdminEmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [branchFilter, setBranchFilter] = useState<string | null>(null);

  // Modals
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [updateModalOpened, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [viewModalOpened, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);

  const filteredData = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.id.toString().includes(searchQuery);
    const matchesRole = roleFilter ? employee.role === roleFilter : true;
    const matchesBranch = branchFilter ? employee.branch === branchFilter : true;
    return matchesSearch && matchesRole && matchesBranch;
  });

  const handleAddEmployee = (newEmployee: Omit<Employee, 'id' | 'savedBy'>) => {
    const newId = employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
    setEmployees([...employees, { id: newId, ...newEmployee, savedBy: 'Nisal Gunasekara (Admin)' }]);
    closeAddModal();
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee)));
    setSelectedEmployee(null);
    closeUpdateModal();
  };

  const handleDeleteEmployee = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter((employee) => employee.id !== selectedEmployee.id));
      setSelectedEmployee(null);
      closeDeleteModal();
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    openUpdateModal();
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    openViewModal();
  };

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    openDeleteModal();
  };

  return (
    <MantineProvider>
      <Container fluid className={classes.container}>
        <Box className={classes.header}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box>
              <Title order={3} c="white" mb="xs">Employee Management</Title>
              <Text size="sm" c="dimmed" style={{ textTransform: 'uppercase' }}>
                Total Employees: {filteredData.length}
              </Text>
            </Box>
            <Box>
              <EmployeesActions
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAdd={openAddModal}
                onRoleFilterChange={setRoleFilter}
                onBranchFilterChange={setBranchFilter}
                roleFilter={roleFilter}
                branchFilter={branchFilter}
                employees={employees}
              />
            </Box>
          </Box>
        </Box>

        <ScrollArea className={classes.tableScrollArea}>
          <Box className={classes.tableContainer}>
            <EmployeesTable
              employees={filteredData}
              onShowDetails={handleViewEmployee}
              onEdit={handleEditEmployee}
              onDelete={handleDeleteClick}
            />
          </Box>
        </ScrollArea>

        {addModalOpened && (
          <AddEmployeesModal
            opened={addModalOpened}
            onClose={closeAddModal}
            onAddEmployee={handleAddEmployee}
          />
        )}

        {updateModalOpened && selectedEmployee && (
          <UpdateEmployeesModal
            opened={updateModalOpened}
            onClose={closeUpdateModal}
            employee={selectedEmployee}
            onUpdateEmployee={handleUpdateEmployee}
          />
        )}

        {deleteModalOpened && selectedEmployee && (
          <DeleteEmployeesModal
            opened={deleteModalOpened}
            onClose={closeDeleteModal}
            onConfirm={handleDeleteEmployee}
          />
        )}

        {viewModalOpened && selectedEmployee && (
          <ViewEmployeesModal
            opened={viewModalOpened}
            onClose={closeViewModal}
            employee={selectedEmployee}
          />
        )}
      </Container>
    </MantineProvider>
  );
};

export default AdminEmployeesPage;