import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const baseState = {
  settingsVisible: atom({
    key: 'visible',
    default: false,
  }),
};

export const useSetSettingsVisible = () =>
  useSetRecoilState(baseState.settingsVisible);
export const useSettingsVisibleValue = () =>
  useRecoilValue(baseState.settingsVisible);
