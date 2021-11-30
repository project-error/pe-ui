import React, { createContext, useCallback, useContext } from 'react';
import { ToastId, ToastOptions, useToast } from '@chakra-ui/react';
import { useNuiEvent } from '../hooks/useNuiEvent';

export interface ToastOpts {
  position?: ToastOptions['position'];
  status?: 'success' | 'error' | 'warning' | 'info';
  id: ToastOptions['id'];
  message: string;
  title?: string;
}

export interface AddToastOptions {
  position?: ToastOptions['position'];
  status?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  duration?: number;
}

interface ToastCtxValue {
  addPersistentToast: (toastOpts: ToastOpts) => void;
  clearPersistentToast: (id: ToastOptions['id']) => void;
  addToast: (opts: AddToastOptions) => void;
}

const ToastCtx = createContext<null | ToastCtxValue>(null);

//
// debugData<ToastOpts>([
//   {
//     action: 'addPersistentToast',
//     data: {
//       id: 'niceToast',
//       position: 'top-right',
//       status: 'error',
//       message: 'Uh oh spaghettios',
//     },
//   },
// ]);

export const ToastProvider: React.FC = ({ children }) => {
  const toast = useToast();

  const addPersistentToast = useCallback(
    (toastOpts: ToastOpts) => {
      toast({
        id: toastOpts.id,
        title: toastOpts.title,
        description: toastOpts.message,
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

  const addToast = useCallback(
    (toastOpts: AddToastOptions) => {
      toast({
        position: toastOpts.position,
        isClosable: false,
        title: toastOpts.title,
        description: toastOpts.message,
        status: toastOpts.status,
        duration: toastOpts.duration,
      });
    },
    [toast]
  );

  const closeAllToasts = useCallback(() => {
    toast.closeAll();
  }, [toast]);

  useNuiEvent<AddToastOptions>('addToast', addToast);
  useNuiEvent<ToastOpts>('addPersistentToast', addPersistentToast);
  useNuiEvent<ToastId>('clearPersistentToast', clearPersistentToast);
  useNuiEvent<ToastId>('closeAllToasts', closeAllToasts);

  return (
    <ToastCtx.Provider
      value={{ addPersistentToast, clearPersistentToast, addToast }}
    >
      {children}
    </ToastCtx.Provider>
  );
};

// @ts-ignore
export const useAlertProvider = () => useContext<ToastCtxValue>(ToastCtx);
