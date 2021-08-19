import React from 'react';
import { CircleItem } from './CircleItem';
import { BsFillShieldFill } from 'react-icons/bs';
import { useArmorValue } from '../../state/hud.state';

export const ArmorCircle: React.FC = () => {
  const armor = useArmorValue();

  return (
    <CircleItem
      icon={BsFillShieldFill}
      max={100}
      min={0}
      value={armor}
      color={'blue.400'}
      hideWhenZero
      trackColor={'gray.900'}
      iconColor={'white'}
    />
  );
};
