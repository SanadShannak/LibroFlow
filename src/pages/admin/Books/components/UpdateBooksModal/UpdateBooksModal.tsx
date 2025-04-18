import { Modal, Box, Group, Title, ActionIcon, TextInput, Button, Select, NumberInput } from '@mantine/core';
import { IconPencil, IconX } from '@tabler/icons-react';
import classes from './UpdateBooksModal.module.css';
import theme from '../../../../../utils/theme';
import { Book } from '../../booksData';
import { useState } from 'react';

interface UpdateBooksModalProps {
  opened: boolean;
  onClose: () => void;
  book: Book;
  onUpdateBook: (updatedBook: Book) => void;
}

const UpdateBooksModal: React.FC<UpdateBooksModalProps> = ({
  opened,
  onClose,
  book,
  onUpdateBook,
}) => {
  const [updatedBook, setUpdatedBook] = useState<Book>({ ...book });

  const types = ['Fiction', 'Self-Help', 'Thriller', 'Children', 'Non-Fiction', 'Classic', 'Dystopian', 'Educational'];
  const languages = ['English', 'Spanish', 'French', 'German'];

  const handleUpdate = () => {
    if (
      !updatedBook.name ||
      !updatedBook.type ||
      !updatedBook.language ||
      updatedBook.quantity < 0 ||
      updatedBook.reservedQuantity < 0 ||
      updatedBook.reservedQuantity > updatedBook.quantity
    ) return;
    onUpdateBook(updatedBook);
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
            <Title order={4}>Update Book</Title>
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
            label="Name"
            placeholder="Enter book name"
            value={updatedBook.name}
            onChange={(event) => setUpdatedBook({ ...updatedBook, name: event.currentTarget.value })}
            required
            className={classes.input}
          />
          <Select
            label="Type"
            placeholder="Select book type"
            data={types}
            value={updatedBook.type}
            onChange={(value) => setUpdatedBook({ ...updatedBook, type: value as string })}
            required
            className={classes.input}
            styles={{
              dropdown: { zIndex: 1001 },
            }}
            rightSection={<span style={{ color: theme.colors.darkBlueLighter, pointerEvents: 'none' }} />}
          />
          <Select
            label="Language"
            placeholder="Select book language"
            data={languages}
            value={updatedBook.language}
            onChange={(value) => setUpdatedBook({ ...updatedBook, language: value as string })}
            required
            className={classes.input}
            styles={{
              dropdown: { zIndex: 1001 },
            }}
            rightSection={<span style={{ color: theme.colors.darkBlueLighter }} />}
          />
          <NumberInput
            label="Quantity"
            placeholder="Enter quantity"
            value={updatedBook.quantity}
            onChange={(value) => setUpdatedBook({ ...updatedBook, quantity: Number(value) })}
            min={0}
            required
            className={classes.input}
          />
          <NumberInput
            label="Reserved Quantity"
            placeholder="Enter reserved quantity"
            value={updatedBook.reservedQuantity}
            onChange={(value) => setUpdatedBook({ ...updatedBook, reservedQuantity: Number(value) })}
            min={0}
            max={updatedBook.quantity}
            required
            className={classes.input}
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

export default UpdateBooksModal;