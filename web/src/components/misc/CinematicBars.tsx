import React, { useEffect, useMemo } from 'react';
import { useSetSettings, useSettingsValue } from '../../state/settings.state';
import { Box, Slide } from '@chakra-ui/react';
import { fetchNui } from '../../utils/fetchNui';
import { useNuiEvent } from '../../hooks/useNuiEvent';

// This is the max height both halfs of the cinematic bars can
// add up to in vh units.
const MAX_HEIGHT = 40;

export const CinematicBars: React.FC = () => {
  const { cinematicBarSize, cinematicBars } = useSettingsValue();

  const setSettings = useSetSettings();

  useEffect(() => {
    fetchNui('cinematicModeToggle', cinematicBars, {});
  }, [cinematicBars]);

  const evenSize = useMemo(() => {
    const percentage = cinematicBarSize / 100;
    return (percentage * MAX_HEIGHT) / 2;
  }, [cinematicBarSize]);

  // Triggered by the command on client side
  useNuiEvent<boolean>('setCinematicBars', toggleOn => {
    setSettings(prevSettings => ({ ...prevSettings, cinematicBars: toggleOn }));
  });

  return (
    <Box
      position='absolute'
      h='100vh'
      zIndex={999}
      w='100%'
      display='flex'
      justifyContent='space-between'
      flexDir='column'
    >
      <Slide in={cinematicBars} direction='top'>
        <Box bg='black' w='100%' h={`${evenSize}vh`} />
      </Slide>
      <Slide in={cinematicBars} direction='bottom'>
        <Box bg='black' w='100%' h={`${evenSize}vh`} />
      </Slide>
    </Box>
  );
};
