import { Box, Circle } from '@chakra-ui/react';
import React from 'react';
import { useSettingsValue } from '../../state/settings.state';

export const CrosshairManager: React.FC = () => {
  const { crosshairColor, crosshairEnabled, screenshotMode, crosshairSize } =
    useSettingsValue();

  const shouldShow = crosshairEnabled && !screenshotMode;

  const adjustedSize = crosshairSize / 2;

  return (
    <Box
      position='absolute'
      h='100vh'
      w='100vw'
      zIndex={1}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Circle
        bg={crosshairColor}
        opacity={shouldShow ? 1 : 0}
        w={adjustedSize}
        h={adjustedSize}
      />
    </Box>
  );
};
