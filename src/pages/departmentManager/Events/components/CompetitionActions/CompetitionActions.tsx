import { Button, Group, TextInput } from '@mantine/core';
import { IconPencil, IconTrash, IconPlus, IconSearch } from '@tabler/icons-react';
import classes from './CompetitionActions.module.css';

interface CompetitionActionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onEdit: () => void;
  onDelete: () => void;
  onAdd: () => void;
}

const CompetitionActions: React.FC<CompetitionActionsProps> = ({
  searchQuery,
  onSearchChange,
  onEdit,
  onDelete,
  onAdd,
}) => {
  return (
    <Group gap="xs" className={classes.actionGroup}>
      <Button
        onClick={onEdit}
        leftSection={<IconPencil size={18} />}
        className={classes.actionButton}
      >
        Edit
      </Button>
      <Button
        onClick={onDelete}
        leftSection={<IconTrash size={18} />}
        className={classes.actionButton}
      >
        Delete
      </Button>
      <Button
        onClick={onAdd}
        leftSection={<IconPlus size={18} color="white" />}
        className={classes.addButton}
      >
        Add Competition
      </Button>
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