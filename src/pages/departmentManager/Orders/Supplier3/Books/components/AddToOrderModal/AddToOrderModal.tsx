import { Modal, Box, Group, Title, ActionIcon, Button, NumberInput, Text } from '@mantine/core';
import { IconShoppingCart, IconX } from '@tabler/icons-react';
import classes from './AddToOrderModal.module.css';
import theme from '../../../../../../../utils/theme';
import { Book } from '../../../../../../../dummyData/adminPages/booksData';
import { useState } from 'react';

interface AddToOrderModalProps {
  opened: boolean;
  onClose: () => void;
  book: Book;
  onAddToOrder: (book: Book, quantity: number) => void;
}

const AddToOrderModal: React.FC<AddToOrderModalProps> = ({
  opened,
  onClose,
  book,
  onAddToOrder,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const availableQuantity = book.quantity - book.reservedQuantity;

  const handleAdd = () => {
    if (quantity <= 0 || quantity > availableQuantity) return;
    onAddToOrder(book, quantity);
    setQuantity(1);
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
              <IconShoppingCart size={24} color="#1971C2" />
            </ActionIcon>
            <Title order={4}>Add to Order</Title>
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
          <Text size="md" mb="md">
            Book: {book.name} (${book.pricePerOne.toFixed(2)} each)
          </Text>
          <Text size="sm" c="dimmed" mb="md">
            Available: {availableQuantity}
          </Text>
          <NumberInput
            label="Order Quantity"
            placeholder="Enter quantity to order"
            value={quantity}
            onChange={(value) => setQuantity(Number(value))}
            min={1}
            max={availableQuantity}
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
            disabled={quantity <= 0 || quantity > availableQuantity}
          >
            ADD TO ORDER
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default AddToOrderModal;