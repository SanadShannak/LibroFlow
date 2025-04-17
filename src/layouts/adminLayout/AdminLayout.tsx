import React, { useEffect, useState } from 'react';
import logo from '../../assets/libroflow_white_with_text.png';
import {
  AppShell,
  Avatar,
  Text,
  Group,
  Stack,
  Box,
  rem,
  ScrollArea,
  Button,
  UnstyledButton,
  ThemeIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import theme from '../../utils/theme';
import {
  IconSettings,
  IconBuildingStore,
  IconBook,
  IconUsers,
  IconTrophy,
  IconDashboard,
  IconLogout,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';

import classes from './NavbarNested.module.css';
import AdminDashboardPage from '../../pages/admin/Dashboard';
import AdminBranchesPage from '../../pages/admin/branches/ShmeisaniBranch';
import AdminCompetitionsPage from '../../pages/admin/Competitions';
import AdminEmployeesPage from '../../pages/admin/Employees';
import AdminBooksPage from '../../pages/admin/Books';


const AdminDashboard: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const [time, setTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeBranch, setActiveBranch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Store the original background color
    const originalBackgroundColor = document.body.style.backgroundColor;
    // Set admin background color
    document.body.style.backgroundColor = theme.colors.darkBlue;
    const interval = setInterval(() => setTime(new Date()), 1000);
    
    // Cleanup function
    return () => {
      // Restore original background color
      document.body.style.backgroundColor = originalBackgroundColor;
      clearInterval(interval);
    };
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboardPage />;
      case 'branches':
        if (activeBranch) {
          return <Text c="white">{activeBranch} Branch Content</Text>;
        }
        return <AdminBranchesPage />;
      case 'books':
        return <AdminBooksPage />;
      case 'employees':
        return <AdminEmployeesPage />;
      case 'competitions':
        return <AdminCompetitionsPage />;
      default:
        return <Text c="white">Select a section</Text>;
    }
  };

  const mockdata = [
    { label: 'Dashboard', icon: IconDashboard },
    {
      label: 'Branches',
      icon: IconBuildingStore,
      initiallyOpened: false,
      links: [
        { label: 'Shmeisani', link: '/' },
        { label: 'Jabal Amman', link: '/' },
        { label: 'AlZarqaa', link: '/' },
      ],
    },
    { label: 'Books', icon: IconBook },
    { label: 'Employees', icon: IconUsers },
    { label: 'Competitions', icon: IconTrophy },
  ];

  const links = mockdata.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      activeSection={activeSection}
      activeBranch={activeBranch}
     onClick={(section, branch) => {
  setActiveSection(section);
  setActiveBranch(branch || ''); // Clears branch if no sub-link was clicked
}}

    />
  ));

  return (
    <AppShell
      padding={0}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      header={{ height: 71 }}
      styles={{
        root: { backgroundColor: theme.colors.darkBlue },
        navbar: {
  backgroundColor: theme.colors.darkBlueLighter,
  borderRight: '1px solid #FFFFFF26', 

  zIndex: 2, // ensure it's above main content
},

        header: {
          marginLeft: '250px',
          backgroundColor: theme.colors.darkBlueLighter,
          borderBottom: 'none',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        },
        main: {
          backgroundColor: theme.colors.darkBlue,
          minHeight: '100vh',
          overflow: 'hidden',
        },
      }}
    >
      <AppShell.Navbar mt="-71px" h="100vh">
        <nav className={classes.navbar}>
          <div className={classes.header}>
            <Group justify="center">
              <img
                src={logo}
                alt="Admin Logo"
                style={{ width: '100%', height: 'auto', marginBottom: '0px' }}
              />
            </Group>
          </div>

          <ScrollArea scrollbarSize={0} scrollHideDelay={0} type="never">
            <div className={classes.linksInner}>{links}</div>
          </ScrollArea>

          <div className={classes.footer}>
            <div
              className={classes.logoutButton}
              onClick={() => {
                  navigate('/login');
              }}
            >
              <Group>
                <IconLogout size={20} style={{ color: theme.colors.white }} />
                <Text c={theme.colors.white} fw={500} style={{ fontSize: '16px' }}>Log Out</Text>
              </Group>
            </div>
          </div>
        </nav>
      </AppShell.Navbar>

      <AppShell.Header>
        <Group justify="space-between" style={{ height: '100%', width: '100%' }}>
          <Group style={{ gap: rem(8) }}>
            <Avatar radius="xl" color="gray" />
            <Stack style={{ gap: 0 }}>
              <Text size="sm" fw={500} c={theme.colors.white}>
                Motasem AlAtawneh
              </Text>
              <Text size="xs" c="gray.4">
                Admin
              </Text>
            </Stack>
          </Group>

          <Group style={{ gap: rem(8) }}>
            <Stack style={{ gap: 0 }} align="end">
              <Text size="sm" c={theme.colors.white}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Text size="xs" c="gray.4">
                {time.toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                })}
              </Text>
            </Stack>
            <IconSettings size={20} color={theme.colors.white} style={{ cursor: 'pointer' }} />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Box p="md">{renderContent()}</Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminDashboard;
