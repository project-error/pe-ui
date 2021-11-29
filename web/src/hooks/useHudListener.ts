import {
  circleHudValues,
  HudStateAtomParam,
  hudStateListIds,
  useSetArmor,
  useSetHealth,
} from '../state/hud.state';
import { useNuiEvent } from './useNuiEvent';
import { useSetPauseActive } from '../state/base.state';
import { useRecoilCallback } from 'recoil';

export const useHudListener = () => {
  const setHealth = useSetHealth();
  const setArmor = useSetArmor();
  const setPauseStatus = useSetPauseActive();

  const createHudCircle = useRecoilCallback(
    ({ set }) =>
      (opts: HudStateAtomParam) => {
        set(hudStateListIds, curState => [...curState, { ...opts }]);
        set(circleHudValues(opts.id), opts.value ?? 100);
      },
    []
  );

  useNuiEvent('setHealth', setHealth);
  useNuiEvent('setArmor', setArmor);
  useNuiEvent('setPauseActive', setPauseStatus);
  useNuiEvent('addCircleItem', createHudCircle);
};
