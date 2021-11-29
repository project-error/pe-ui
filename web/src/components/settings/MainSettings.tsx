import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { SettingSwitch } from './SettingSwitch';
import { mergeSettings, useSettings } from '../../state/settings.state';
import { SettingInput } from './SettingInput';

export const MainSettings: React.FC = () => {
  const [settings, setSettings] = useSettings();

  const handleScreenshotToggle = (bool: boolean) => {
    setSettings(prevSettings =>
      mergeSettings(prevSettings, { screenshotMode: bool })
    );
  };

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
        <SettingSwitch
          title='Screenshot Mode'
          handler={e => handleScreenshotToggle(e.target.checked)}
          desc='Enables screenshot mode, disabling all current UI components from showing'
          value={settings.screenshotMode}
        />
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
        <SettingSwitch
          title='Setting Thing'
          desc='This controls settings or smth'
          value={false}
        />
      </Stack>
    </Box>
  );
};
