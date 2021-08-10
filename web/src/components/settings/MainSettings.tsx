import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { SettingSwitch } from './SettingSwitch';

export const MainSettings: React.FC = () => {
  return (
    <Box h='100%' w='100%'>
      <Stack spacing={2}>
        <SettingSwitch
          title='Setting Thing'
          desc='This controls settings or smth'
          value={false}
        />
        <SettingSwitch
          title='Setting Thing'
          desc='This controls settings or smth'
          value={false}
        />
        <SettingSwitch
          title='Setting Thing'
          desc='This controls settings or smth'
          value={false}
        />
        <SettingSwitch
          title='Setting Thing'
          desc='This controls settings or smth'
          value={false}
        />
      </Stack>
    </Box>
  );
};
