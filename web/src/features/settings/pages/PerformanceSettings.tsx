import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { mergeSettings, useSettings } from '../../../state/settings.state';
import { SettingInput } from '../components/SettingInput';

export const PerformanceSettings: React.FC = () => {
  const [settings, setSettings] = useSettings();

  const handleArmorIntervalChange = (ms: number) => {
    setSettings(prevSettings =>
      mergeSettings(prevSettings, { healthArmorInterval: ms })
    );
  };

  const handleVoiceIntervalChange = (ms: number) => {
    setSettings(prevSettings =>
      mergeSettings(prevSettings, { healthArmorInterval: ms })
    );
  };

  return (
    <Box h='100%' w='100%'>
      <Stack spacing={2}>
        <SettingInput
          title='Armor & Health Update Interval (ms)'
          desc='This is the interval, in milliseconds, for health & armor updates. Increasing this may improve client performance'
          value={settings.healthArmorInterval}
          handler={handleArmorIntervalChange}
        />
        <SettingInput
          title='Voice Update Interval (ms)'
          desc='This is the interval, in milliseconds, for voice state updates. Increasing this may improve client performance'
          value={settings.voiceUpdateInterval}
          handler={handleVoiceIntervalChange}
        />
      </Stack>
    </Box>
  );
};
