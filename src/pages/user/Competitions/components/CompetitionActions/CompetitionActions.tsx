import { Button, Group, TextInput } from '@mantine/core';
import { IconPencil, IconTrash, IconPlus, IconSearch } from '@tabler/icons-react';
import classes from './CompetitionActions.module.css';

interface CompetitionActionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;

}

const CompetitionActions: React.FC<CompetitionActionsProps> = ({
  searchQuery,
  onSearchChange,

}) => {
  return (
    <Group gap="xs" className={classes.actionGroup}>
      
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.currentTarget.value)}
        rightSection={<IconSearch size={16} />}
        className={classes.searchInput}
      />
    </Group>
  );
};

export default CompetitionActions;