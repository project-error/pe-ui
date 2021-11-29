import {
  atom,
  DefaultValue,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { defaultSettings } from '../config/defaultSettings';
import { getResourceName, isEnvBrowser } from '../utils/misc';
import { UserSettings } from '../types/settings.types';
import { fetchNui } from '../utils/fetchNui';

// Cant be othered to type this right now, doesnt matter anyways
const localStorageEffect =
  (key: string) =>
  // @ts-ignore
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
      console.log('updating settings in lua');
      fetchNui('userSettingsUpdated', savedValue, {}).catch();
    }

    // @ts-ignore
    onSet(newValue => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        fetchNui('userSettingsUpdated', newValue, {}).catch();
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const mergeSettings = (
  oldSettings: UserSettings,
  newSettings: Partial<UserSettings>
) => ({ ...oldSettings, ...newSettings });

const currentSettings = atom<UserSettings>({
  key: 'userSettings',
  effects_UNSTABLE: [
    localStorageEffect('PE-UI'),
    ({ onSet }) => {
      onSet(settingData => fetchNui('userSettingsUpdated', settingData, {}));
    },
  ],
  default: selector({
    key: 'defaultUserSettings',
    get: async () => {
      try {
        if (isEnvBrowser()) return defaultSettings;

        const resName = getResourceName();
        const resp = await fetch(`https://cfx-nui-${resName}/config.json`, {
          method: 'GET',
        });
        const formatResp: UserSettings = (await resp.json()).defaultHUDSettings;
        return formatResp;
      } catch (e) {
        return defaultSettings;
      }
    },
  }),
});

export const useSettings = () => useRecoilState(currentSettings);
export const useSettingsValue = () => useRecoilValue(currentSettings);
export const useSetSettings = () => useSetRecoilState(currentSettings);
