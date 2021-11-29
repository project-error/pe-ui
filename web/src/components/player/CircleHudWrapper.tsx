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

export const CircleHudWrapper: React.FC = () => {
  const pauseActive = usePauseActiveValue();
  const { cinematicBars } = useSettingsValue();
  const ids = useRecoilValue(hudStateListIds);

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
