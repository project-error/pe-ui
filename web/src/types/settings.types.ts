export type ValidStatusLocations =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'top-left'
  | 'top-right';

export interface UserSettings {
  cinematicBars: boolean;
  cinematicBarSize: number;
  screenshotMode: boolean;
  statusCirclesLocation: ValidStatusLocations;
  voiceUpdateInterval: number;
  healthArmorInterval: number;
}
