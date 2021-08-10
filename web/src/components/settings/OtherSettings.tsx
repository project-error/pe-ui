import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { SettingInput } from './SettingInput';

export const OtherSettings: React.FC = () => {
  return (
    <Box h='100%' w='100%'>
      <Stack spacing={2}>
        <SettingInput
          title='Setting Thing'
          desc='This controls settings or smth'
        />
        <SettingInput
          title='Setting Thing'
          desc='This controls settings or smth'
        />
        <SettingInput
          title='Setting Thing'
          desc='This controls settings or smth'
        />
        <SettingInput
          title='Setting Thing'
          desc='This controls settings or smth'
        />
      </Stack>
    </Box>
  );
};
