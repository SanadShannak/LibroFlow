import { useState } from 'react';
import { MantineProvider, Container, Box, ScrollArea, Text, Title, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './BooksPage.module.css';
import { Book } from '../../../dummyData/adminPages/booksData';
import BooksActions from './components/BooksActions/BooksActions';
import BooksTable from './components/BooksTable/BooksTable';
import AddBooksModal from './components/AddBooksModal/AddBooksModal';
import UpdateBooksModal from './components/UpdateBooksModal/UpdateBooksModal';
import DeleteBooksModal from './components/DeleteBooksModal/DeleteBooksModal';
import ViewBooksModal from './components/ViewBooksModal/ViewBooksModal';
import { IconArchive } from '@tabler/icons-react';

interface AdminBooksPageProps {
  books: Book[];
  onArchiveBook?: (book: Book) => void;
}

const AdminBooksPage: React.FC<AdminBooksPageProps> = ({ books, onArchiveBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(null);

  // Modals
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [updateModalOpened, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [viewModalOpened, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);

  const filteredData = books.filter((book) => {
    const matchesSearch =
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.id.toString().includes(searchQuery);
    const matchesType = typeFilter ? book.type === typeFilter : true;
    const matchesLanguage = languageFilter ? book.language === languageFilter : true;
    const matchesAvailability = availabilityFilter ? book.availability === availabilityFilter : true;
    return matchesSearch && matchesType && matchesLanguage && matchesAvailability;
  });

  // The following handlers only affect UI state, not the books list itself
  const handleAddBook = (newBook: Omit<Book, 'id' | 'availability' | 'savedBy'>) => {
    // This should be handled in the parent if you want to add books globally
    closeAddModal();
  };

  const handleUpdateBook = (updatedBook: Book) => {
    // This should be handled in the parent if you want to update books globally
    setSelectedBook(null);
    closeUpdateModal();
  };

  const handleDeleteBook = () => {
    // This should be handled in the parent if you want to delete books globally
    setSelectedBook(null);
    closeDeleteModal();
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    openUpdateModal();
  };

  const handleViewBook = (book: Book) => {
    setSelectedBook(book);
    openViewModal();
  };

  const handleDeleteClick = (book: Book) => {
    setSelectedBook(book);
    openDeleteModal();
  };

  const handleArchiveBook = (book: Book) => {
    if (onArchiveBook) {
      onArchiveBook(book);
    }
  };

  return (
    <MantineProvider>
      <Container fluid className={classes.container}>
        <Box className={classes.header}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box>
              <Title order={3} c="white" mb="xs">Book Management</Title>
              <Text size="sm" c="dimmed" style={{ textTransform: 'uppercase' }}>
                Total Unique Books: {filteredData.length}
              </Text>
            </Box>
            <Box>
              <BooksActions
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAdd={openAddModal}
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
            <BooksTable
              books={filteredData}
              onShowDetails={handleViewBook}
              onEdit={handleEditBook}
              onDelete={handleDeleteClick}
              onArchive={handleArchiveBook}
            />
          </Box>
        </ScrollArea>

        {addModalOpened && (
          <AddBooksModal
            opened={addModalOpened}
            onClose={closeAddModal}
            onAddBook={handleAddBook}
          />
        )}

        {updateModalOpened && selectedBook && (
          <UpdateBooksModal
            opened={updateModalOpened}
            onClose={closeUpdateModal}
            book={selectedBook}
            onUpdateBook={handleUpdateBook}
          />
        )}

        {deleteModalOpened && selectedBook && (
          <DeleteBooksModal
            opened={deleteModalOpened}
            onClose={closeDeleteModal}
            onConfirm={handleDeleteBook}
          />
        )}

        {viewModalOpened && selectedBook && (
          <ViewBooksModal
            opened={viewModalOpened}
            onClose={closeViewModal}
            book={selectedBook}
          />
        )}
      </Container>
    </MantineProvider>
  );
};

export default AdminBooksPage;