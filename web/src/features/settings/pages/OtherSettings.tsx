import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { SettingInput } from '../components/SettingInput';
import { SettingSwitch } from '../components/SettingSwitch';
import { mergeSettings, useSettings } from '../../../state/settings.state';
import { SettingColorPicker } from '../components/SettingColorPicker';
import { SettingsSlider } from '../components/SettingsSlider';

export const OtherSettings: React.FC = () => {
  const [settings, setSettings] = useSettings();

  const handleCrosshairToggle = (bool: boolean) => {
    setSettings(prevSettings =>
      mergeSettings(prevSettings, { crosshairEnabled: bool })
    );
  };

  const handleColorChange = (color: string) => {
    setSettings(prevSettings =>
      mergeSettings(prevSettings, { crosshairColor: color })
    );
  };

  const handleSizeChange = (size: number) => {
    setSettings(prevSettings =>
      mergeSettings(prevSettings, { crosshairSize: size })
    );
  };

  return (
    <Box h='100%' w='100%'>
      <Stack spacing={2}>
        <SettingSwitch
          value={settings.crosshairEnabled}
          handler={e => handleCrosshairToggle(e.target.checked)}
          title='Enable Crosshair'
          desc='Enable your custom crosshair'
        />
        <SettingColorPicker
          value={settings.crosshairColor}
          handler={handleColorChange}
          title='Crosshair Color'
          desc='Adjust the color of your custom crosshair'
        />
        <SettingsSlider
          value={settings.crosshairSize}
          min={1}
          max={10}
          handler={handleSizeChange}
          title='Crosshair Size'
          desc='Adjust the size of your crosshair'
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
