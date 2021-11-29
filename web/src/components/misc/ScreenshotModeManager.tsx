import React, { useEffect } from 'react';
import { fetchNui } from '../../utils/fetchNui';
import { useSettingsValue } from '../../state/settings.state';

export const ScreenshotModeManager: React.FC = ({ children }) => {
  const { screenshotMode } = useSettingsValue();

  useEffect(() => {
    fetchNui('screenshotModeToggle', screenshotMode, {});
  }, [screenshotMode]);

  return <>{children}</>;
};
