import React from 'react';
import { Modal, Box, Group, Title, ActionIcon, TextInput, Button, InputWrapper, Input, Text } from '@mantine/core';
import { IconCalendarEvent, IconX } from '@tabler/icons-react';
import classes from './AddEventModal.module.css';
import theme from '../../../../utils/theme';

interface Event {
  title: string;
  date: string;
  location: string;
  progress: number;
}

interface AddEventModalProps {
  opened: boolean;
  onClose: () => void;
  newEvent: Event;
  addDateInput: string;
  addDateError: string | null;
  onAddEvent: () => void;
  onTitleChange: (title: string) => void;
  onLocationChange: (location: string) => void;
  onProgressChange: (progress: number) => void;
  onDateChange: (date: string) => void;
  formatDateForDisplay: (date: string) => string;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  opened,
  onClose,
  newEvent,
  addDateInput,
  addDateError,
  onAddEvent,
  onTitleChange,
  onLocationChange,
  onProgressChange,
  onDateChange,
  formatDateForDisplay,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title=""
      centered
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      padding={0}
      radius="md"
      size="md"
      zIndex={1000}
      className={classes.modal}
    >
      <Box className={classes.modalBox}>
        <Group justify="space-between" mb="md">
          <Group>
            <ActionIcon variant="transparent" size="md">
              <IconCalendarEvent size={24} color="#1971C2" />
            </ActionIcon>
            <Title order={4}>Add Event</Title>
          </Group>
          <ActionIcon onClick={onClose} variant="subtle" className={classes.closeButton}>
            <IconX size={18} color="#666" />
          </ActionIcon>
        </Group>

        <div className={classes.form}>
          <TextInput
            label="Event Title"
            placeholder="Enter event title"
            value={newEvent.title}
            onChange={(event) => onTitleChange(event.currentTarget.value)}
            required
            className={classes.input}
          />
          <TextInput
            label="Location"
            placeholder="Enter location"
            value={newEvent.location}
            onChange={(event) => onLocationChange(event.currentTarget.value)}
            required
            className={classes.input}
          />
          <TextInput
            label="Progress (%)"
            placeholder="Enter progress (0-100)"
            type="number"
            value={newEvent.progress.toString()}
            onChange={(event) => {
              const value = parseInt(event.currentTarget.value);
              if (!isNaN(value) && value >= 0 && value <= 100) {
                onProgressChange(value);
              }
            }}
            required
            className={classes.input}
          />
          <InputWrapper label="Event Date" required error={addDateError} className={classes.inputWrapper}>
            <Input
              component="input"
              type="date"
              value={addDateInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onDateChange(event.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={classes.dateInput}
            />
            {newEvent.date && (
              <Text size="sm" c="dimmed" mt={4}>
                Selected: {formatDateForDisplay(newEvent.date)}
              </Text>
            )}
          </InputWrapper>
        </div>

        <Group justify="flex-end" mt="xl">
          <Button variant="outline" color="gray" onClick={onClose} className={classes.modalButton}>
            CANCEL
          </Button>
          <Button
            style={{ backgroundColor: theme.colors.darkBlueLighter, color: 'white' }}
            onClick={onAddEvent}
            className={classes.modalButton}
          >
            ADD
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default AddEventModal;