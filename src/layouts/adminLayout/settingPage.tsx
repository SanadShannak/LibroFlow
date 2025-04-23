import React, { useState } from 'react';
import { Box, Text, Paper, Stack, TextInput, FileInput, Button, Modal, PasswordInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUser, IconMail, IconPhoto, IconLock } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

const SettingsPage: React.FC = () => {
  // State for Change Password modal
  const [passwordModalOpened, setPasswordModalOpened] = useState(false);

  // Form for user profile
  const profileForm = useForm({
    initialValues: {
      name: 'Motasem AlAtawneh',
      email: 'motasem@example.com',
      picture: null as File | null,
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Name must be at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  // Form for change password
  const passwordForm = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      oldPassword: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
      newPassword: (value) => (value.length < 6 ? 'New password must be at least 6 characters' : null),
      confirmPassword: (value, values) =>
        value !== values.newPassword ? 'Passwords do not match' : null,
    },
  });

  // Handle profile form submission
  const handleProfileSubmit = async (values: typeof profileForm.values) => {
    try {
      // Simulate API call to update profile
      console.log('Updating profile:', values);
      // Example: await updateProfileAPI(values);
      notifications.show({
        title: 'Success',
        message: 'Profile updated successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update profile',
        color: 'red',
      });
    }
  };

  // Handle password form submission
  const handlePasswordSubmit = async (values: typeof passwordForm.values) => {
    try {
      // Simulate API call to change password
      console.log('Changing password:', values);
      // Example: await changePasswordAPI(values);
      notifications.show({
        title: 'Success',
        message: 'Password changed successfully',
        color: 'green',
      });
      setPasswordModalOpened(false);
      passwordForm.reset();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to change password',
        color: 'red',
      });
    }
  };

  return (
    <Box p="md">
      <Paper p="md" radius="md" bg="#37474f" style={{ maxWidth: 600, margin: '0 auto' }}>
        <Text size="lg" fw={700} c="white" mb="md">
          Account Settings
        </Text>
        <form onSubmit={profileForm.onSubmit(handleProfileSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Name"
              placeholder="Enter your name"
              leftSection={<IconUser size={16} />}
              {...profileForm.getInputProps('name')}
              styles={{
                input: { backgroundColor: '#455A64', color: 'white', borderColor: '#546E7A' },
                label: { color: '#A0AEC0' },
              }}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              leftSection={<IconMail size={16} />}
              {...profileForm.getInputProps('email')}
              styles={{
                input: { backgroundColor: '#455A64', color: 'white', borderColor: '#546E7A' },
                label: { color: '#A0AEC0' },
              }}
            />
            <FileInput
              label="Profile Picture"
              placeholder="Upload a new picture"
              leftSection={<IconPhoto size={16} />}
              accept="image/*"
              {...profileForm.getInputProps('picture')}
              styles={{
                input: { backgroundColor: '#455A64', color: 'white', borderColor: '#546E7A' },
                label: { color: '#A0AEC0' },
              }}
            />
            <Button
              type="submit"
              color="blue"
              style={{ backgroundColor: '#3B82F6', alignSelf: 'flex-start' }}
            >
              Save Profile
            </Button>
          </Stack>
        </form>

        <Button
          mt="md"
          color="gray"
          leftSection={<IconLock size={16} />}
          onClick={() => setPasswordModalOpened(true)}
          style={{ backgroundColor: '#546E7A', alignSelf: 'flex-start' }}
        >
          Change Password
        </Button>
      </Paper>

      {/* Change Password Modal */}
      <Modal
        opened={passwordModalOpened}
        onClose={() => setPasswordModalOpened(false)}
        title="Change Password"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        styles={{
          content: { backgroundColor: '#37474f' },
          header: { backgroundColor: '#37474f', color: 'white' },
          title: { color: 'white', fontWeight: 700 },
        }}
      >
        <form onSubmit={passwordForm.onSubmit(handlePasswordSubmit)}>
          <Stack gap="md">
            <PasswordInput
              label="Old Password"
              placeholder="Enter old password"
              {...passwordForm.getInputProps('oldPassword')}
              styles={{
                input: { backgroundColor: '#455A64', color: 'white', borderColor: '#546E7A' },
                label: { color: '#A0AEC0' },
              }}
            />
            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              {...passwordForm.getInputProps('newPassword')}
              styles={{
                input: { backgroundColor: '#455A64', color: 'white', borderColor: '#546E7A' },
                label: { color: '#A0AEC0' },
              }}
            />
            <PasswordInput
              label="Confirm New Password"
              placeholder="Confirm new password"
              {...passwordForm.getInputProps('confirmPassword')}
              styles={{
                input: { backgroundColor: '#455A64', color: 'white', borderColor: '#546E7A' },
                label: { color: '#A0AEC0' },
              }}
            />
            <Group justify="flex-end">
              <Button
                color="gray"
                onClick={() => setPasswordModalOpened(false)}
                style={{ backgroundColor: '#546E7A' }}
              >
                Cancel
              </Button>
              <Button type="submit" color="blue" style={{ backgroundColor: '#3B82F6' }}>
                Save Password
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
};

export default SettingsPage;
