import React from 'react';
import { Box } from '@chakra-ui/react';
import { TextPrompt } from './misc/TextPrompt';
import { SettingsModal } from '../features/settings/components/SettingsModal';
import { CinematicBars } from './misc/CinematicBars';
import { CircleHudWrapper } from './player/CircleHudWrapper';
import { useHudListener } from '../hooks/useHudListener';
import { useHudReady } from '../hooks/useHudReady';
import { ProgressBarWrapper } from './progress/ProgressBarWrapper';
import { ScreenshotModeManager } from './misc/ScreenshotModeManager';
import { CrosshairManager } from './crosshair/CrosshairManager';

const MainWrapper: React.FC = () => {
  useHudListener();
  useHudReady();

  return (
    <React.Suspense fallback={<></>}>
      <ScreenshotModeManager>
        <CinematicBars />
        <CrosshairManager />
        <ProgressBarWrapper />
        <Box h='100%' w='100%' p={4} bg='none'>
          <TextPrompt />
          <SettingsModal />
          <CircleHudWrapper />
        </Box>
      </ScreenshotModeManager>
    </React.Suspense>
  );
};

export default MainWrapper;
