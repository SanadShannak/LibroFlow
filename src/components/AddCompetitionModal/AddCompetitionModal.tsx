import { Modal, Box, Group, Title, ActionIcon, TextInput, Button, InputWrapper, Input, Text } from '@mantine/core';
import { IconTrophy, IconX } from '@tabler/icons-react';
import classes from './AddCompetitionModal.module.css';
import theme from '../../utils/theme';

interface AddCompetitionModalProps {
  opened: boolean;
  onClose: () => void;
  newCompetition: { name: string; reward: string; dueDate: Date | null };
  addDateInput: string;
  addDateError: string | null;
  onAddCompetition: () => void;
  onNameChange: (name: string) => void;
  onRewardChange: (reward: string) => void;
  onDateChange: (date: string) => void;
  formatDateForDisplay: (date: Date | null) => string;
}

const AddCompetitionModal: React.FC<AddCompetitionModalProps> = ({
  opened,
  onClose,
  newCompetition,
  addDateInput,
  addDateError,
  onAddCompetition,
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
          <Group>
            <ActionIcon variant="transparent" size="md">
              <IconTrophy size={24} color="#1971C2" />
            </ActionIcon>
            <Title order={4}>Add Competition</Title>
          </Group>
          <ActionIcon
            onClick={onClose}
            variant="subtle"
            className={classes.closeButton}
          >
            <IconX size={18} color="#666" />
          </ActionIcon>
        </Group>

        <div className={classes.form}>
          <TextInput
            label="Competition Name"
            placeholder="Enter competition name"
            value={newCompetition.name}
            onChange={(event) => onNameChange(event.currentTarget.value)}
            required
            className={classes.input}
          />
          <TextInput
            label="Reward"
            placeholder="Enter reward"
            value={newCompetition.reward}
            onChange={(event) => onRewardChange(event.currentTarget.value)}
            required
            className={classes.input}
          />
          <InputWrapper
            label="Due Date"
            required
            error={addDateError}
            className={classes.inputWrapper}
          >
            <Input
              component="input"
              type="date"
              value={addDateInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onDateChange(event.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={classes.dateInput}
            />
            {newCompetition.dueDate && (
              <Text size="sm" c="dimmed" mt={4}>
                Selected: {formatDateForDisplay(newCompetition.dueDate)}
              </Text>
            )}
          </InputWrapper>
        </div>

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
            onClick={onAddCompetition}
            className={classes.modalButton}
          >
            ADD
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default AddCompetitionModal;