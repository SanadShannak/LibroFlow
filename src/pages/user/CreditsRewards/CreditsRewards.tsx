import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Title, 
  Text, 
  Paper, 
  SimpleGrid, 
  Card, 
  Image, 
  Badge, 
  Progress, 
  Button, 
  Group, 
  Stack, 
  ScrollArea 
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './CreditsRewards.module.css';
import { initialCredits, initialRewards, CreditEntry, Reward } from '../../../dummyData/userPages/creditsRewardsData';
import { useBorrowedBooks } from '../../../context/BorrowedBooksContext';
import theme from '../../../utils/theme';

const UserCreditsRewards: React.FC = () => {
  const { borrowedBooks } = useBorrowedBooks();
  const [credits, setCredits] = useState<CreditEntry[]>(initialCredits);
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);

  // Calculate total points from borrowed books and initial credits
  const calculateTotalPoints = () => {
    const borrowedPoints = borrowedBooks.reduce((total, book) => total + (book.points || 0), 0);
    const creditPoints = credits.reduce((total, entry) => total + entry.points, 0);
    return borrowedPoints + creditPoints;
  };

  const [totalPoints, setTotalPoints] = useState(calculateTotalPoints());

  // Handle reward redemption with points deduction
  const handleRedeemReward = (reward: Reward) => {
    if (totalPoints < reward.pointsCost) {
      notifications.show({
        title: 'Insufficient Points',
        message: `You need ${reward.pointsCost - totalPoints} more points to redeem this reward.`,
        color: 'red',
      });
      return;
    }

    if (!reward.redeemed) {
      setRewards(rewards.map(r => r.id === reward.id ? { ...r, redeemed: true } : r));
      setTotalPoints(totalPoints - reward.pointsCost); // Deduct points
      notifications.show({
        title: 'Reward Redeemed',
        message: `You have successfully redeemed ${reward.name}! ${reward.pointsCost} points deducted.`,
        color: 'green',
      });
    }
  };

  useEffect(() => {
    setTotalPoints(calculateTotalPoints());
  }, [borrowedBooks, credits]);

  return (
    <Container fluid className={classes.container}>
      <Stack gap="lg">
        {/* Total Points Display */}
        <Paper p="md" shadow="sm" radius="lg" style={{ backgroundColor: theme.colors.darkBlue }}>
          <Title order={2} ta="center" c="white">
            Your Points: {totalPoints}
          </Title>
        </Paper>

        {/* Credits History (Top Row) */}
        <Paper p="md" shadow="sm" radius="lg" style={{ backgroundColor: theme.colors.darkBlueLighter }}>
          <Title order={3} c="white" mb="md">
            Credits History
          </Title>
          <ScrollArea h={200} scrollbarSize={8} offsetScrollbars>
            <Stack gap="sm">
              {credits.map((entry) => (
                <Card key={entry.id} shadow="xs" padding="sm" radius="md" withBorder style={{ backgroundColor: theme.colors.darkBlue , border:'none'}}>
                  <Group justify="space-between">
                    <Text size="sm" c="white">{entry.date}</Text>
                    <Text size="sm" c="white">{entry.description}</Text>
                    <Text size="sm" c={entry.points >= 0 ? 'green' : 'red'}>
                      {entry.points > 0 ? `+${entry.points}` : entry.points}
                    </Text>
                  </Group>
                </Card>
              ))}
            </Stack>
          </ScrollArea>
        </Paper>

        {/* Rewards Section (Below, 3 Large Cards Per Row) */}
        <Paper p="md" shadow="sm" radius="lg" style={{ backgroundColor: theme.colors.darkBlueLighter }}>
          <Title order={3} c="white" mb="md">
            Available Rewards
          </Title>
          <SimpleGrid 
            cols={3} 
            spacing="lg" 
            style={{ 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' ,
            }}
          >
            {rewards.map((reward) => (
              <Card
                key={reward.id}
                shadow="sm"
                padding="lg"
                radius="md"
                style={{ 
                  backgroundColor: theme.colors.darkBlue, 
                  height: '400px', // Increased height for larger cards
                  width: '100%', 
                  border: '1px solid #4A5568',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                withBorder
              >
                {/* Background Image */}
                <div 
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${reward.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.2,
                    zIndex: 0
                  }} 
                />
                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <Badge
                    color="red"
                    variant="filled"
                    style={{ position: 'absolute', top: '8px', right: '8px' }}
                  >
                    ❤️
                  </Badge>
                  <Text mt="xs" fw={500} c="white" size="lg">
                    {reward.name}
                  </Text>
                  <Text size="md" c="gray.4" mt="xs">
                    {reward.description}
                  </Text>
                  <Progress
                    value={(totalPoints / reward.pointsCost) * 100}
                    color="green"
                    size="lg"
                    mt="md"
                    radius="xl"
                    style={{ backgroundColor: '#e0e7ff' }}
                  />
                  <Group justify="space-between" mt="md">
                    <Text fz="xl" fw={700} c="yellow.6">
                      ⭐ {reward.pointsCost}
                    </Text>
                    <Button
                      variant="subtle"
                      color={reward.redeemed ? 'gray' : 'blue'}
                      radius="md"
                      size="md"
                      disabled={reward.redeemed || totalPoints < reward.pointsCost}
                      onClick={() => handleRedeemReward(reward)}
                    >
                      {reward.redeemed ? 'Redeemed' : 'Redeem Now'}
                    </Button>
                  </Group>
                </div>
              </Card>
            ))}
          </SimpleGrid>
        </Paper>
      </Stack>
    </Container>
  );
};

export default UserCreditsRewards;