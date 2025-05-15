import { Badge } from '@mantine/core';
import classes from './PrizeBadge.module.css';

interface PrizeBadgeProps {
  prize: string;
}

const PrizeBadge: React.FC<PrizeBadgeProps> = ({ prize }) => {
  return (
    <Badge
      size="lg"
      variant="gradient"
      gradient={{ from: 'yellow', to: 'orange', deg: 45 }}
      className={classes.badge}
    >
      Prize: {prize || 'N/A'}
    </Badge>
  );
};

export default PrizeBadge;