import { useState } from 'react';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import theme from '../../utils/theme';
import classes from './NavbarLinksGroup.module.css';
import { useLocation } from 'react-router-dom';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  activeSection?: string;
  activeBranch?: string;
  onClick?: (label: string, branch?: string) => void;
}


export function LinksGroup({ 
  icon: Icon, 
  label, 
  initiallyOpened, 
  links, 
  onClick,
  activeSection,
  activeBranch
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const isActive = activeSection === label.toLowerCase();

  const handleClick = () => {
    if (!hasLinks && onClick) {
      onClick(label.toLowerCase());
    }
    setOpened((o) => !o);
  };

  const items = (hasLinks ? links : []).map((link) => {
    const isActiveBranch = activeBranch?.toLowerCase() === link.label.toLowerCase();
    
    return (
      <div
        className={`${classes.link} ${isActiveBranch ? classes.activeBranch : ''}`}
        key={link.label}
        onClick={(event) => {
          event.preventDefault();
          if (onClick) onClick(label.toLowerCase(), link.label.toLowerCase());
        }}
      >
        {link.label}
      </div>
    );
  });

  return (
  <div className={classes.controlGroup}>
    <div 
      onClick={handleClick} 
      className={`${classes.control} ${isActive ? classes.active : ''}`}
    >
      <Group justify="space-between" gap={0} style={{ width: '100%' }}>
  <Box style={{ display: 'flex', alignItems: 'center' }}>
    <Icon size={20} style={{ color: isActive ? theme.colors.darkBlue : theme.colors.white }} />
    <Box
      ml="md"
      style={{
        fontWeight: 500,
        color: isActive ? theme.colors.darkBlue : theme.colors.white,
        fontSize: isActive ? '17px' : '16px', // 👈 Slightly bigger on click
        transition: 'font-size 150ms ease',
      }}
    >
      {label}
    </Box>
  </Box>
  {hasLinks && (
    <IconChevronRight
      className={classes.chevron}
      stroke={1.5}
      size={16}
      style={{
        transform: opened ? 'rotate(-90deg)' : 'none',
        color: isActive ? theme.colors.darkBlue : theme.colors.white,
        marginLeft: 'auto', // 👈 Push to far right
      }}
    />
  )}
</Group>

    </div>
    
    {hasLinks ? (
      <Collapse in={opened} animateOpacity={false}>
        <div className={classes.nestedLinksWrapper}>{items}</div>
      </Collapse>
    ) : null}
  </div>
);

}

const mockdata = {
  label: 'Releases',
  icon: IconCalendarStats,
  links: [
    { label: 'Upcoming releases', link: '/' },
    { label: 'Previous releases', link: '/' },
    { label: 'Releases schedule', link: '/' },
  ],
};

export function NavbarLinksGroup() {
  return (
    <Box mih={220} p="md">
      <LinksGroup {...mockdata} />
    </Box>
  );
}