import { Button, Group, TextInput, Select, Box } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import classes from './BooksActions.module.css';
import { Book } from '../../../../../../../dummyData/adminPages/booksData';

interface BooksActionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAdd: () => void;
  onTypeFilterChange: (value: string | null) => void;
  onLanguageFilterChange: (value: string | null) => void;
  typeFilter: string | null;
  languageFilter: string | null;
  books: Book[];
}

const BooksActions: React.FC<BooksActionsProps> = ({
  searchQuery,
  onSearchChange,
  onAdd,
  onTypeFilterChange,
  onLanguageFilterChange,
  typeFilter,
  languageFilter,
  books,
}) => {
  const types = Array.from(new Set(books.map((book) => book.type)));
  const languages = Array.from(new Set(books.map((book) => book.language)));

  const unselectedBackgroundColor = '#4A5E6A'; // Muted blue-grey for unselected
  const selectedBackgroundColor = '#E0E0E0'; // Light grey for selected
  const defaultTextColor = '#E0E0E0'; // Light grey for unselected text
  const selectedTextColor = '#333333'; // Near black for selected text
  const hoverTextColor = '#333333'; // Dark grey for hover text

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Group gap="xs" className={classes.actionGroup} justify="flex-end" mb="md">
         
        <TextInput
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
          rightSection={<IconSearch size={16} />}
          className={classes.searchInput}
        />
      </Group>
      <Group gap="md" justify="flex-end">
        <Select
          placeholder="Filter by Type"
          data={types}
          value={typeFilter}
          onChange={onTypeFilterChange}
          clearable
          className={classes.filterInput}
          styles={{
            input: {
              backgroundColor: typeFilter ? selectedBackgroundColor : unselectedBackgroundColor,
              color: typeFilter ? selectedTextColor : defaultTextColor,
              border: '1px solid #4A5E6A',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: typeFilter ? selectedTextColor : hoverTextColor,
              },
            },
            dropdown: { backgroundColor: unselectedBackgroundColor, border: '1px solid #4A5E6A' },
            option: { color: defaultTextColor },
          }}
          rightSection={<span style={{ color: typeFilter ? selectedTextColor : defaultTextColor, pointerEvents: 'none' }} />}
        />
        <Select
          placeholder="Filter by Language"
          data={languages}
          value={languageFilter}
          onChange={onLanguageFilterChange}
          clearable
          className={classes.filterInput}
          styles={{
            input: {
              backgroundColor: languageFilter ? selectedBackgroundColor : unselectedBackgroundColor,
              color: languageFilter ? selectedTextColor : defaultTextColor,
              border: '1px solid #4A5E6A',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: languageFilter ? selectedTextColor : hoverTextColor,
              },
            },
            dropdown: { backgroundColor: unselectedBackgroundColor, border: '1px solid #4A5E6A' },
            option: { color: defaultTextColor },
          }}
          rightSection={<span style={{ color: languageFilter ? selectedTextColor : defaultTextColor, pointerEvents: 'none' }} />}
        />
      </Group>
    </Box>
  );
};

export default BooksActions;