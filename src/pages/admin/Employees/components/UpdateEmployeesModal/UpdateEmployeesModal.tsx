import { Modal, Box, Group, Title, ActionIcon, TextInput, Button, Select } from '@mantine/core';
import { IconPencil, IconX } from '@tabler/icons-react';
import classes from './UpdateEmployeesModal.module.css';
import theme from '../../../../../utils/theme';
import { Employee } from '../../employeesData';
import { useState } from 'react';

interface UpdateEmployeesModalProps {
  opened: boolean;
  onClose: () => void;
  employee: Employee;
  onUpdateEmployee: (updatedEmployee: Employee) => void;
}

const UpdateEmployeesModal: React.FC<UpdateEmployeesModalProps> = ({
  opened,
  onClose,
  employee,
  onUpdateEmployee,
}) => {
  const [updatedEmployee, setUpdatedEmployee] = useState<Employee>({ ...employee });

  const roles = ['Department Manager', 'Supplier', 'Housekeeper', 'Cashier'];
  const branches = ['Zabeel Amman', 'Raslan', 'Deirah', 'Jumeirah', 'Khalifa', 'Tabour'];

  const handleUpdate = () => {
    if (!updatedEmployee.name || !updatedEmployee.email || !updatedEmployee.role || !updatedEmployee.branch) return;
    onUpdateEmployee(updatedEmployee);
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
          <Group align="center">
            <IconPencil size={24} color="#1971C2" />
            <Title order={4}>Update User</Title>
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
            value={updatedEmployee.name}
            onChange={(event) => setUpdatedEmployee({ ...updatedEmployee, name: event.currentTarget.value })}
            required
            className={classes.input}
          />
          <TextInput
            label="Email"
            placeholder="Enter email"
            value={updatedEmployee.email}
            onChange={(event) => setUpdatedEmployee({ ...updatedEmployee, email: event.currentTarget.value })}
            required
            className={classes.input}
          />
          <Select
            label="Role"
            placeholder="Select role"
            data={roles}
            value={updatedEmployee.role}
            onChange={(value) => setUpdatedEmployee({ ...updatedEmployee, role: value as string })}
            required
            className={classes.input}
            styles={{
              dropdown: { zIndex: 1001 },
            }}
            rightSection={<span style={{ color: theme.colors.darkBlueLighter, pointerEvents: 'none' }} />}
          />
          <Select
            label="Branch"
            placeholder="Select branch"
            data={branches}
            value={updatedEmployee.branch}
            onChange={(value) => setUpdatedEmployee({ ...updatedEmployee, branch: value as string })}
            required
            className={classes.input}
            styles={{
              dropdown: { zIndex: 1001 },
            }}
            rightSection={<span style={{ color: theme.colors.darkBlueLighter }} />}
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
            onClick={handleUpdate}
            className={classes.modalButton}
          >
            UPDATE
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default UpdateEmployeesModal;