import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { SettingSwitch } from '../components/SettingSwitch';
import { mergeSettings, useSettings } from '../../../state/settings.state';
import { SettingInput } from '../components/SettingInput';
import { SettingDropdown } from '../components/SettingDropdown';
import { ValidStatusLocations } from '../../../types/settings.types';
import { SettingsSlider } from '../components/SettingsSlider';

export const VisualSettings: React.FC = () => {
  const [settings, setSettings] = useSettings();

  const handleScreenshotToggle = (bool: boolean) => {
    setSettings(prevSettings =>
      mergeSettings(prevSettings, { screenshotMode: bool })
    );
  };

  const handleStatusLocation = (newLocation: string) => {
    setSettings(prevSettings =>
      mergeSettings(prevSettings, {
        statusCirclesLocation: newLocation as ValidStatusLocations,
      })
    );
  };

  const handleCinematicToggle = (bool: boolean) => {
    setSettings(prevSettings =>
      mergeSettings(prevSettings, { cinematicBars: bool })
    );
  };

  const handleBlackbarSize = (val: number) => {
    setSettings(prevSettings =>
      mergeSettings(prevSettings, { cinematicBarSize: val })
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
        <SettingSwitch
          title='Cinematic Mode'
          desc='Toggle black bars and HUD'
          value={settings.cinematicBars}
          handler={e => handleCinematicToggle(e.target.checked)}
        />
        <SettingsSlider
          title='Cinematic Black Bar Size'
          desc='Controls the size of black bars'
          handler={handleBlackbarSize}
          value={settings.cinematicBarSize}
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
