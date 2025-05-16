import { Modal, Box, Button, Group, Title, ActionIcon, Text, Grid } from '@mantine/core';
import { IconBook, IconX } from '@tabler/icons-react';
import classes from './ViewBooksModal.module.css';
import { Book } from '../../../../../dummyData/adminPages/booksData';

interface ViewBooksModalProps {
  opened: boolean;
  onClose: () => void;
  book: Book;
}

const ViewBooksModal: React.FC<ViewBooksModalProps> = ({
  opened,
  onClose,
  book,
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
              <IconBook size={24} color="#1971C2" />
            </ActionIcon>
            <Title order={4}>View Book</Title>
          </Group>
          <ActionIcon
            onClick={onClose}
            variant="subtle"
            className={classes.closeButton}
          >
            <IconX size={18} color="#666" />
          </ActionIcon>
        </Group>

        <Grid>
          <Grid.Col span={6}>
            <Box className={classes.infoBox}>
              <Text size="sm" c="dimmed">Name</Text>
              <Text size="md" mb="sm">{book.name}</Text>
              
              <Text size="sm" c="dimmed">Type</Text>
              <Text size="md" mb="sm">{book.type}</Text>
              
              <Text size="sm" c="dimmed">Language</Text>
              <Text size="md" mb="sm">{book.language}</Text>
              
              <Text size="sm" c="dimmed">Quantity</Text>
              <Text size="md" mb="sm">{book.quantity}</Text>
              
              <Text size="sm" c="dimmed">Reserved Quantity</Text>
              <Text size="md" mb="sm">{book.reservedQuantity}</Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className={classes.infoBox}>
              <Text size="sm" c="dimmed">Price Per One</Text>
              <Text size="md" mb="sm">${book.pricePerOne.toFixed(2)}</Text>
              
              <Text size="sm" c="dimmed">Saved by</Text>
              <Text size="md" mb="sm">{book.savedBy}</Text>
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

export default ViewBooksModal;