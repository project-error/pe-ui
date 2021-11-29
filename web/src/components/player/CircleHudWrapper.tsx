import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { VoiceCircle } from './VoiceCircle';
import { HealthCircle } from './HealthCircle';
import { ArmorCircle } from './ArmorCircle';
import { usePauseActiveValue } from '../../state/base.state';
import { useSettingsValue } from '../../state/settings.state';
import { GenericCircleItem } from './GenericCircleItem';
import { useRecoilValue } from 'recoil';
import { hudStateListIds } from '../../state/hud.state';
import { ValidStatusLocations } from '../../types/settings.types';

interface FlexStyleObj {
  justifyContent: string;
  alignItems: string;
}

const determineFlexLayout = (location: ValidStatusLocations): FlexStyleObj => {
  switch (location) {
    case 'bottom-right':
      return { alignItems: 'flex-end', justifyContent: 'flex-end' };
    case 'bottom':
      return { justifyContent: 'center', alignItems: 'flex-end' };
    case 'bottom-left':
      return { justifyContent: 'flex-start', alignItems: 'flex-end' };
    case 'top':
      return { justifyContent: 'center', alignItems: 'flex-start' };
    case 'top-left':
      return { justifyContent: 'flex-start', alignItems: 'flex-start' };
    case 'top-right':
      return { justifyContent: 'flex-end', alignItems: 'flex-start' };
  }
};

export const CircleHudWrapper: React.FC = () => {
  const pauseActive = usePauseActiveValue();
  const { cinematicBars, screenshotMode } = useSettingsValue();
  const ids = useRecoilValue(hudStateListIds);
  const { statusCirclesLocation } = useSettingsValue();

  const flexLayout = determineFlexLayout(statusCirclesLocation);

  return (
    <Box
      h='100%'
      w='100%'
      display='flex'
      justifyContent={flexLayout.justifyContent}
      alignItems={flexLayout.alignItems}
      opacity={pauseActive || cinematicBars || screenshotMode ? 0 : 1}
    >
      <HStack h='fit-content' w='fit-content'>
        <React.Suspense fallback={<></>}>
          <HealthCircle />
          <ArmorCircle />
          <VoiceCircle />
          {ids.map(({ ...props }) => (
            <GenericCircleItem {...props} key={props.id} />
          ))}
        </React.Suspense>
      </HStack>
    </Box>
  );
};
