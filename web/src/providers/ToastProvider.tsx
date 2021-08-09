import React, { createContext, useCallback } from 'react';
import { ToastId, ToastOptions, useToast } from '@chakra-ui/react';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { debugData } from '../utils/debugData';

interface ToastOpts {
  position: ToastOptions['position'];
  status?: 'success' | 'error' | 'warning' | 'info';
  id: ToastOptions['id'];
  description: string;
}

interface ToastCtxValue {
  addPersistentToast: (toastOpts: ToastOpts) => void;
  clearPersistentToast: (id: ToastOptions['id']) => void;
}

const ToastCtx = createContext<null | ToastCtxValue>(null);

debugData<ToastOpts>([
  {
    action: 'addPersistentToast',
    data: {
      id: 'niceToast',
      position: 'top-right',
      status: 'error',
      description: 'You fucking suck',
    },
  },
]);

export const ToastProvider: React.FC = ({ children }) => {
  const toast = useToast();

  const addPersistentToast = useCallback(
    (toastOpts: ToastOpts) => {
      toast({
        id: toastOpts.id,
        description: toastOpts.description,
        position: toastOpts.position,
        status: toastOpts.status,
        isClosable: false,
        duration: null,
      });
    },
    [toast]
  );

  const clearPersistentToast = useCallback(
    (toastId: ToastId) => {
      toast.close(toastId);
    },
    [toast]
  );

  useNuiEvent<ToastOpts>('addPersistentToast', addPersistentToast);
  useNuiEvent<ToastId>('clearPersistentToast', clearPersistentToast);

  return (
    <ToastCtx.Provider value={{ addPersistentToast, clearPersistentToast }}>
      {children}
    </ToastCtx.Provider>
  );
};
