import { useState } from 'react';
import { MantineProvider, Container, Box, ScrollArea, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './BooksPage.module.css';
import { initialBooks, Book } from '../../../dummyData/adminPages/booksData';
import BooksActions from './components/BooksActions/BooksActions';
import BooksTable from './components/BooksTable/BooksTable';
import AddBooksModal from './components/AddBooksModal/AddBooksModal';
import UpdateBooksModal from './components/UpdateBooksModal/UpdateBooksModal';
import DeleteBooksModal from './components/DeleteBooksModal/DeleteBooksModal';
import ViewBooksModal from './components/ViewBooksModal/ViewBooksModal';

const SupplierBooksPage = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);

  // Modals
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [updateModalOpened, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [viewModalOpened, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);

  const filteredData = books.filter((book) => {
    const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter ? book.type === typeFilter : true;
    const matchesLanguage = languageFilter ? book.language === languageFilter : true;
    return matchesSearch && matchesType && matchesLanguage;
  });

  const handleAddBook = (newBook: Omit<Book, 'id' | 'availability' | 'savedBy'>) => {
    const newId = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;
    const availableQuantity = newBook.quantity - newBook.reservedQuantity;
    const availability = availableQuantity > 0 ? 'Available' : newBook.reservedQuantity > 0 ? 'Borrowed' : 'Not Available';
    setBooks([...books, { id: newId, ...newBook, availability, savedBy: 'Nisal Gunasekara (Admin)' }]);
    closeAddModal();
  };

  const handleUpdateBook = (updatedBook: Book) => {
    const availableQuantity = updatedBook.quantity - updatedBook.reservedQuantity;
    const availability = availableQuantity > 0 ? 'Available' : updatedBook.reservedQuantity > 0 ? 'Borrowed' : 'Not Available';
    setBooks(books.map((book) => (book.id === updatedBook.id ? { ...updatedBook, availability } : book)));
    setSelectedBook(null);
    closeUpdateModal();
  };

  const handleDeleteBook = () => {
    if (selectedBook) {
      setBooks(books.filter((book) => book.id !== selectedBook.id));
      setSelectedBook(null);
      closeDeleteModal();
    }
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
                typeFilter={typeFilter}
                languageFilter={languageFilter}
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

export default SupplierBooksPage;