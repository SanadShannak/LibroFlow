import { Table, ActionIcon } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './CompetitionTable.module.css';
import { CompetitionParticipant } from '../../pages/admin/Competitions/data';

interface CompetitionTableProps {
  participants: CompetitionParticipant[];
  onShowDetails: (participant: CompetitionParticipant) => void;
}

const CompetitionTable: React.FC<CompetitionTableProps> = ({
  participants,
  onShowDetails,
}) => {
  const getRankSuffix = (rank: number) => {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  };

  const rows = participants.map((item) => (
    <Table.Tr
      key={item.userId}
      className={`${classes.tableRow} ${item.rank === 1 ? classes.firstPlace : ''}`}
      onMouseEnter={(e) => {
        if (item.rank !== 1) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      }}
      onMouseLeave={(e) => {
        if (item.rank !== 1) e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <Table.Td className={classes.tableCell}>{item.rank}{getRankSuffix(item.rank)}</Table.Td>
      <Table.Td className={classes.tableCell}>{item.userId}</Table.Td>
      <Table.Td className={classes.tableCell}>{item.points}</Table.Td>
      <Table.Td className={classes.tableCell}>{item.name}</Table.Td>
      <Table.Td className={classes.tableCell}>{item.booksRead}</Table.Td>
      <Table.Td className={classes.tableCell}>
        <ActionIcon
          variant="transparent"
          color="white"
          onClick={() => onShowDetails(item)}
          aria-label="View details"
        >
          <IconSearch size={16} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table className={classes.table}>
      <Table.Thead className={classes.tableHead} >
        <Table.Tr>
          <Table.Th className={classes.tableHeader}>Rank</Table.Th>
          <Table.Th className={classes.tableHeader}>User ID</Table.Th>
          <Table.Th className={classes.tableHeader}>Points</Table.Th>
          <Table.Th className={classes.tableHeader}>Name</Table.Th>
          <Table.Th className={classes.tableHeader}>Books Read</Table.Th>
          <Table.Th className={classes.tableHeader}>Details</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default CompetitionTable;