import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Fade,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import { useKey } from '../../hooks/useKey';

interface ProgBarData {
  color: string;
  duration: number;
  id: string;
  isCancellable?: boolean;
  disableControls?: boolean;
}

// const defaultProgState: ProgBarData = {
//   color: 'green',
//   duration: 5000,
//   id: 'nice-one',
// };

const TICK_DURATION = 100;

export const ProgressBarWrapper: React.FC = () => {
  const [progState, setProgState] = useState<ProgBarData | null>(null);
  const [progValue, setProgValue] = useState(0);
  const [progVisible, setProgVisible] = useState(true);
  const intervalCountRef = useRef(0);

  const resetState = () => {
    intervalCountRef.current = 0;
    setProgValue(0);
    setProgState(null);
  };

  const handleProgComplete = useCallback(
    (progState: ProgBarData) => {
      if (!progVisible) return;
      setProgVisible(false);
      fetchNui('progbar-complete', {
        progbarId: progState.id,
      });
      resetState();
    },
    [progVisible]
  );

  const handleProgCancelled = useCallback((progState: ProgBarData) => {
    setProgVisible(false);
    fetchNui('progbar-cancel', {
      progbarId: progState.id,
    });
    resetState();
  }, []);

  const escapeKeyHandler = useCallback(
    (e: KeyboardEvent) => {
      if (!progVisible || !progState) return;

      if (!progState.isCancellable) return;

      e.preventDefault();
      handleProgCancelled(progState);
    },
    [handleProgCancelled, progVisible, progState]
  );

  useEffect(() => {
    if (!progState) return;

    const amountOfSteps = progState.duration / TICK_DURATION;
    const valuePerStep = TICK_DURATION / amountOfSteps;

    const interval = setInterval(() => {
      intervalCountRef.current += 1;
      setProgValue(prevState => prevState + valuePerStep);

      if (intervalCountRef.current === amountOfSteps) {
        clearInterval(interval);
        handleProgComplete(progState);
      }
    }, TICK_DURATION);

    return () => {
      clearInterval(interval);
    };
  }, [handleProgComplete, progState]);

  useNuiEvent<ProgBarData>('setProgressBar', progBarData => {
    setProgState(progBarData);
    setProgVisible(true);
  });

  useNuiEvent('closeProgbar', () => {
    setProgVisible(false);
    resetState();
  });

  useKey('Escape', escapeKeyHandler);

  if (!progState) return null;

  return (
    <Box
      position='absolute'
      h='100vh'
      w='100%'
      justifyContent='center'
      display='flex'
      alignItems='center'
    >
      <Fade in={progVisible}>
        <CircularProgress
          value={progValue}
          size='100px'
          rounded={100}
          color='green.400'
        >
          <CircularProgressLabel color='black'>
            {progValue}%
          </CircularProgressLabel>
        </CircularProgress>
      </Fade>
    </Box>
  );
};
