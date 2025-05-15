export const userDashboardData = {
  kpis: [
    { value: '42' },
    { value: 'Fiction' },
    { value: 'Active' },
    { value: '7th October 2023' },
  ],
  genreTrends: [
    { genre: 'Fiction', totalBooks: 15 },
    { genre: 'Non-Fiction', totalBooks: 10 },
    { genre: 'Science Fiction', totalBooks: 8 },
    { genre: 'Mystery', totalBooks: 5 },
    { genre: 'Romance', totalBooks: 4 },
  ],
  upcomingEvents: [
    // Al-Zarqaa
    {
      title: 'Poetry Reading Night',
      date: '2025-05-07',
      branch: 'Al-Zarqaa',
      location: 'Reading Room',
      hasSpace: true,
    },
    {
      title: 'Children’s Story Hour',
      date: '2025-05-19',
      branch: 'Al-Zarqaa',
      location: 'Kids’ Corner',
      hasSpace: true,
    },
    {
      title: 'Local Author Spotlight',
      date: '2025-06-02',
      branch: 'Al-Zarqaa',
      location: 'Main Hall',
      hasSpace: false,
    },
    // Shmeisani
    {
      title: 'Book Club Discussion',
      date: '2025-05-12',
      branch: 'Shmeisani',
      location: 'Conference Room',
      hasSpace: true,
    },
    {
      title: 'Literary Trivia Night',
      date: '2025-05-25',
      branch: 'Shmeisani',
      location: 'Event Space',
      hasSpace: false,
    },
    {
      title: 'Writing Workshop',
      date: '2025-06-10',
      branch: 'Shmeisani',
      location: 'Seminar Room',
      hasSpace: true,
    },
    // Jabal Amman
    {
      title: 'Historical Fiction Lecture',
      date: '2025-05-15',
      branch: 'Jabal Amman',
      location: 'Auditorium',
      hasSpace: true,
    },
    {
      title: 'Book Swap Meet',
      date: '2025-05-28',
      branch: 'Jabal Amman',
      location: 'Community Area',
      hasSpace: true,
    },
    {
      title: 'Sci-Fi Film Screening',
      date: '2025-06-05',
      branch: 'Jabal Amman',
      location: 'Media Room',
      hasSpace: false,
    },
  ],
  borrowedBooks: [
    {
      title: 'The Great Gatsby',
      dueDate: '2025-05-12',
      status: 'Due Soon',
    },
    {
      title: '1984',
      dueDate: '2025-05-08',
      status: 'Overdue',
    },
    {
      title: 'Pride and Prejudice',
      dueDate: '2025-05-18',
      status: 'On Time',
    },
  ],
  topUsers: [
    { name: 'John Doe', credits: 150 },
    { name: 'Jane Smith', credits: 130 },
    { name: 'Alice Johnson', credits: 120 },
    { name: 'Bob Wilson', credits: 110 },
    { name: 'Emma Davis', credits: 100 },
    { name: 'Michael Brown', credits: 95 },
    { name: 'Sarah Taylor', credits: 90 },
    { name: 'David Lee', credits: 85 },
    { name: 'Laura Martinez', credits: 80 },
    { name: 'James Clark', credits: 75 },
  ],
  userRank: 23,
  currentUser: { name: 'Sanad Shannak', credits: 50 }, // For userRank > 10
};