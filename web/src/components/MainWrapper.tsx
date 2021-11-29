import React from 'react';
import { Box } from '@chakra-ui/react';
import { TextPrompt } from './misc/TextPrompt';
import { ToastProvider } from '../providers/ToastProvider';
import { SettingsModal } from './settings/SettingsModal';
import { CinematicBars } from './misc/CinematicBars';
import { CircleHudWrapper } from './player/CircleHudWrapper';
import { useHudListener } from '../hooks/useHudListener';
import { useHudReady } from '../hooks/useHudReady';
import { ProgressBarWrapper } from './progress/ProgressBarWrapper';
import { ScreenshotModeManager } from './misc/ScreenshotModeManager';

const MainWrapper: React.FC = () => {
  useHudListener();
  useHudReady();

  return (
    <React.Suspense fallback={<></>}>
      <ScreenshotModeManager>
        <ToastProvider>
          <CinematicBars />
          <ProgressBarWrapper />
          <Box h='100%' w='100%' p={4} bg='none'>
            <TextPrompt />
            <SettingsModal />
            <CircleHudWrapper />
          </Box>
        </ToastProvider>
      </ScreenshotModeManager>
    </React.Suspense>
  );
};

export default MainWrapper;
