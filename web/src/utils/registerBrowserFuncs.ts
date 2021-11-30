import { Delay, isEnvBrowser } from './misc';
import { debugData } from './debugData';
import { PromptInfo } from '../types/prompt.types';
import { HudStateAtomParam } from '../state/hud.state';
import { AddToastOptions, ToastOpts } from '../providers/ToastProvider';
import { ToastId } from '@chakra-ui/react';

(window as any).pe = {};

const castWindow = (window as any).pe;

function dispatchNuiEvent<T = any>(action: string, data: T) {
  window.dispatchEvent(
    new MessageEvent('message', {
      data: {
        action,
        data,
      },
    })
  );
}

// Just a simple function that will attach useful window functions whenever
// in browser (makes it easy to mock Lua actions).
export const registerBrowserFuncs = async () => {
  if (!isEnvBrowser()) return;

  castWindow.dispatchNuiEvent = dispatchNuiEvent;

  castWindow.addCircleItem = () => {
    debugData<HudStateAtomParam>([
      {
        data: {
          id: 'oxygen',
          value: 100,
          iconName: 'FaSwimmer',
        },
        action: 'addCircleItem',
      },
    ]);
  };

  castWindow.openSettings = (bool: boolean) => {
    dispatchNuiEvent('setSettingsVisible', bool);
  };

  castWindow.setArmor = (amount: number) => {
    dispatchNuiEvent('setArmor', amount);
  };

  castWindow.testNotifications = async () => {
    dispatchNuiEvent<AddToastOptions>('addToast', {
      message: 'This is my toast description',
      position: 'top-right',
      duration: 5000,
      status: 'success',
    });

    dispatchNuiEvent<AddToastOptions>('addToast', {
      message: 'This is my toast description',
      title: 'Title test',
      position: 'top-left',
      duration: 5000,
      status: 'success',
    });

    dispatchNuiEvent<AddToastOptions>('addToast', {
      message: 'This is my toast description',
      title: 'Title test',
      position: 'top',
      duration: 5000,
      status: 'error',
    });

    dispatchNuiEvent<AddToastOptions>('addToast', {
      message: 'Error test',
      title: 'Title test',
      position: 'top-right',
      duration: 5000,
      status: 'error',
    });

    dispatchNuiEvent<AddToastOptions>('addToast', {
      message: 'warning test',
      title: 'Title test',
      position: 'bottom-right',
      duration: 5000,
      status: 'warning',
    });

    await Delay(3000);

    dispatchNuiEvent<AddToastOptions>('addToast', {
      message: 'Error test',
      title: 'Title test',
      position: 'top-left',
      duration: 3000,
      status: 'info',
    });

    await Delay(1000);

    dispatchNuiEvent<AddToastOptions>('addToast', {
      message: 'Nice test',
      title: 'Title test',
      position: 'bottom-left',
      duration: 3000,
      status: 'info',
    });
  };

  castWindow.testPersistentNotis = () => {
    dispatchNuiEvent<ToastOpts>('addPersistentToast', {
      id: 'myPersistentNoti',
      message: 'Persistent notification test',
      position: 'top-right',
    });

    dispatchNuiEvent<ToastOpts>('addPersistentToast', {
      id: 'myPersistentNoti2',
      message: 'Persistent notification test',
      position: 'top-left',
    });
  };

  castWindow.clearPersistentNotis = () => {
    dispatchNuiEvent<ToastId>('clearPersistentToast', 'myPersistentNoti');
    dispatchNuiEvent<ToastId>('clearPersistentToast', 'myPersistentNoti2');
  };

  castWindow.setHealth = (amount: number) => {
    dispatchNuiEvent('setHealth', amount);
  };

  castWindow.toggleOnVoice = (toggledOn: boolean) => {
    dispatchNuiEvent('setIsTalking', toggledOn);
  };

  castWindow.switchVoiceMode = (voiceMode: number) => {
    dispatchNuiEvent('setVoiceRange', voiceMode);
  };

  castWindow.toggleCMode = (bool: boolean) => {
    dispatchNuiEvent('cinematicModeToggle', bool);
  };

  castWindow.openPrompt = (promptData: PromptInfo) => {
    dispatchNuiEvent('openPrompt', promptData);
  };

  castWindow.closePrompt = (promptId: string) => {
    dispatchNuiEvent('closePrompt', promptId);
  };

  await Delay(100);

  console.log(
    '%cBrowser Commands',
    'color: green; font-size: 30px; font-weight: bold;'
  );

  console.log('%cTrigger using pe.FUNC_NAME', 'color: green; font-size: 15px');

  console.dir(castWindow);
};
