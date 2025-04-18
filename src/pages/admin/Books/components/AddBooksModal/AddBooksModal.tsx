import { Modal, Box, Group, Title, ActionIcon, TextInput, Button, Select, NumberInput } from '@mantine/core';
import { IconBook, IconX } from '@tabler/icons-react';
import classes from './AddBooksModal.module.css';
import theme from '../../../../../utils/theme';
import { Book } from '../../booksData';
import { useState } from 'react';

interface AddBooksModalProps {
  opened: boolean;
  onClose: () => void;
  onAddBook: (newBook: Omit<Book, 'id' | 'availability' | 'savedBy'>) => void;
}

const AddBooksModal: React.FC<AddBooksModalProps> = ({
  opened,
  onClose,
  onAddBook,
}) => {
  const [newBook, setNewBook] = useState<Omit<Book, 'id' | 'availability' | 'savedBy'>>({
    name: '',
    type: '',
    language: '',
    quantity: 0,
    reservedQuantity: 0,
  });

  const types = ['Fiction', 'Self-Help', 'Thriller', 'Children', 'Non-Fiction', 'Classic', 'Dystopian', 'Educational'];
  const languages = ['English', 'Spanish', 'French', 'German'];

  const handleAdd = () => {
    if (!newBook.name || !newBook.type || !newBook.language || newBook.quantity < 0 || newBook.reservedQuantity < 0 || newBook.reservedQuantity > newBook.quantity) return;
    onAddBook(newBook);
    setNewBook({ name: '', type: '', language: '', quantity: 0, reservedQuantity: 0 });
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
              <IconBook size={24} color="#1971C2" />
            </ActionIcon>
            <Title order={4}>Add Book</Title>
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
            value={newBook.name}
            onChange={(event) => setNewBook({ ...newBook, name: event.currentTarget.value })}
            required
            className={classes.input}
          />
          <Select
            label="Type"
            placeholder="Select book type"
            data={types}
            value={newBook.type}
            onChange={(value) => setNewBook({ ...newBook, type: value as string })}
            required
            className={classes.input}
            styles={{
              dropdown: { zIndex: 1001 },
            }}
            rightSection={<span style={{ color: theme.colors.darkBlueLighter }} />}
          />
          <Select
            label="Language"
            placeholder="Select book language"
            data={languages}
            value={newBook.language}
            onChange={(value) => setNewBook({ ...newBook, language: value as string })}
            required
            className={classes.input}
            styles={{
              dropdown: { zIndex: 1001 },
            }}
            rightSection={<span style={{ color: theme.colors.darkBlueLighter, pointerEvents: 'none' }} />}
          />
          <NumberInput
            label="Quantity"
            placeholder="Enter quantity"
            value={newBook.quantity}
            onChange={(value) => setNewBook({ ...newBook, quantity: Number(value) })}
            min={0}
            required
            className={classes.input}
          />
          <NumberInput
            label="Reserved Quantity"
            placeholder="Enter reserved quantity"
            value={newBook.reservedQuantity}
            onChange={(value) => setNewBook({ ...newBook, reservedQuantity: Number(value) })}
            min={0}
            max={newBook.quantity}
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

export default AddBooksModal;