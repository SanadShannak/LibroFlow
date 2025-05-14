import { Button, Group, TextInput, Select, Box } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import classes from './BooksActions.module.css';
import { Book } from '../../../../dummyData/adminPages/booksData';

interface BooksActionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAdd: () => void;
  onTypeFilterChange: (value: string | null) => void;
  onLanguageFilterChange: (value: string | null) => void;
  onAvailabilityFilterChange: (value: string | null) => void;
  typeFilter: string | null;
  languageFilter: string | null;
  availabilityFilter: string | null;
  books: Book[];
}

const BooksActions: React.FC<BooksActionsProps> = ({
  searchQuery,
  onSearchChange,
  onAdd,
  onTypeFilterChange,
  onLanguageFilterChange,
  onAvailabilityFilterChange,
  typeFilter,
  languageFilter,
  availabilityFilter,
  books,
}) => {
  const types = Array.from(new Set(books.map((book) => book.type)));
  const languages = Array.from(new Set(books.map((book) => book.language)));
  const availabilities = ['Available', 'Borrowed', 'Not Available'];

  const unselectedBackgroundColor = '#4A5E6A'; // Muted blue-grey for unselected
  const selectedBackgroundColor = '#E0E0E0'; // Light grey for selected (previously used for text)
  const defaultTextColor = '#E0E0E0'; // Light grey for unselected text
  const selectedTextColor = '#333333'; // Near black for selected text
  const hoverTextColor = '#333333'; // Dark grey for hover text

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Group gap="xs" className={classes.actionGroup} justify="flex-end" mb="md">
        <Button
          onClick={onAdd}
          leftSection={<IconPlus size={18} color="white" />}
          style={{ backgroundColor: '#1971C2', color: 'white' }}
          className={classes.addButton}
        >
          Add Book
        </Button>
        <TextInput
          placeholder="Search by Name or ID"
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
              transition: 'color 0.2s ease', // Smooth transition for hover
              '&:hover': {
                color: typeFilter ? selectedTextColor : hoverTextColor, // Dark grey on hover when unselected
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
        <Select
          placeholder="Filter by Availability"
          data={availabilities}
          value={availabilityFilter}
          onChange={onAvailabilityFilterChange}
          clearable
          className={classes.filterInput}
          styles={{
            input: {
              backgroundColor: availabilityFilter ? selectedBackgroundColor : unselectedBackgroundColor,
              color: availabilityFilter ? selectedTextColor : defaultTextColor,
              border: '1px solid #4A5E6A',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: availabilityFilter ? selectedTextColor : hoverTextColor,
              },
            },
            dropdown: { backgroundColor: unselectedBackgroundColor, border: '1px solid #4A5E6A' },
            option: { color: defaultTextColor },
          }}
          rightSection={<span style={{ color: availabilityFilter ? selectedTextColor : defaultTextColor, pointerEvents: 'none' }} />}
        />
      </Group>
    </Box>
  );
};

export default BooksActions;