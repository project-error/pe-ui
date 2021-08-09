import React from 'react';
import { Box } from '@chakra-ui/react';
import { TextPrompt } from './TextPrompt';
import { ToastProvider } from '../providers/ToastProvider';
import { SettingsModal } from './SettingsModal';

const MainWrapper: React.FC = () => {
  return (
    <ToastProvider>
      <Box h='100%' w='100%' p={4} bg='none'>
        <TextPrompt />
        <SettingsModal />
      </Box>
    </ToastProvider>
  );
};

export default MainWrapper;
