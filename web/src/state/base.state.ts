import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const baseState = {
  settingsVisible: atom({
    key: 'visible',
    default: false,
  }),
  isPauseActive: atom({
    key: 'pauseActive',
    default: false,
  }),
};

export const useSetSettingsVisible = () =>
  useSetRecoilState(baseState.settingsVisible);
export const useSettingsVisibleValue = () =>
  useRecoilValue(baseState.settingsVisible);

export const usePauseActiveValue = () =>
  useRecoilValue(baseState.isPauseActive);
export const useSetPauseActive = () =>
  useSetRecoilState(baseState.isPauseActive);
