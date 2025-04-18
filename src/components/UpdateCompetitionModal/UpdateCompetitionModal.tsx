import { Modal, Box, Group, Title, ActionIcon, TextInput, Button, InputWrapper, Input, Text } from '@mantine/core';
import { IconPencil, IconX } from '@tabler/icons-react';
import classes from './UpdateCompetitionModal.module.css';
import theme from '../../utils/theme';
import { Competition } from '../../pages/admin/Competitions/data';

interface UpdateCompetitionModalProps {
  opened: boolean;
  onClose: () => void;
  competition: Competition | null;
  updateDateInput: string;
  updateDateError: string | null;
  onUpdateCompetition: () => void;
  onNameChange: (name: string) => void;
  onRewardChange: (reward: string) => void;
  onDateChange: (date: string) => void;
  formatDateForDisplay: (date: Date | null) => string;
}

const UpdateCompetitionModal: React.FC<UpdateCompetitionModalProps> = ({
  opened,
  onClose,
  competition,
  updateDateInput,
  updateDateError,
  onUpdateCompetition,
  onNameChange,
  onRewardChange,
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
          <Group align="center">
            <IconPencil size={24} color="#1971C2" />
            <Title order={4}>Update Competition</Title>
          </Group>
          <ActionIcon
            onClick={onClose}
            variant="subtle"
            className={classes.closeButton}
          >
            <IconX size={18} color="#666" />
          </ActionIcon>
        </Group>

        {competition && (
          <div className={classes.form}>
            <TextInput
              label="Competition Name"
              placeholder="Enter competition name"
              value={competition.name}
              onChange={(event) => onNameChange(event.currentTarget.value)}
              required
              className={classes.input}
            />
            <TextInput
              label="Reward"
              placeholder="Enter reward"
              value={competition.reward}
              onChange={(event) => onRewardChange(event.currentTarget.value)}
              required
              className={classes.input}
            />
            <InputWrapper
              label="Due Date"
              required
              error={updateDateError}
              className={classes.inputWrapper}
            >
              <Input
                component="input"
                type="date"
                value={updateDateInput}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onDateChange(event.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={classes.dateInput}
              />
              {competition.dueDate && (
                <Text size="sm" c="dimmed" mt={4}>
                  Selected: {formatDateForDisplay(competition.dueDate)}
                </Text>
              )}
            </InputWrapper>
          </div>
        )}

        <Group justify="flex-end" mt="xl">
          <Button
            variant="outline"
            color="gray"
            onClick={onClose}
            className={classes.modalButton}
          >
            CANCEL
          </Button>
          <Button
            style={{ backgroundColor: theme.colors.darkBlueLighter, color: 'white' }}
            onClick={onUpdateCompetition}
            className={classes.modalButton}
          >
            UPDATE
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default UpdateCompetitionModal;