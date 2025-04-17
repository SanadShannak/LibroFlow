import { useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Box, Collapse, Group } from '@mantine/core';
import theme from '../../../utils/theme';
import classes from './NavbarLinksGroup.module.css';

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
            <Icon size={22} style={{ color: isActive ? theme.colors.darkBlue : theme.colors.white }} />
            <Box
              ml="md"
              style={{
                fontWeight: 500,
                color: isActive ? theme.colors.darkBlue : theme.colors.white,
                fontSize: isActive ? '17px' : '16px',
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
              size={18}
              style={{
                transform: opened ? 'rotate(-90deg)' : 'none',
                color: isActive ? theme.colors.darkBlue : theme.colors.white,
                marginLeft: 'auto',
              }}
            />
          )}
        </Group>
      </div>
      {hasLinks && (
        <Collapse in={opened} animateOpacity={false}>
          <div className={classes.nestedLinksWrapper}>{items}</div>
        </Collapse>
      )}
    </div>
  );
}