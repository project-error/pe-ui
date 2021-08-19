import { useSetArmor, useSetHealth } from '../state/hud.state';
import { useNuiEvent } from './useNuiEvent';
import { useSetPauseActive } from '../state/base.state';

export const useHudListener = () => {
  const setHealth = useSetHealth();
  const setArmor = useSetArmor();
  const setPauseStatus = useSetPauseActive();

  useNuiEvent('setHealth', setHealth);
  useNuiEvent('setArmor', setArmor);
  useNuiEvent('setPauseActive', setPauseStatus);
};
