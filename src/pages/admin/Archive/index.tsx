/**
 * ArchivePage with search and filters, styled like Book Management table
 */
import React, { useState, useMemo } from 'react';
import { Box, Title, Text, ScrollArea, Container } from '@mantine/core';
import { Book } from '../../../dummyData/adminPages/booksData';
import ArchiveActions from './ArchiveActions';
import ArchiveTable from './ArchiveTable';
import classes from '../Books/BooksPage.module.css';

interface ArchivePageProps {
  archivedBooks: Book[];
  onRestoreBook: (book: Book) => void;
}

const ArchivePage: React.FC<ArchivePageProps> = ({ archivedBooks, onRestoreBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);

  const filteredBooks = useMemo(() =>
    archivedBooks.filter((book) => {
      const matchesSearch =
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.id.toString().includes(searchQuery);
      const matchesType = typeFilter ? book.type === typeFilter : true;
      const matchesLanguage = languageFilter ? book.language === languageFilter : true;
      return matchesSearch && matchesType && matchesLanguage;
    }),
    [archivedBooks, searchQuery, typeFilter, languageFilter]
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
              typeFilter={typeFilter}
              languageFilter={languageFilter}
              books={archivedBooks}
            />
          </Box>
        </Box>
      </Box>
      <ScrollArea className={classes.tableScrollArea}>
        <Box className={classes.tableContainer}>
          <ArchiveTable books={filteredBooks} onRemove={onRestoreBook} />
        </Box>
      </ScrollArea>
    </Container>
  );
};

export default ArchivePage;