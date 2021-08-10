import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import { MainSettings } from './MainSettings';
import { SecondarySettings } from './SecondarySettings';
import { OtherSettings } from './OtherSettings';

export const SettingsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    fetchNui('requestFocus', isOpen);
  }, [isOpen]);

  useNuiEvent<boolean>('setSettingsVisible', bool => {
    setIsOpen(bool);
  });

  const handleClose = () => {
    fetchNui('settingsModalClosed');
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size='3xl'
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalContent minH={400} py={6}>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted variant='line'>
            <TabList>
              <Tab>Main Settings</Tab>
              <Tab>Secondary Settings</Tab>
              <Tab>Other Settings</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <MainSettings />
              </TabPanel>
              <TabPanel>
                <SecondarySettings />
              </TabPanel>
              <TabPanel>
                <OtherSettings />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
