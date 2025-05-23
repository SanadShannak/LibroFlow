/**
 * ArchivePage with search and filters, styled like Book Management table
 */
import React, { useContext, useState, useMemo } from 'react';
import { Box, Title, Text, ScrollArea, Container } from '@mantine/core';
import { Book, initialArchivedBooks } from '../../../dummyData/adminPages/booksData';
import ArchiveActions from './ArchiveActions';
import ArchiveTable from './ArchiveTable';
import classes from '../Books/BooksPage.module.css';

export const ArchiveContext = React.createContext<{ archivedBooks: Book[] }>({ archivedBooks: initialArchivedBooks });

const ArchivePage: React.FC = () => {
  const { archivedBooks } = useContext(ArchiveContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(null);

  // Filtering logic
  const filteredBooks = useMemo(() =>
    archivedBooks.filter((book) => {
      const matchesSearch =
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.id.toString().includes(searchQuery);
      const matchesType = typeFilter ? book.type === typeFilter : true;
      const matchesLanguage = languageFilter ? book.language === languageFilter : true;
      const matchesAvailability = availabilityFilter ? book.availability === availabilityFilter : true;
      return matchesSearch && matchesType && matchesLanguage && matchesAvailability;
    }),
    [archivedBooks, searchQuery, typeFilter, languageFilter, availabilityFilter]
  );

  return (
    <Container fluid className={classes.container}>
      <Box className={classes.header}>
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Box>
            <Title order={3} c="white" mb="xs">Archive</Title>
            <Text size="sm" c="dimmed" style={{ textTransform: 'uppercase' }}>
              Total Archived Books: {filteredBooks.length}
            </Text>
          </Box>
          <Box>
            <ArchiveActions
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onTypeFilterChange={setTypeFilter}
              onLanguageFilterChange={setLanguageFilter}
              onAvailabilityFilterChange={setAvailabilityFilter}
              typeFilter={typeFilter}
              languageFilter={languageFilter}
              availabilityFilter={availabilityFilter}
              books={archivedBooks}
            />
          </Box>
        </Box>
      </Box>
      <ScrollArea className={classes.tableScrollArea}>
        <Box className={classes.tableContainer}>
          <ArchiveTable books={filteredBooks} />
        </Box>
      </ScrollArea>
    </Container>
  );
};

export default ArchivePage; 