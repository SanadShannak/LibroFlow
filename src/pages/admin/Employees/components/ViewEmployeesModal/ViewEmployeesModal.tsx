import { Modal, Box, Button, Group, Title, ActionIcon, Text, Grid } from '@mantine/core';
import { IconUser, IconX } from '@tabler/icons-react';
import classes from './ViewEmployeesModal.module.css';
import { Employee } from '../../../../../dummyData/adminPages/employeesData';

interface ViewEmployeesModalProps {
  opened: boolean;
  onClose: () => void;
  employee: Employee;
}

const ViewEmployeesModal: React.FC<ViewEmployeesModalProps> = ({
  opened,
  onClose,
  employee,
}) => {
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
      size="lg"
      zIndex={1000}
      className={classes.modal}
    >
      <Box className={classes.modalBox}>
        <Group justify="space-between" mb="md">
          <Group>
            <ActionIcon variant="transparent" size="md">
              <IconUser size={24} color="#1971C2" />
            </ActionIcon>
            <Title order={4}>View User</Title>
          </Group>
          <ActionIcon
            onClick={onClose}
            variant="subtle"
            className={classes.closeButton}
          >
            <IconX size={18} color="#666" />
          </ActionIcon>
        </Group>

        <Text size="sm" c="dimmed" mb="lg" style={{ borderBottom: '1px solid #E9ECEF', paddingBottom: '8px' }}>
          User ID: {employee.id}
        </Text>

        <Grid>
          <Grid.Col span={6}>
            <Box className={classes.infoBox}>
              <Text size="sm" c="dimmed">Name</Text>
              <Text size="md" mb="sm">{employee.name}</Text>
              
              <Text size="sm" c="dimmed">Email</Text>
              <Text size="md" mb="sm">{employee.email}</Text>
              
              <Text size="sm" c="dimmed">Role</Text>
              <Text size="md" mb="sm">{employee.role}</Text>
              
              <Text size="sm" c="dimmed">Branch</Text>
              <Text size="md" mb="sm">{employee.branch}</Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className={classes.infoBox}>
              <Text size="sm" c="dimmed">Added by</Text>
              <Text size="md" mb="sm">{employee.savedBy}</Text>
            </Box>
          </Grid.Col>
        </Grid>

        <Group justify="center" mt="xl">
          <Button
            variant="outline"
            color="gray"
            onClick={onClose}
            className={classes.modalButton}
          >
            CLOSE
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default ViewEmployeesModal;