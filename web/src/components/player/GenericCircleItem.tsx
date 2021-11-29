import React from 'react';
import { CircleItem } from './CircleItem';
import { circleHudValues, HudStateAtomParam } from '../../state/hud.state';
import { useRecoilState } from 'recoil';
import * as faIcons from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useNuiEvent } from '../../hooks/useNuiEvent';

interface SetCircleItemOpts {
  id: string;
  value: number;
}

export const GenericCircleItem: React.FC<HudStateAtomParam> = ({
  color,
  value,
  id,
  trackColor,
  iconName,
  iconColor,
  max,
  min,
}) => {
  const [itemVal, setItemVal] = useRecoilState(circleHudValues(id));
  const faIconsTyped = faIcons as Record<string, IconType>;

  const icon = faIconsTyped[iconName];

  useNuiEvent<SetCircleItemOpts>('setItemValue', ({ value, id: tgtId }) => {
    if (tgtId !== id) return;
    setItemVal(value);
  });

  return (
    <CircleItem
      color={color}
      trackColor={trackColor ?? 'gray.900'}
      min={min}
      max={max}
      icon={icon}
      iconColor={iconColor ?? 'white'}
      value={itemVal}
    />
  );
};
