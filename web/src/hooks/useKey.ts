import { useEffect } from 'react';

export const useKey = (key: string, handler: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      if (e.key === key) handler(e);
    };

    window.addEventListener('keydown', downHandler);

    return () => window.removeEventListener('keydown', downHandler);
  }, [handler, key]);
};
