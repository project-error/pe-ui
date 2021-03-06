import { UserSettings } from '../types/settings.types';

// We use these default settings in browser
export const defaultSettings: UserSettings = {
  cinematicBars: false,
  screenshotMode: false,
  crosshairEnabled: false,
  crosshairColor: '#00ff04',
  crosshairSize: 1,
  statusCirclesLocation: 'bottom-right',
  voiceUpdateInterval: 100,
  cinematicBarSize: 50,
  healthArmorInterval: 100,
};
