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
import { useNuiEvent } from '../../../hooks/useNuiEvent';
import { fetchNui } from '../../../utils/fetchNui';
import { MainSettings } from '../pages/MainSettings';
import { SecondarySettings } from '../pages/SecondarySettings';
import { OtherSettings } from '../pages/OtherSettings';

export const SettingsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNui('requestFocus', isOpen, {});
  }, [isOpen]);

  useNuiEvent<boolean>('setSettingsVisible', bool => {
    setIsOpen(bool);
  });

  const handleClose = () => {
    fetchNui('settingsModalClosed', undefined, {});
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnEsc={true}
      size='3xl'
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalContent minH={400} py={6} bgColor={'gray.800'}>
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
