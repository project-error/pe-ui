import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { SettingInput } from './SettingInput';

export const OtherSettings: React.FC = () => {
  return (
    <Box h='100%' w='100%'>
      <Stack spacing={2}>
        <SettingInput
          value={0}
          title='Setting Thing'
          desc='This controls settings or smth'
        />
        <SettingInput
          value={0}
          title='Setting Thing'
          desc='This controls settings or smth'
        />
        <SettingInput
          value={0}
          title='Setting Thing'
          desc='This controls settings or smth'
        />
        <SettingInput
          value={0}
          title='Setting Thing'
          desc='This controls settings or smth'
        />
      </Stack>
    </Box>
  );
};
