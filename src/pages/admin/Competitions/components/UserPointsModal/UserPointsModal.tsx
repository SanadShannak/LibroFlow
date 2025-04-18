import { Modal, Box, Group, Title, ActionIcon, Table, ScrollArea, Flex, Text, Button } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import classes from './UserPointsModal.module.css';
import theme from '../../../../../utils/theme';
import { CompetitionParticipant, BookEntry } from '../../competitionsData';

interface UserPointsModalProps {
  opened: boolean;
  onClose: () => void;
  participant: CompetitionParticipant | null;
  books: BookEntry[];
}

const UserPointsModal: React.FC<UserPointsModalProps> = ({
  opened,
  onClose,
  participant,
  books,
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
      size="xl"
      zIndex={1000}
      className={classes.modal}
    >
      <Box className={classes.modalBox}>
        <Group justify="space-between" mb="md">
          <Group>
            <Title order={4}>User Details: {participant?.name}</Title>
          </Group>
          <ActionIcon
            onClick={onClose}
            variant="subtle"
            className={classes.closeButton}
          >
            <IconX size={18} color="#666" />
          </ActionIcon>
        </Group>

        <Box className={classes.content}>
          <ScrollArea.Autosize mah={350} className={classes.scrollArea}>
            <Table>
              <Table.Thead className={classes.tableHead}>
                <Table.Tr>
                  <Table.Th className={classes.tableHeader}>Book ID</Table.Th>
                  <Table.Th className={classes.tableHeader}>Name</Table.Th>
                  <Table.Th className={classes.tableHeader}>Type</Table.Th>
                  <Table.Th className={classes.tableHeader}>Language</Table.Th>
                  <Table.Th className={classes.tableHeader}>Points</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {books.map((book) => (
                  <Table.Tr key={book.id}>
                    <Table.Td className={classes.tableCell}>{book.id}</Table.Td>
                    <Table.Td className={classes.tableCell}>{book.name}</Table.Td>
                    <Table.Td className={classes.tableCell}>{book.type}</Table.Td>
                    <Table.Td className={classes.tableCell}>{book.language}</Table.Td>
                    <Table.Td className={classes.tableCell}>{book.points}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea.Autosize>

          <Flex direction="column" p="md" className={classes.summarySection}>
            <Group justify="space-between" p="md" className={classes.summaryBox}>
              <Box>
                <Text fw={500}>Rank</Text>
                <Text size="xl" fw={700}>{participant?.rank || 4}</Text>
              </Box>
              <Box>
                <Text fw={500}>Total Books</Text>
                <Text size="xl" fw={700}>{books.length} books</Text>
              </Box>
              <Box>
                <Text fw={500}>Total Points</Text>
                <Text size="xl" fw={700}>{participant?.points || 20} Points</Text>
              </Box>
            </Group>
          </Flex>
        </Box>

        <Group justify="flex-end" mt="md">
          <Button
            style={{ backgroundColor: theme.colors.darkBlueLighter, color: 'white' }}
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

export default UserPointsModal;