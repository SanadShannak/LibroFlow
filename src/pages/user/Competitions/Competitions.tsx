import { useState } from 'react';
import { MantineProvider, Container, Box, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './CompetitionsPage.module.css';
import { initialCompetitions, mockUserBooks } from '../../../dummyData/adminPages/competitionsData';
import CompetitionTabs from './components/CompetitionTabs/CompetitionTabs';
import CompetitionActions from './components/CompetitionActions/CompetitionActions';
import CompetitionTable from './components/CompetitionTable/CompetitionTable';
import AddCompetitionModal from './components/AddCompetitionModal/AddCompetitionModal';
import UpdateCompetitionModal from './components/UpdateCompetitionModal/UpdateCompetitionModal';
import DeleteCompetitionModal from './components/DeleteCompetitionModal/DeleteCompetitionModal';
import UserPointsModal from './components/UserPointsModal/UserPointsModal';
import PrizeBadge from './components/PrizeBadge/PrizeBadge';
import { Competition, CompetitionParticipant } from '../../../dummyData/adminPages/competitionsData';

const UserCompetitions = () => {
  const [competitions, setCompetitions] = useState<Competition[]>(initialCompetitions);
  const [activeCompetitionId, setActiveCompetitionId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<CompetitionParticipant | null>(null);
 


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








  const handleShowUserPoints = (participant: CompetitionParticipant) => {
    setSelectedParticipant(participant);
    openUserPointsModal();
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

export default UserCompetitions;