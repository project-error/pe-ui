import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { VoiceCircle } from './VoiceCircle';
import { HealthCircle } from './HealthCircle';
import { ArmorCircle } from './ArmorCircle';
import { usePauseActiveValue } from '../../state/base.state';
import { useSettingsValue } from '../../state/settings.state';

export const CircleHudWrapper: React.FC = () => {
  const pauseActive = usePauseActiveValue();
  const { cinematicBars } = useSettingsValue();

  return (
    <Box
      h='100%'
      w='100%'
      display='flex'
      justifyContent='flex-end'
      alignItems='flex-end'
      opacity={pauseActive || cinematicBars ? 0 : 1}
    >
      <HStack h='fit-content' w='fit-content'>
        <HealthCircle />
        <ArmorCircle />
        <VoiceCircle />
      </HStack>
    </Box>
  );
};
