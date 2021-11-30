import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { SettingSwitch } from '../components/SettingSwitch';
import {
  mergeSettings,
  useResetSettings,
  useSettings,
} from '../../../state/settings.state';
import { SettingColorPicker } from '../components/SettingColorPicker';
import { SettingsSlider } from '../components/SettingsSlider';
import { SettingButton } from '../components/SettingButton';
import { useAlertDialog } from '../../../providers/AlertDialogProvider';
import { useAlertProvider } from '../../../providers/ToastProvider';

export const AdditionalSettings: React.FC = () => {
  const [settings, setSettings] = useSettings();

  const resetSettings = useResetSettings();
  const { openAlertDialog } = useAlertDialog();
  const { addToast } = useAlertProvider();

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

  const handleResetUserSettings = () => {
    openAlertDialog({
      title: 'Reset User Settings',
      confirmBtnText: 'Reset Settings',
      message:
        'Please confirm that you would like to reset the user settings back to default. (You cannot undo this action)',
      onConfirm: () => {
        resetSettings();
        addToast({
          message: 'Reset user settings to default!',
          status: 'success',
        });
      },
    });
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
        <SettingButton
          handler={handleResetUserSettings}
          buttonText='Reset Settings'
          colorScheme='red'
          variant='solid'
          title='Reset User Settings'
          desc='Completely reset all user settings to default values'
        />
      </Stack>
    </Box>
  );
};
