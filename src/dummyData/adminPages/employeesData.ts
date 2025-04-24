export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  branch: string;
  savedBy?: string;
}

export const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'Prabath Jayasuriya',
    email: 'prabathj@gmail.com',
    role: 'Department Manager',
    branch: 'Zabeel Amman',
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 2,
    name: 'Prabath Jayasuriya',
    email: 'prabathj@gmail.com',
    role: 'Supplier',
    branch: 'Zabeel Amman',
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 3,
    name: 'Prabath Jayasuriya',
    email: 'prabathj@gmail.com',
    role: 'Housekeeper',
    branch: 'Raslan',
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 4,
    name: 'Prabath Jayasuriya',
    email: 'prabathj@gmail.com',
    role: 'Cashier',
    branch: 'Deirah',
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 5,
    name: 'Prabath Jayasuriya',
    email: 'prabathj@gmail.com',
    role: 'Department Manager',
    branch: 'Jumeirah',
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 6,
    name: 'Prabath Jayasuriya',
    email: 'prabathj@gmail.com',
    role: 'Supplier',
    branch: 'Jumeirah',
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 7,
    name: 'Prabath Jayasuriya',
    email: 'prabathj@gmail.com',
    role: 'Department Manager',
    branch: 'Khalifa',
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 8,
    name: 'Prabath Jayasuriya',
    email: 'prabathj@gmail.com',
    role: 'Supplier',
    branch: 'Tabour',
    savedBy: 'Nisal Gunasekara (Admin)',
  },
];