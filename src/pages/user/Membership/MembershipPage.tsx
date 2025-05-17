import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Button, Group, Paper, ThemeIcon, List, Modal } from '@mantine/core';
import { IconCrown } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import classes from './MembershipPage.module.css';
import { getMembershipStatus, subscribe, cancelMembership, MembershipStatus } from './membershipService';

const benefits = [
  'Unlimited book borrows every month',
  'Priority access to new arrivals and bestsellers',
  'Exclusive invites to member-only events and workshops',
  'Earn double credits on every borrow',
  'Personalized book recommendations',
  'Discounts on late fees and special purchases',
];

const GOLD = '#FFD700';
const DARK_BLUE = '#263238';
const WHITE_GRADIENT_ID = 'crown-white-gradient';

function WhiteCrownIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={WHITE_GRADIENT_ID} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#e0e0e0" />
        </linearGradient>
      </defs>
      <path d="M5.5 17L3 7l5.5 5 3.5-7 3.5 7 5.5-5-2.5 10H5.5z" fill={`url(#${WHITE_GRADIENT_ID})`} />
      <rect x="5" y="19" width="14" height="2" rx="1" fill={`url(#${WHITE_GRADIENT_ID})`} />
    </svg>
  );
}

const MembershipPage: React.FC = () => {
  const [membershipStatus, setMembershipStatus] = useState<MembershipStatus | null>(null);
  const [loading, setLoading] = useState<'subscribe' | 'cancel' | null>(null);
  const [renewModal, setRenewModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  useEffect(() => {
    const status = getMembershipStatus();
    setMembershipStatus(status);
  }, []);

  // Simulate local state change for membership
  const doRenew = async () => {
    setLoading('subscribe');
    await subscribe();
    setMembershipStatus((prev) => prev ? { ...prev, isActive: true, expiryDate: '2024-12-31' } : null);
    setLoading(null);
    setRenewModal(false);
    showNotification({
      title: 'Membership Renewed',
      message: 'Your membership has been renewed successfully!',
      color: 'teal',
      icon: <IconCrown color={GOLD} size={20} />,
    });
  };

  const doCancel = async () => {
    setLoading('cancel');
    await cancelMembership();
    setMembershipStatus((prev) => prev ? { ...prev, isActive: false } : null);
    setLoading(null);
    setCancelModal(false);
    showNotification({
      title: 'Membership Cancelled',
      message: 'Your membership has been cancelled.',
      color: 'red',
      icon: <IconCrown color={GOLD} size={20} />,
    });
  };

  if (!membershipStatus) return <Text>Loading...</Text>;

  // Silver gradient style for active badge
  const silverBadgeStyle = membershipStatus.isActive
    ? { background: 'linear-gradient(90deg, #e0e0e0 0%, #b0bec5 100%)', color: DARK_BLUE, fontWeight: 700 }
    : undefined;

  return (
    <Container fluid className={classes.container}>
      <Paper className={classes.membershipCard}>
        <div className={classes.iconWrapper} style={{ background: GOLD, boxShadow: '0 4px 16px 0 rgba(255,215,0,0.18)', width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
          <WhiteCrownIcon size={56} />
        </div>
        <Title order={2} c="white" mb="xs" style={{ letterSpacing: 1, fontWeight: 700 }}>Membership</Title>
        <span className={`${classes.statusBadge} ${!membershipStatus.isActive ? classes.statusInactive : ''}`} style={silverBadgeStyle}>
          {membershipStatus.isActive ? 'Active' : 'Inactive'}
        </span>
        <Text size="lg" c="white" mb={4} style={{ fontWeight: 500 }}>
          Current Plan: <span style={{ color: GOLD, fontWeight: 700 }}>{membershipStatus.planName}</span>
        </Text>
        <Text c="gray.3" mb={8}>
          Expiry Date: {membershipStatus.expiryDate}
        </Text>
        <Group className={classes.buttonGroup}>
          <Button
            size="md"
            radius="md"
            variant="filled"
            color="blue"
            onClick={() => setRenewModal(true)}
            loading={loading === 'subscribe'}
            style={{ flex: 1, fontWeight: 600 }}
          >
            {membershipStatus.isActive ? 'Renew' : 'Subscribe'}
          </Button>
          <Button
            size="md"
            radius="md"
            variant="outline"
            color="red"
            onClick={() => setCancelModal(true)}
            loading={loading === 'cancel'}
            style={{ flex: 1, fontWeight: 600 }}
            disabled={!membershipStatus.isActive}
          >
            Cancel
          </Button>
        </Group>
        <div className={classes.benefits}>
          <Text size="md" fw={600} mb={8} style={{ color: GOLD, letterSpacing: 0.5 }}>Membership Benefits</Text>
          <List spacing="xs" size="md" icon={<IconCrown size={18} color={GOLD} />}>
            {benefits.map((benefit, idx) => (
              <List.Item key={idx}>{benefit}</List.Item>
            ))}
          </List>
        </div>
      </Paper>
      {/* Renew Confirmation Modal */}
      <Modal opened={renewModal} onClose={() => setRenewModal(false)} title="Renew Membership" centered>
        <Text mb="md">Are you sure you want to renew your membership?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setRenewModal(false)}>Cancel</Button>
          <Button color="blue" onClick={doRenew} loading={loading === 'subscribe'}>Confirm</Button>
        </Group>
      </Modal>
      {/* Cancel Confirmation Modal */}
      <Modal opened={cancelModal} onClose={() => setCancelModal(false)} title="Cancel Membership" centered>
        <Text mb="md">Are you sure you want to cancel your membership?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setCancelModal(false)}>Back</Button>
          <Button color="red" onClick={doCancel} loading={loading === 'cancel'}>Confirm</Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default MembershipPage;
