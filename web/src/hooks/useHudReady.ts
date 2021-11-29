import { useEffect } from 'react';
import { fetchNui } from '../utils/fetchNui';

export const useHudReady = () => {
  useEffect(() => {
    fetchNui('nuiReadyForMessages', undefined, {});
  }, []);
};
