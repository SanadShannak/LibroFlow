import { useState } from 'react';
import { MantineProvider, Container, Box, ScrollArea, Text, Title } from '@mantine/core';
import classes from './BooksPage.module.css';
import { initialBooks, Book } from '../../../dummyData/userPages/booksData';
import BooksActions from './components/BooksActions/BooksActions';
import BooksTable from './components/BooksTable/BooksTable';

const UserBooks = () => {
  const [books] = useState<Book[]>(initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(null);

  const filteredData = books.filter((book) => {
    const matchesSearch =
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.id.toString().includes(searchQuery);
    const matchesType = typeFilter ? book.type === typeFilter : true;
    const matchesLanguage = languageFilter ? book.language === languageFilter : true;
    const matchesAvailability = availabilityFilter ? book.availability === availabilityFilter : true;
    return matchesSearch && matchesType && matchesLanguage && matchesAvailability;
  });

  return (
    <MantineProvider>
      <Container fluid className={classes.container}>
        <Box className={classes.header}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box>
              <Title order={3} c="white" mb="xs">
                Library Books
              </Title>
              <Text size="sm" c="dimmed" style={{ textTransform: 'uppercase' }}>
                Total Unique Books: {filteredData.length}
              </Text>
            </Box>
            <Box>
              <BooksActions
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onTypeFilterChange={setTypeFilter}
                onLanguageFilterChange={setLanguageFilter}
                onAvailabilityFilterChange={setAvailabilityFilter}
                typeFilter={typeFilter}
                languageFilter={languageFilter}
                availabilityFilter={availabilityFilter}
                books={books}
              />
            </Box>
          </Box>
        </Box>

        <ScrollArea className={classes.tableScrollArea}>
          <Box className={classes.tableContainer}>
            <BooksTable books={filteredData} />
          </Box>
        </ScrollArea>
      </Container>
    </MantineProvider>
  );
};

export default UserBooks;