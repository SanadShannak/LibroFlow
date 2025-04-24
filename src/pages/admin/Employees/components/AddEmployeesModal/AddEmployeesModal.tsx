import { Modal, Box, Group, Title, ActionIcon, TextInput, Button, Select } from '@mantine/core';
import { IconUser, IconX } from '@tabler/icons-react';
import classes from './AddEmployeesModal.module.css';
import theme from '../../../../../utils/theme';
import { Employee } from '../../../../../dummyData/adminPages/employeesData';
import { useState } from 'react';

interface AddEmployeesModalProps {
  opened: boolean;
  onClose: () => void;
  onAddEmployee: (newEmployee: Omit<Employee, 'id' | 'savedBy'>) => void;
}

const AddEmployeesModal: React.FC<AddEmployeesModalProps> = ({
  opened,
  onClose,
  onAddEmployee,
}) => {
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id' | 'savedBy'>>({
    name: '',
    email: '',
    role: '',
    branch: '',
  });

  const roles = ['Department Manager', 'Supplier', 'Housekeeper', 'Cashier'];
  const branches = ['Zabeel Amman', 'Raslan', 'Deirah', 'Jumeirah', 'Khalifa', 'Tabour'];

  const handleAdd = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role || !newEmployee.branch) return;
    onAddEmployee(newEmployee);
    setNewEmployee({ name: '', email: '', role: '', branch: '' });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title=""
      centered
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      padding={0}
      radius="md"
      size="md"
      zIndex={1000}
      className={classes.modal}
    >
      <Box className={classes.modalBox}>
        <Group justify="space-between" mb="md">
          <Group>
            <ActionIcon variant="transparent" size="md">
              <IconUser size={24} color="#1971C2" />
            </ActionIcon>
            <Title order={4}>Add User</Title>
          </Group>
          <ActionIcon
            onClick={onClose}
            variant="subtle"
            className={classes.closeButton}
          >
            <IconX size={18} color="#666" />
          </ActionIcon>
        </Group>

        <div className={classes.form}>
          <TextInput
            label="Username"
            placeholder="Enter username"
            value={newEmployee.name}
            onChange={(event) => setNewEmployee({ ...newEmployee, name: event.currentTarget.value })}
            required
            className={classes.input}
          />
          <TextInput
            label="Email"
            placeholder="Enter email"
            value={newEmployee.email}
            onChange={(event) => setNewEmployee({ ...newEmployee, email: event.currentTarget.value })}
            required
            className={classes.input}
          />
          <Select
            label="Role"
            placeholder="Select role"
            data={roles}
            value={newEmployee.role}
            onChange={(value) => setNewEmployee({ ...newEmployee, role: value as string })}
            required
            className={classes.input}
            styles={{
              dropdown: { zIndex: 1001 },
            }}
            rightSection={<span style={{ color: theme.colors.darkBlueLighter }} />}
          />
          <Select
            label="Branch"
            placeholder="Select branch"
            data={branches}
            value={newEmployee.branch}
            onChange={(value) => setNewEmployee({ ...newEmployee, branch: value as string })}
            required
            className={classes.input}
            styles={{
              dropdown: { zIndex: 1001 },
            }}
            rightSection={<span style={{ color: theme.colors.darkBlueLighter, pointerEvents: 'none' }} />}
          />
        </div>

        <Group justify="flex-end" mt="xl">
          <Button
            variant="outline"
            color="gray"
            onClick={onClose}
            className={classes.modalButton}
          >
            CANCEL
          </Button>
          <Button
            style={{ backgroundColor: theme.colors.darkBlueLighter, color: 'white' }}
            onClick={handleAdd}
            className={classes.modalButton}
          >
            ADD
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default AddEmployeesModal;