export interface Competition {
  id: number;
  name: string;
  reward: string;
  dueDate: Date | null;
  participants: CompetitionParticipant[];
}

export interface CompetitionParticipant {
  rank: number;
  userId: number;
  points: number;
  name: string;
  booksRead: number;
}

export interface BookEntry {
  id: number;
  name: string;
  type: string;
  language: string;
  points: number;
}

export const initialCompetitions: Competition[] = [
  {
    id: 1,
    name: 'Ramadan Competition',
    reward: '$100 Amazon Gift Card',
    dueDate: new Date('2025-04-30'),
    participants: [
      { rank: 1, userId: 357, points: 50, name: 'Sanad Shannak', booksRead: 30 },
      { rank: 2, userId: 109, points: 48, name: 'Motasem Aldawieh', booksRead: 42 },
      { rank: 3, userId: 27, points: 44, name: 'Mohammad Yasin', booksRead: 28 },
      { rank: 4, userId: 202, points: 42, name: 'Ahmad Shaker', booksRead: 32 },
      { rank: 5, userId: 404, points: 38, name: 'Khaled Ayman', booksRead: 30 },
      { rank: 6, userId: 101, points: 37, name: 'Muhab Alafandi', booksRead: 27 },
      { rank: 7, userId: 311, points: 34, name: 'Rami Omar', booksRead: 29 },
      { rank: 8, userId: 223, points: 30, name: 'Tariq Khaled', booksRead: 25 },
      { rank: 9, userId: 505, points: 28, name: 'Motaz Mohammad', booksRead: 30 },
      { rank: 10, userId: 31, points: 26, name: 'Omar Aziz', booksRead: 25 },
      { rank: 11, userId: 233, points: 25, name: 'Ahmad Safi', booksRead: 23 },
      { rank: 12, userId: 523, points: 24, name: 'Amer Bader', booksRead: 21 },
    ],
  },
  {
    id: 2,
    name: 'April Competition',
    reward: '$50 Amazon Gift Card',
    dueDate: new Date('2025-04-30'),
    participants: [
      { rank: 1, userId: 505, points: 45, name: 'Motaz Mohammad', booksRead: 25 },
      { rank: 2, userId: 357, points: 42, name: 'Sanad Shannak', booksRead: 24 },
      { rank: 3, userId: 202, points: 40, name: 'Ahmad Shaker', booksRead: 22 },
    ],
  },
];

export const mockUserBooks: BookEntry[] = [
  { id: 17, name: 'The Lost Chronicles', type: 'Fiction', language: 'English', points: 5 },
  { id: 23, name: 'Quantum Computing Explained', type: 'Science', language: 'English', points: 3 },
  { id: 12, name: 'El Secreto del Bosque', type: 'Mystery', language: 'Spanish', points: 3 },
  { id: 15, name: "L'Ombre du Passé", type: 'Historical', language: 'French', points: 2 },
  { id: 43, name: 'Einführung in die KI', type: 'Technology', language: 'German', points: 1 },
  { id: 7, name: 'The Art of War', type: 'Philosophy', language: 'English', points: 4 },
  { id: 1, name: 'La Magia de los Números', type: 'Mathematics', language: 'Spanish', points: 2 },
];