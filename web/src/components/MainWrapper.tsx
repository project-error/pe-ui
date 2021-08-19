import React from 'react';
import { Box } from '@chakra-ui/react';
import { TextPrompt } from './TextPrompt';
import { ToastProvider } from '../providers/ToastProvider';
import { SettingsModal } from './settings/SettingsModal';
import { CinematicBars } from './CinematicBars';

const MainWrapper: React.FC = () => {
  return (
    <React.Suspense fallback={<></>}>
      <ToastProvider>
        <CinematicBars />
        <Box h='100%' w='100%' p={4} bg='none'>
          <TextPrompt />
          <SettingsModal />
        </Box>
      </ToastProvider>
    </React.Suspense>
  );
};

export default MainWrapper;
