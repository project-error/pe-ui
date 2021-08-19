import React from 'react';
import { CircleItem } from './CircleItem';
import { AiFillHeart } from 'react-icons/ai';
import { useHealthValue } from '../../state/hud.state';

export const HealthCircle: React.FC = () => {
  const health = useHealthValue();

  const healthColor = health < 20 ? 'red.400' : 'green.400';

  return (
    <CircleItem
      icon={AiFillHeart}
      max={100}
      min={0}
      value={health}
      color={healthColor}
      trackColor={'gray.900'}
      iconColor={'white'}
    />
  );
};
