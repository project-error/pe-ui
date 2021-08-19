import { Delay, isEnvBrowser } from './misc';
import { debugData } from './debugData';
import { PromptInfo } from '../types/prompt.types';

(window as any).pe = {};

const castWindow = (window as any).pe;

// Just a simple function that will attach useful window functions whenever
// in browser (makes it easy to mock Lua actions).
export const registerBrowserFuncs = async () => {
  if (!isEnvBrowser()) return;

  castWindow.dispatchNuiEvent = (action: string, data: any) => {
    debugData([
      {
        data,
        action,
      },
    ]);
  };

  castWindow.openSettings = (bool: boolean) => {
    castWindow.dispatchNuiEvent('setSettingsVisible', bool);
  };

  castWindow.setArmor = (amount: number) => {
    castWindow.dispatchNuiEvent('setArmor', amount);
  };

  castWindow.setHealth = (amount: number) => {
    castWindow.dispatchNuiEvent('setHealth', amount);
  };

  castWindow.toggleOnVoice = (toggledOn: boolean) => {
    castWindow.dispatchNuiEvent('setIsTalking', toggledOn);
  };

  castWindow.switchVoiceMode = (voiceMode: number) => {
    castWindow.dispatchNuiEvent('setVoiceRange', voiceMode);
  };

  castWindow.toggleCMode = (bool: boolean) => {
    castWindow.dispatchNuiEvent('cinematicModeToggle', bool);
  };

  castWindow.openPrompt = (promptData: PromptInfo) => {
    castWindow.dispatchNuiEvent('openPrompt', promptData);
  };

  castWindow.closePrompt = (promptId: string) => {
    castWindow.dispatchNuiEvent('closePrompt', promptId);
  };

  await Delay(100);

  console.log(
    '%cBrowser Commands',
    'color: green; font-size: 30px; font-weight: bold;'
  );

  console.log('%cTrigger using pe.FUNC_NAME', 'color: green; font-size: 15px');

  console.dir(castWindow);
};
