import { useState } from 'react';
import { 
  Table, 
  Button, 
  Group, 
  TextInput, 
  ActionIcon, 
  Box, 
  Modal,
  Text,
  Stack,
  Flex,
  Title,
  Container,
  Paper,
  ScrollArea,
  MantineProvider,
  Badge,
  InputWrapper,
  Input,
} from '@mantine/core';
import { IconTrash, IconSearch, IconPlus, IconPencil, IconTrophy, IconTrashX, IconX } from '@tabler/icons-react';
import theme from '../../../utils/theme';
import { useDisclosure } from '@mantine/hooks';
import classes from './Competitions.module.css';
import { initialCompetitions, mockUserBooks } from './data';

interface Competition {
  id: number;
  name: string;
  reward: string;
  dueDate: Date | null;
  participants: CompetitionParticipant[];
}

interface CompetitionParticipant {
  rank: number;
  userId: number;
  points: number;
  name: string;
  booksRead: number;
}

interface BookEntry {
  id: number;
  name: string;
  type: string;
  language: string;
  points: number;
}

const CompetitionsPage = () => {
  const [competitions, setCompetitions] = useState<Competition[]>(initialCompetitions);
  const [activeCompetitionId, setActiveCompetitionId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<CompetitionParticipant | null>(null);
  const [newCompetition, setNewCompetition] = useState({ name: '', reward: '', dueDate: null as Date | null });
  const [updateCompetition, setUpdateCompetition] = useState<Competition | null>(null);
  const [addDateInput, setAddDateInput] = useState('');
  const [updateDateInput, setUpdateDateInput] = useState('');
  const [addDateError, setAddDateError] = useState<string | null>(null);
  const [updateDateError, setUpdateDateError] = useState<string | null>(null);

  // Modals
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [updateModalOpened, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [userPointsModalOpened, { open: openUserPointsModal, close: closeUserPointsModal }] = useDisclosure(false);

  const activeCompetition = competitions.find(comp => comp.id === activeCompetitionId);
  const competitionData = activeCompetition?.participants || [];

  const filteredData = competitionData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userId.toString().includes(searchQuery)
  );

  const getRankSuffix = (rank: number) => {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  };

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // YYYY-MM-DD for <input type="date">
  };

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return '';
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const parseDateFromInput = (value: string): Date | null => {
    if (!value) return null;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? null : date;
  };

  const validateDate = (value: string): string | null => {
    if (!value) return 'Date is required';
    const date = parseDateFromInput(value);
    if (!date) return 'Invalid date';
    if (date < new Date()) return 'Date must be in the future';
    return null;
  };

  const handleAddDateChange = (value: string) => {
    setAddDateInput(value);
    const error = validateDate(value);
    setAddDateError(error);
    const date = parseDateFromInput(value);
    setNewCompetition({ ...newCompetition, dueDate: date });
  };

  const handleUpdateDateChange = (value: string) => {
    if (!updateCompetition) return;
    setUpdateDateInput(value);
    const error = validateDate(value);
    setUpdateDateError(error);
    const date = parseDateFromInput(value);
    setUpdateCompetition({ ...updateCompetition, dueDate: date });
  };

  const handleAddCompetition = () => {
    if (!newCompetition.name || !newCompetition.reward || !newCompetition.dueDate) return;
    const newId = competitions.length > 0 ? Math.max(...competitions.map(c => c.id)) + 1 : 1;
    setCompetitions([...competitions, {
      id: newId,
      name: newCompetition.name,
      reward: newCompetition.reward,
      dueDate: newCompetition.dueDate,
      participants: [],
    }]);
    setActiveCompetitionId(newId);
    setNewCompetition({ name: '', reward: '', dueDate: null });
    setAddDateInput('');
    setAddDateError(null);
    closeAddModal();
  };

  const handleUpdateCompetition = () => {
    if (!updateCompetition || !updateCompetition.name || !updateCompetition.reward || !updateCompetition.dueDate) return;
    setCompetitions(competitions.map(comp =>
      comp.id === updateCompetition.id ? { ...updateCompetition } : comp
    ));
    setUpdateCompetition(null);
    setUpdateDateInput('');
    setUpdateDateError(null);
    closeUpdateModal();
  };

  const handleDeleteCompetition = () => {
    setCompetitions(competitions.filter(comp => comp.id !== activeCompetitionId));
    setActiveCompetitionId(competitions[0]?.id || 1);
    closeDeleteModal();
  };

  const handleShowUserPoints = (participant: CompetitionParticipant) => {
    setSelectedParticipant(participant);
    openUserPointsModal();
  };

  const openUpdate = () => {
    if (activeCompetition) {
      const comp = { ...activeCompetition };
      setUpdateCompetition(comp);
      setUpdateDateInput(formatDateForInput(comp.dueDate));
      setUpdateDateError(null);
      openUpdateModal();
    }
  };

  const rows = filteredData.map((item) => (
    <Table.Tr 
      key={item.userId} 
      style={{ 
        background: item.rank === 1 
          ? 'linear-gradient(45deg, #FFD700, #FFA500)'
          : 'transparent',
        boxShadow: item.rank === 1 ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (item.rank !== 1) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      }}
      onMouseLeave={(e) => {
        if (item.rank !== 1) e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <Table.Td style={{ padding: '12px 16px', color: item.rank === 1 ? '#000' : '#fff', fontWeight: item.rank === 1 ? 600 : 400, textAlign: 'center' }}>{item.rank}{getRankSuffix(item.rank)}</Table.Td>
      <Table.Td style={{ padding: '12px 16px', color: item.rank === 1 ? '#000' : '#fff', textAlign: 'center' }}>{item.userId}</Table.Td>
      <Table.Td style={{ padding: '12px 16px', color: item.rank === 1 ? '#000' : '#fff', textAlign: 'center' }}>{item.points}</Table.Td>
      <Table.Td style={{ padding: '12px 16px', color: item.rank === 1 ? '#000' : '#fff', textAlign: 'center' }}>{item.name}</Table.Td>
      <Table.Td style={{ padding: '12px 16px', color: item.rank === 1 ? '#000' : '#fff', textAlign: 'center' }}>{item.booksRead}</Table.Td>
      <Table.Td style={{ padding: '12px 16px', textAlign: 'center' }}>
        <ActionIcon 
          variant="transparent" 
          color="white" 
          onClick={() => handleShowUserPoints(item)}
          aria-label="View details"
        >
          <IconSearch size={16} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <MantineProvider>
      <Container fluid className={classes.container} style={{ padding: '0' }}>
        <Group justify="space-between" mb="md">
          <Group gap="xs">
            {competitions.map((comp) => (
              <Button
                key={comp.id}
                color={activeCompetitionId === comp.id ? '#E3E3E3' : 'white'}
                onClick={() => setActiveCompetitionId(comp.id)}
                style={{ 
                  backgroundColor: activeCompetitionId === comp.id ? '#E3E3E3' : '#37474F',
                  borderRadius: '12px',
                  padding: '8px 20px',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: activeCompetitionId === comp.id ? '#263238' : '#E3E3E3',
                  boxShadow: activeCompetitionId === comp.id ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none',
                }}
                className={classes.button}
              >
                {comp.name}
              </Button>
            ))}
          </Group>
          <Group gap="xs">
            <Button
              onClick={openUpdate}
              leftSection={<IconPencil size={18} />}
              className={classes.editButton}
              style={{ 
                backgroundColor: '#E3E3E3',
                borderRadius: '8px',
                padding: '8px 20px',
                fontWeight: 500,
                color: '#37474F',
              }}
            >
              Edit
            </Button>
            <Button
              onClick={openDeleteModal}
              leftSection={<IconTrash size={18} />}
              className={classes.deleteButton}
              style={{ 
                backgroundColor: '#E3E3E3',
                borderRadius: '8px',
                padding: '8px 20px',
                fontWeight: 500,
                color: '#37474F',
              }}
            >
              Delete
            </Button>
            <Button
              onClick={openAddModal}
              leftSection={<IconPlus size={18} color="white" />}
              style={{ 
                backgroundColor: '#37474F',
                borderRadius: '8px',
                padding: '8px 20px',
                fontWeight: 500,
                color: 'white',
              }}
              className={classes.button}
            >
              Add Competition
            </Button>
            <TextInput
              placeholder="Search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
              rightSection={<IconSearch size={16} />}
              className={classes.searchInput}
              styles={{
                input: {
                  borderColor: 'white',
                  backgroundColor: 'white',
                  color: '#263238',
                  borderRadius: '8px',
                  padding: '8px 20px',
                }
              }}
            />
          </Group>
        </Group>

        <Box mb="md">
          <Badge
            size="lg"
            variant="gradient"
            gradient={{ from: 'yellow', to: 'orange', deg: 45 }}
            style={{ fontWeight: 600 }}
          >
            Prize: {activeCompetition?.reward || 'N/A'}
          </Badge>
        </Box>

        <Box className={classes.tableContainer} style={{ width: '100%' }}>
          <Table 
            style={{ 
              background: '#37474F',
              borderRadius: '12px',
              border: 'none',
              width: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
            styles={{
              tr: {
                borderBottom: 'none',
              },
            }}
          >
            <Table.Thead style={{ backgroundColor: 'transparent', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Table.Tr>
                <Table.Th style={{ padding: '12px 16px', color: '#fff', fontWeight: 400, textTransform: 'uppercase', textAlign: 'center' }}>Rank</Table.Th>
                <Table.Th style={{ padding: '12px 16px', color: '#fff', fontWeight: 400, textTransform: 'uppercase', textAlign: 'center' }}>User ID</Table.Th>
                <Table.Th style={{ padding: '12px 16px', color: '#fff', fontWeight: 400, textTransform: 'uppercase', textAlign: 'center' }}>Points</Table.Th>
                <Table.Th style={{ padding: '12px 16px', color: '#fff', fontWeight: 400, textTransform: 'uppercase', textAlign: 'center' }}>Name</Table.Th>
                <Table.Th style={{ padding: '12px 16px', color: '#fff', fontWeight: 400, textTransform: 'uppercase', textAlign: 'center' }}>Books Read</Table.Th>
                <Table.Th style={{ padding: '12px 16px', color: '#fff', fontWeight: 400, textTransform: 'uppercase', textAlign: 'center' }}>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Box>

        {/* Add Competition Modal */}
        <Modal
          opened={addModalOpened}
          onClose={closeAddModal}
          title=""
          centered
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          padding={0}
          radius="md"
          size="md"
          zIndex={1000}
          styles={{
            content: { backgroundColor: 'white', border: '1px solid #e0e0e0' },
            body: { padding: '24px' },
          }}
        >
          <Box className={classes.modalBox}>
            <Group justify="space-between" mb="md">
              <Group>
                <ActionIcon variant="transparent" size="md">
                  <IconTrophy size={24} color="#1971C2" />
                </ActionIcon>
                <Title order={4}>Add Competition</Title>
              </Group>
              <ActionIcon 
                onClick={closeAddModal} 
                variant="subtle"
                style={{ 
                  padding: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: '#f0f0f0',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              >
                <IconX size={18} color="#666" />
              </ActionIcon>
            </Group>

            <Stack gap="md">
              <TextInput
                label="Competition Name"
                placeholder="Enter competition name"
                value={newCompetition.name}
                onChange={(event) => setNewCompetition({ ...newCompetition, name: event.currentTarget.value })}
                required
                styles={{
                  label: { fontWeight: 500, marginBottom: '8px', color: '#333' },
                  input: { borderColor: '#ccc', borderRadius: '4px', padding: '8px', width: '100%' },
                  required: { color: 'red' },
                }}
              />
              <TextInput
                label="Reward"
                placeholder="Enter reward"
                value={newCompetition.reward}
                onChange={(event) => setNewCompetition({ ...newCompetition, reward: event.currentTarget.value })}
                required
                styles={{
                  label: { fontWeight: 500, marginBottom: '8px', color: '#333' },
                  input: { borderColor: '#ccc', borderRadius: '4px', padding: '8px', width: '100%' },
                  required: { color: 'red' },
                }}
              />
              <InputWrapper
                label="Due Date"
                required
                error={addDateError}
                styles={{
                  label: { fontWeight: 500, marginBottom: '8px', color: '#333' },
                  required: { color: 'red' },
                }}
              >
                <Input
                  component="input"
                  type="date"
                  value={addDateInput}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddDateChange(event.target.value)}
                  min={formatDateForInput(new Date())}
                  styles={{
                    input: { borderColor: '#ccc', borderRadius: '4px', padding: '8px', width: '100%' },
                  }}
                />
                {newCompetition.dueDate && (
                  <Text size="sm" c="dimmed" mt={4}>
                    Selected: {formatDateForDisplay(newCompetition.dueDate)}
                  </Text>
                )}
              </InputWrapper>
            </Stack>

            <Group justify="flex-end" mt="xl">
              <Button 
                variant="outline" 
                color="gray"
                onClick={closeAddModal}
                className={classes.modalButton}
                styles={{ root: { borderColor: '#ccc', color: '#666' } }}
              >
                CANCEL
              </Button>
              <Button 
                style={{ backgroundColor: theme.colors.darkBlueLighter, color: 'white' }}
                onClick={handleAddCompetition}
                className={classes.modalButton}
              >
                ADD
              </Button>
            </Group>
          </Box>
        </Modal>

        {/* Update Competition Modal */}
        <Modal
          opened={updateModalOpened}
          onClose={closeUpdateModal}
          title=""
          centered
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          padding={0}
          radius="md"
          size="md"
          zIndex={1000}
          styles={{
            content: { backgroundColor: 'white', border: '1px solid #e0e0e0' },
            body: { padding: '24px' },
          }}
        >
          <Box className={classes.modalBox}>
            <Group justify="space-between" mb="md">
              <Group align="center">
                <IconPencil size={24} color="#1971C2" />
                <Title order={4}>Update Competition</Title>
              </Group>
              <ActionIcon 
                onClick={closeUpdateModal} 
                variant="subtle"
                style={{ 
                  padding: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: '#f0f0f0',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              >
                <IconX size={18} color="#666" />
              </ActionIcon>
            </Group>

            {updateCompetition && (
              <Stack gap="md">
                <TextInput
                  label="Competition Name"
                  placeholder="Enter competition name"
                  value={updateCompetition.name}
                  onChange={(event) => setUpdateCompetition({ ...updateCompetition, name: event.currentTarget.value })}
                  required
                  styles={{
                    label: { fontWeight: 500, marginBottom: '8px', color: '#333' },
                    input: { borderColor: '#ccc', borderRadius: '4px', padding: '8px', width: '100%' },
                    required: { color: 'red' },
                  }}
                />
                <TextInput
                  label="Reward"
                  placeholder="Enter reward"
                  value={updateCompetition.reward}
                  onChange={(event) => setUpdateCompetition({ ...updateCompetition, reward: event.currentTarget.value })}
                  required
                  styles={{
                    label: { fontWeight: 500, marginBottom: '8px', color: '#333' },
                    input: { borderColor: '#ccc', borderRadius: '4px', padding: '8px', width: '100%' },
                    required: { color: 'red' },
                  }}
                />
                <InputWrapper
                  label="Due Date"
                  required
                  error={updateDateError}
                  styles={{
                    label: { fontWeight: 500, marginBottom: '8px', color: '#333' },
                    required: { color: 'red' },
                  }}
                >
                  <Input
                    component="input"
                    type="date"
                    value={updateDateInput}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUpdateDateChange(event.target.value)}
                    min={formatDateForInput(new Date())}
                    styles={{
                      input: { borderColor: '#ccc', borderRadius: '4px', padding: '8px', width: '100%' },
                    }}
                  />
                  {updateCompetition.dueDate && (
                    <Text size="sm" c="dimmed" mt={4}>
                      Selected: {formatDateForDisplay(updateCompetition.dueDate)}
                    </Text>
                  )}
                </InputWrapper>
              </Stack>
            )}

            <Group justify="flex-end" mt="xl">
              <Button 
                variant="outline" 
                color="gray"
                onClick={closeUpdateModal}
                className={classes.modalButton}
                styles={{ root: { borderColor: '#ccc', color: '#666' } }}
              >
                CANCEL
              </Button>
              <Button 
                style={{ backgroundColor: theme.colors.darkBlueLighter, color: 'white' }}
                onClick={handleUpdateCompetition}
                className={classes.modalButton}
              >
                UPDATE
              </Button>
            </Group>
          </Box>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          opened={deleteModalOpened}
          onClose={closeDeleteModal}
          title=""
          centered
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          padding={0}
          radius="md"
          size="md"
          zIndex={1000}
          styles={{
            content: { backgroundColor: 'white', border: '1px solid #e0e0e0' },
            body: { padding: '24px' },
          }}
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
                onClick={closeDeleteModal} 
                variant="subtle"
                style={{ 
                  padding: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: '#f0f0f0',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              >
                <IconX size={18} color="#666" />
              </ActionIcon>
            </Group>

            <Text ta="center" my="lg" size="md">
              Are you certain you wish to proceed with the deletion of the selected competition?
            </Text>

            <Group justify="flex-end" mt="xl">
              <Button 
                variant="outline" 
                color="gray"
                onClick={closeDeleteModal}
                className={classes.modalButton}
                styles={{ root: { borderColor: '#ccc', color: '#666' } }}
              >
                CANCEL
              </Button>
              <Button 
                color="red"
                onClick={handleDeleteCompetition}
                className={classes.modalButton}
              >
                CONFIRM
              </Button>
            </Group>
          </Box>
        </Modal>

        {/* User Points Modal */}
        <Modal
          opened={userPointsModalOpened}
          onClose={closeUserPointsModal}
          title=""
          centered
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          padding={0}
          radius="md"
          size="xl"
          zIndex={1000}
          styles={{
            content: { backgroundColor: 'white', border: '1px solid #e0e0e0' },
            body: { padding: '24px' },
          }}
        >
          <Box className={classes.modalBox}>
            <Group justify="space-between" mb="md">
              <Group>
                <Title order={4}>User Details: {selectedParticipant?.name}</Title>
              </Group>
              <ActionIcon 
                onClick={closeUserPointsModal} 
                variant="subtle"
                style={{ 
                  padding: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: '#f0f0f0',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              >
                <IconX size={18} color="#666" />
              </ActionIcon>
            </Group>
            
            <Box style={{ display: 'flex', flexDirection: 'column', maxHeight: '500px' }}>
              <ScrollArea.Autosize mah={350} style={{ flex: 1, overflowY: 'auto' }}>
                <Table>
                  <Table.Thead style={{ backgroundColor: '#f5f5f5' }}>
                    <Table.Tr>
                      <Table.Th style={{ padding: '12px 16px', fontWeight: 600 }}>Book ID</Table.Th>
                      <Table.Th style={{ padding: '12px 16px', fontWeight: 600 }}>Name</Table.Th>
                      <Table.Th style={{ padding: '12px 16px', fontWeight: 600 }}>Type</Table.Th>
                      <Table.Th style={{ padding: '12px 16px', fontWeight: 600 }}>Language</Table.Th>
                      <Table.Th style={{ padding: '12px 16px', fontWeight: 600 }}>Points</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {mockUserBooks.map((book) => (
                      <Table.Tr key={book.id}>
                        <Table.Td style={{ padding: '12px 16px' }}>{book.id}</Table.Td>
                        <Table.Td style={{ padding: '12px 16px' }}>{book.name}</Table.Td>
                        <Table.Td style={{ padding: '12px 16px' }}>{book.type}</Table.Td>
                        <Table.Td style={{ padding: '12px 16px' }}>{book.language}</Table.Td>
                        <Table.Td style={{ padding: '12px 16px' }}>{book.points}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea.Autosize>

              <Flex direction="column" p="md" style={{ borderTop: '1px solid #e0e0e0' }}>
                <Group justify="space-between" p="md" className={classes.summaryBox}>
                  <Box>
                    <Text fw={500}>Rank</Text>
                    <Text size="xl" fw={700}>{selectedParticipant?.rank || 4}</Text>
                  </Box>
                  <Box>
                    <Text fw={500}>Total Books</Text>
                    <Text size="xl" fw={700}>7 books</Text>
                  </Box>
                  <Box>
                    <Text fw={500}>Total Points</Text>
                    <Text size="xl" fw={700}>{selectedParticipant?.points || 20} Points</Text>
                  </Box>
                </Group>
              </Flex>
            </Box>

            <Group justify="flex-end" mt="md">
              <Button 
                style={{ backgroundColor: theme.colors.darkBlueLighter, color: 'white' }}
                onClick={closeUserPointsModal}
                className={classes.modalButton}
              >
                CLOSE
              </Button>
            </Group>
          </Box>
        </Modal>
      </Container>
    </MantineProvider>
  );
};

export default CompetitionsPage;