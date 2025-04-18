import { Button, Group } from '@mantine/core';
import classes from './CompetitionTabs.module.css';
import { Competition } from '../../pages/admin/Competitions/data';

interface CompetitionTabsProps {
  competitions: Competition[];
  activeCompetitionId: number;
  onSelectCompetition: (id: number) => void;
}

const CompetitionTabs: React.FC<CompetitionTabsProps> = ({
  competitions,
  activeCompetitionId,
  onSelectCompetition,
}) => {
  return (
    <Group gap="xs" className={classes.tabGroup}>
      {competitions.map((comp) => (
        <Button
          key={comp.id}
          className={`${classes.tabButton} ${activeCompetitionId === comp.id ? classes.active : ''}`}
          onClick={() => onSelectCompetition(comp.id)}
        >
          {comp.name}
        </Button>
      ))}
    </Group>
  );
};

export default CompetitionTabs;