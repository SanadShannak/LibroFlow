import { Modal, Box, Group, Title, ActionIcon, Text, Button } from '@mantine/core';
import { IconTrashX, IconX } from '@tabler/icons-react';
import classes from './DeleteBooksModal.module.css';

interface DeleteBooksModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteBooksModal: React.FC<DeleteBooksModalProps> = ({
  opened,
  onClose,
  onConfirm,
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
      size="md"
      zIndex={1000}
      className={classes.modal}
    >
      <Box className={classes.modalBox}>
        <Group justify="space-between" mb="md">
          <Group>
            <ActionIcon variant="transparent" size="md" color="red">
              <IconTrashX size={24} />
            </ActionIcon>
            <Title order={4}>Delete Confirmation</Title>
          </Group>
          <ActionIcon
            onClick={onClose}
            variant="subtle"
            className={classes.closeButton}
          >
            <IconX size={18} color="#666" />
          </ActionIcon>
        </Group>

        <Text ta="center" my="lg" size="md">
          Are you certain you wish to proceed with the deletion of the selected book?
        </Text>

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
            color="red"
            onClick={onConfirm}
            className={classes.modalButton}
          >
            CONFIRM
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default DeleteBooksModal;