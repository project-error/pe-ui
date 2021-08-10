import {
  atom,
  DefaultValue,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { defaultSettings } from '../config/defaultSettings';

// Cant be othered to type this right now, doesnt matter anyways
const localStorageEffect =
  (key: string) =>
  // @ts-ignore
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    // @ts-ignore
    onSet(newValue => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

const currentSettings = atom({
  key: 'userSettings',
  effects_UNSTABLE: [localStorageEffect('PE-UI')],
  default: defaultSettings,
});

export const useSettings = () => useRecoilState(currentSettings);
export const useSettingsValue = () => useRecoilValue(currentSettings);
export const useSetSettings = () => useSetRecoilState(currentSettings);
