import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { SettingsSlider } from './SettingsSlider';
import { SettingSwitch } from './SettingSwitch';
import { useSettings } from '../../state/settings.state';
import { UserSettings } from '../../types/settings.types';

const mergeSettings = (
  oldSettings: UserSettings,
  newSettings: Partial<UserSettings>
) => ({ ...oldSettings, ...newSettings });

export const SecondarySettings: React.FC = () => {
  const [settings, setSettings] = useSettings();

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
          title='Cinematic Mode'
          desc='Toggle black bars and HUD'
          value={settings.cinematicBars}
          handler={e => handleCinematicToggle(e.target.checked)}
        />
        <SettingsSlider
          title='Black Bar Size'
          desc='Controls the size of black bars'
          handler={handleBlackbarSize}
          value={settings.cinematicBarSize}
        />
        <SettingsSlider
          title='Setting Thing'
          desc='This controls settings or smth'
        />
        <SettingsSlider
          title='Setting Thing'
          desc='This controls settings or smth'
        />
      </Stack>
    </Box>
  );
};
