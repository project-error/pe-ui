import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { CircleItem } from './CircleItem';
import { useNuiEvent } from '../../hooks/useNuiEvent';

export const VoiceCircle: React.FC = () => {
  const [voiceRange, setVoiceRange] = useState(1);
  const [isTalking, setIsTalking] = useState(false);

  useNuiEvent<number>('setVoiceRange', setVoiceRange);
  useNuiEvent<boolean>('setIsTalking', setIsTalking);

  const iconColor = isTalking ? 'yellow.200' : 'white';

  return (
    <CircleItem
      icon={FaMicrophone}
      max={3}
      min={0}
      value={voiceRange}
      color={iconColor}
      trackColor={'gray.900'}
      iconColor={iconColor}
    />
  );
};
