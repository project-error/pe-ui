import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

interface AlertDialogCtxValue {
  dialog: OpenAlertOpts | null;
  openAlertDialog: (opts: OpenAlertOpts) => void;
}

export const AlertDialogCtx = createContext<AlertDialogCtxValue>(null as any);

interface OpenAlertOpts {
  message: string;
  title: string;
  confirmBtnText: string;
  onConfirm: () => void;
}

export const AlertDialogProvider: React.FC = ({ children }) => {
  const [dialogState, setDialogState] = useState<OpenAlertOpts | null>(null);
  const [visible, setVisible] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const openAlertDialog = useCallback(
    ({ title, message, onConfirm, confirmBtnText }: OpenAlertOpts) => {
      setDialogState({
        title,
        message,
        onConfirm,
        confirmBtnText,
      });

      setVisible(true);
    },
    []
  );

  const handleClose = () => {
    setVisible(false);
    setDialogState(null);
  };

  const handleCleanUp = () => {
    dialogState?.onConfirm();
    handleClose();
  };

  return (
    <AlertDialogCtx.Provider
      value={{
        openAlertDialog,
        dialog: dialogState,
      }}
    >
      <AlertDialog
        isCentered
        leastDestructiveRef={cancelRef}
        isOpen={visible}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bgColor='gray.800'>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {dialogState?.title}
            </AlertDialogHeader>

            <AlertDialogBody>{dialogState?.message}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleCleanUp} ml={3}>
                {dialogState?.confirmBtnText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {children}
    </AlertDialogCtx.Provider>
  );
};

export const useAlertDialog = () => useContext(AlertDialogCtx);
