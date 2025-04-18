import { useState } from 'react';
import { MantineProvider, Container, Box, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './CompetitionsPage.module.css';
import { initialCompetitions, mockUserBooks } from './data';
import CompetitionTabs from '../../../components/CompetitionTabs/CompetitionTabs';
import CompetitionActions from '../../../components/CompetitionActions/CompetitionActions';
import CompetitionTable from '../../../components/CompetitionTable/CompetitionTable';
import AddCompetitionModal from '../../../components/AddCompetitionModal/AddCompetitionModal';
import UpdateCompetitionModal from '../../../components/UpdateCompetitionModal/UpdateCompetitionModal';
import DeleteCompetitionModal from '../../../components/DeleteCompetitionModal/DeleteCompetitionModal';
import UserPointsModal from '../../../components/UserPointsModal/UserPointsModal';
import PrizeBadge from '../../../components/PrizeBadge/PrizeBadge';
import { Competition, CompetitionParticipant } from './data';

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

  const activeCompetition = competitions.find((comp) => comp.id === activeCompetitionId);
  const competitionData = activeCompetition?.participants || [];

  const filteredData = competitionData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userId.toString().includes(searchQuery)
  );

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
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
    const newId = competitions.length > 0 ? Math.max(...competitions.map((c) => c.id)) + 1 : 1;
    setCompetitions([
      ...competitions,
      {
        id: newId,
        name: newCompetition.name,
        reward: newCompetition.reward,
        dueDate: newCompetition.dueDate,
        participants: [],
      },
    ]);
    setActiveCompetitionId(newId);
    setNewCompetition({ name: '', reward: '', dueDate: null });
    setAddDateInput('');
    setAddDateError(null);
    closeAddModal();
  };

  const handleUpdateCompetition = () => {
    if (!updateCompetition || !updateCompetition.name || !updateCompetition.reward || !updateCompetition.dueDate)
      return;
    setCompetitions(
      competitions.map((comp) => (comp.id === updateCompetition.id ? { ...updateCompetition } : comp))
    );
    setUpdateCompetition(null);
    setUpdateDateInput('');
    setUpdateDateError(null);
    closeUpdateModal();
  };

  const handleDeleteCompetition = () => {
    setCompetitions(competitions.filter((comp) => comp.id !== activeCompetitionId));
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

  return (
    <MantineProvider>
      <Container fluid className={classes.container}>
        <Box className={classes.header}>
          <CompetitionTabs
            competitions={competitions}
            activeCompetitionId={activeCompetitionId}
            onSelectCompetition={setActiveCompetitionId}
          />
          <CompetitionActions
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onEdit={openUpdate}
            onDelete={openDeleteModal}
            onAdd={openAddModal}
          />
        </Box>

        <Box mb="md">
          <PrizeBadge prize={activeCompetition?.reward || 'N/A'} />
        </Box>

        <ScrollArea className={classes.tableScrollArea}>
          <Box className={classes.tableContainer}>
            <CompetitionTable participants={filteredData} onShowDetails={handleShowUserPoints} />
          </Box>
        </ScrollArea>

        {/* Conditionally render modals only when they are opened */}
        {addModalOpened && (
          <AddCompetitionModal
            opened={addModalOpened}
            onClose={closeAddModal}
            newCompetition={newCompetition}
            addDateInput={addDateInput}
            addDateError={addDateError}
            onAddCompetition={handleAddCompetition}
            onNameChange={(name) => setNewCompetition({ ...newCompetition, name })}
            onRewardChange={(reward) => setNewCompetition({ ...newCompetition, reward })}
            onDateChange={handleAddDateChange}
            formatDateForDisplay={formatDateForDisplay}
          />
        )}

        {updateModalOpened && (
          <UpdateCompetitionModal
            opened={updateModalOpened}
            onClose={closeUpdateModal}
            competition={updateCompetition}
            updateDateInput={updateDateInput}
            updateDateError={updateDateError}
            onUpdateCompetition={handleUpdateCompetition}
            onNameChange={(name) => setUpdateCompetition(updateCompetition ? { ...updateCompetition, name } : null)}
            onRewardChange={(reward) =>
              setUpdateCompetition(updateCompetition ? { ...updateCompetition, reward } : null)
            }
            onDateChange={handleUpdateDateChange}
            formatDateForDisplay={formatDateForDisplay}
          />
        )}

        {deleteModalOpened && (
          <DeleteCompetitionModal
            opened={deleteModalOpened}
            onClose={closeDeleteModal}
            onConfirm={handleDeleteCompetition}
          />
        )}

        {userPointsModalOpened && (
          <UserPointsModal
            opened={userPointsModalOpened}
            onClose={closeUserPointsModal}
            participant={selectedParticipant}
            books={mockUserBooks}
          />
        )}
      </Container>
    </MantineProvider>
  );
};

export default CompetitionsPage;