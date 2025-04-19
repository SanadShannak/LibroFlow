import React from 'react';
import { Paper, Stack, Group, Text, Image, Box, ThemeIcon } from '@mantine/core';


interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  bgImage: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  subtitleColor,
  bgImage,
}) => {
  return (
    <Paper
      p="md"
      radius="18"
      bg="#37474f"
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: 270,
        height: 133,
      }}
    >
     <Box style={{ position: 'relative', flex: 1, zIndex: 1 }}>
  {/* Top-right Circles */}
  <Group gap="1" style={{ position: 'absolute', top: 0, right: 0 }}>
    <ThemeIcon color="red" size="sm" radius="xl" />
    <ThemeIcon color="yellow" size="sm" radius="xl" />
  </Group>

  {/* Left-aligned Content */}
  <Stack gap={4} pt={8} >
    <Text size="sm" c="#A0AEC0" pb={22} pl={2} fz={12} >
      {title}
    </Text>
    <Text size="xl" fw={700} c="white" pb={22} mt={-22}>
      {value}
    </Text>
    <Text size="xs" c={subtitleColor} pt={0}>
      {subtitle}
    </Text>
  </Stack>
</Box>


      {/* Background Image on the right */}
      <Box
        style={{
          position: 'absolute',
          right: 0,
          top: 20,
          left:60,
          bottom: 5,
          width: '100%',
          opacity: 0.05,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={bgImage}
          alt="background"
          fit="contain"
          height="100%"
          style={{ objectFit: 'cover' }}
        />
      </Box>
    </Paper>
  );
};

export default SummaryCard;
