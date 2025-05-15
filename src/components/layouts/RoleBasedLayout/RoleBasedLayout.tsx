import React, { useEffect, useState } from 'react';
import {
  AppShell,
  Avatar,
  Box,
  Group,
  ScrollArea,
  Stack,
  Text,
  rem,
} from '@mantine/core';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import logo from '../../../assets/libroflow_white_with_text.png';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import theme from '../../../utils/theme';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import classes from './RoleBasedLayout.module.css';
import SettingsModal from '../../../layouts/adminLayout/settingPage';

interface RoleBasedLayoutProps {
  user: {
    name: string;
    role: string;
  };
  sidebarLinks: Array<{
    label: string;
    icon: React.FC<any>;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
  }>;
  contentMap: Record<string, React.ReactNode>;
  showBranchContent?: boolean;
}

const RoleBasedLayout: React.FC<RoleBasedLayoutProps> = ({
  user,
  sidebarLinks,
  contentMap,
}) => {
  const [opened] = useDisclosure();
  const [time, setTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeBranch, setActiveBranch] = useState('');
  const navigate = useNavigate();
  
  // Add state for settings modal
  const [settingsModalOpened, setSettingsModalOpened] = useState(false);

  useEffect(() => {
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = theme.colors.darkBlue;
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
      clearInterval(interval);
    };
  }, []);
  
  const normalizeKey = (str: string) =>
    str.trim().toLowerCase().replace(/\s+/g, '');

  const renderContent = () => {
    const sectionKey = normalizeKey(activeSection);
    const branchKey = normalizeKey(activeBranch);

    if (branchKey && contentMap[`${sectionKey}.${branchKey}`]) {
      return contentMap[`${sectionKey}.${branchKey}`];
    }

    if (contentMap[sectionKey]) {
      return contentMap[sectionKey];
    }

    return null;
  };

  return (
    <AppShell
      padding={0}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      header={{ height: 71 }}
      styles={{
        root: { backgroundColor: theme.colors.darkBlue },
        navbar: {
          backgroundColor: theme.colors.darkBlueLighter,
          borderRight: '0px solid #FFFFFF26',
          zIndex: 2,
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
              <img src={logo} alt="Logo" style={{ width: '100%', height: 'auto', marginBottom: '0px' }} />
            </Group>
          </div>

          <ScrollArea scrollbarSize={0} scrollHideDelay={0} type="never">
            <div className={classes.linksInner}>
              {sidebarLinks.map((item) => (
                <LinksGroup
                  {...item}
                  key={item.label}
                  activeSection={activeSection}
                  activeBranch={activeBranch}
                  onClick={(section, branch) => {

                    setActiveSection(section);
                    setActiveBranch(branch || '');
                  }}
                />
              ))}
            </div>
          </ScrollArea>

          <div className={classes.footer}>
            <div className={classes.logoutButton} onClick={() => navigate('/login')}>
              <Group>
                <IconLogout size={20} style={{ color: theme.colors.white }} />
                <Text c={theme.colors.white} fw={500} style={{ fontSize: '16px' }}>
                  Log Out
                </Text>
              </Group>
            </div>
          </div>
        </nav>
      </AppShell.Navbar>

      <AppShell.Header>
        <Group justify="space-between" style={{ height: '100%', width: '100%' }}>
          <Group style={{ gap: rem(10) }}>
            <Avatar radius="xl" color="gray" size="md" />
            <Stack style={{ gap: 0 }}>
              <Text size="md" fw={500} c={theme.colors.white}>
                {user.name}
              </Text>
              <Text size="sm" c="gray.4">
                {user.role}
              </Text>
            </Stack>
          </Group>

          <Group style={{ gap: rem(15) }}>
            <Stack style={{ gap: 0 }} align="end">
              <Text size="md" fw={500} c={theme.colors.white}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Text size="sm" c="gray.4">
                {time.toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                })}
              </Text>
            </Stack>
            <Box
              style={{
                width: '1px',
                height: '30px',
                backgroundColor: 'rgba(255,255,255,0.3)'
              }}
            />
            <IconSettings
              size={24}
              stroke={1.5}
              color={theme.colors.white}
              style={{ cursor: 'pointer' }}
              onClick={() => setSettingsModalOpened(true)}
            />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Box p="md" style={{ paddingTop: '1.5rem' }}>{renderContent()}</Box>
      </AppShell.Main>
      
      {/* Settings Modal */}
      <SettingsModal 
        opened={settingsModalOpened} 
        onClose={() => setSettingsModalOpened(false)} 
      />
    </AppShell>
  );
};

export default RoleBasedLayout;