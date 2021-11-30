import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { SettingSwitch } from '../components/SettingSwitch';
import {
  checkIfValid,
  mergeSettings,
  useResetSettings,
  useSettings,
} from '../../../state/settings.state';
import { SettingColorPicker } from '../components/SettingColorPicker';
import { SettingsSlider } from '../components/SettingsSlider';
import { SettingButton } from '../components/SettingButton';
import { useAlertDialog } from '../../../providers/AlertDialogProvider';
import { useAlertProvider } from '../../../providers/ToastProvider';
import { setClipboard } from '../../../utils/setClipboard';
import { usePromptCtx } from '../../../providers/TextPromptProvider';
import { UserSettings } from '../../../types/settings.types';

const MultiActionSettingItem: React.FC = () => {
  const [settings, setSettings] = useSettings();
  const { addToast } = useAlertProvider();
  const { openPrompt } = usePromptCtx();

  const handleExportClick = () => {
    // Indent JSON with two spaces
    const settingsJson = JSON.stringify(settings, null, 2);
    setClipboard(settingsJson, 'chakra-modal-settings-modal');
    addToast({ message: 'Copied user settings to clipboard!', status: 'info' });
  };

  const handleImportClick = () => {
    openPrompt({
      shouldEmitEvent: false,
      runValidator: content => {
        try {
          const parsedObj = JSON.parse(content);
          return checkIfValid(parsedObj);
        } catch (e) {
          return false;
        }
      },
      onSubmit: (val: string) => {
        const parsedObj: UserSettings = JSON.parse(val);
        setSettings(parsedObj);
        addToast({
          message: 'Sucessfully updated settings from import',
          status: 'success',
        });
      },
      id: 'importSettingsPrompt',
      title: 'Import Settings',
      isClosable: true,
      placeholder: 'Settings JSON...',
      description:
        'Please enter the exact exported settings JSON, otherwise, you may come across issues.',
    });
  };

  return (
    <Box p={5} shadow='md' borderWidth='2px' borderRadius='md'>
      <Flex>
        <Box w='75%'>
          <Heading fontSize='l'>Export / Import Settings</Heading>
          <Text mt={2} color='gray.400'>
            Export or import user settings in JSON format
          </Text>
        </Box>
        <Center w='25%'>
          <HStack spacing={2}>
            <Button variant='solid' onClick={handleImportClick}>
              Import
            </Button>
            <Button
              variant='solid'
              onClick={handleExportClick}
              colorScheme='yellow'
            >
              Export
            </Button>
          </HStack>
        </Center>
      </Flex>
    </Box>
  );
};

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
        <MultiActionSettingItem />
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
