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
    name: 'Motasem AlAtawneh',
    email: 'motasem.alatawneh@libroflow.com',
    role: 'Department Manager',
    branch: 'Jabal Amman',
    savedBy: 'Admin',
  },
  {
    id: 2,
    name: 'Sanad Shannak',
    email: 'sanad.shannak@libroflow.com',
    role: 'Supplier',
    branch: 'Shmeisani',
    savedBy: 'Admin',
  },
  {
    id: 3,
    name: 'Ahmad Aljazaere',
    email: 'ahmad.aljazaere@libroflow.com',
    role: 'Housekeeper',
    branch: 'Tabarbour',
    savedBy: 'Admin',
  },
  {
    id: 4,
    name: 'Kareem Abu-sharifeh',
    email: 'kareem.abusharifeh@libroflow.com',
    role: 'Cashier',
    branch: 'Jabal Amman',
    savedBy: 'Admin',
  },
  {
    id: 5,
    name: 'Malek Alkhader',
    email: 'malek.alkhader@libroflow.com',
    role: 'Department Manager',
    branch: 'Shmeisani',
    savedBy: 'Admin',
  },
  {
    id: 6,
    name: 'Jalal Almasri',
    email: 'jalal.almasri@libroflow.com',
    role: 'Supplier',
    branch: 'Tabarbour',
    savedBy: 'Admin',
  },
  {
    id: 7,
    name: 'Mohammed Alqasem',
    email: 'mohammed.alqasem@libroflow.com',
    role: 'Department Manager',
    branch: 'Jabal Amman',
    savedBy: 'Admin',
  },
  {
    id: 8,
    name: 'Sami Alhaj',
    email: 'sami.alhaj@libroflow.com',
    role: 'Supplier',
    branch: 'Shmeisani',
    savedBy: 'Admin',
  },
];