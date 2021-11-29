import {
  atom,
  atomFamily,
  SerializableParam,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { useCallback } from 'react';

const hudState = {
  health: atom({
    key: 'health',
    default: 100,
  }),
  armor: atom({
    key: 'armor',
    default: 100,
  }),
};

export interface HudStateAtomParam {
  id: string;
  iconColor?: string;
  iconName: string;
  trackColor?: string;
  color?: string;
  min?: number;
  max?: number;
  value?: number;
}

export const hudStateListIds = atom<HudStateAtomParam[]>({
  key: 'hudCircleAtomsIDs',
  default: [],
});

export const circleHudValues = atomFamily<number, string>({
  key: 'hudCircleAtoms',
  default: 100,
});

export const useHealthValue = () => useRecoilValue(hudState.health);
export const useSetHealth = () => useSetRecoilState(hudState.health);

export const useArmorValue = () => useRecoilValue(hudState.armor);
export const useSetArmor = () => useSetRecoilState(hudState.armor);
