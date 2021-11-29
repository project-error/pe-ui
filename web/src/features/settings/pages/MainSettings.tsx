import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { SettingSwitch } from '../components/SettingSwitch';
import { mergeSettings, useSettings } from '../../../state/settings.state';
import { SettingInput } from '../components/SettingInput';
import { SettingDropdown } from '../components/SettingDropdown';
import { ValidStatusLocations } from '../../../types/settings.types';

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

  const handleStatusLocation = (newLocation: string) => {
    setSettings(prevSettings =>
      mergeSettings(prevSettings, {
        statusCirclesLocation: newLocation as ValidStatusLocations,
      })
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
        <SettingDropdown
          title='Status Circle Location'
          handler={handleStatusLocation}
          desc='This determines the location of the circle status bars.'
          value={settings.statusCirclesLocation}
          options={[
            'bottom',
            'bottom-left',
            'bottom-right',
            'top',
            'top-left',
            'top-right',
          ]}
        />
      </Stack>
    </Box>
  );
};
