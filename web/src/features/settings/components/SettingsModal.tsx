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
import { VisualSettings } from '../pages/VisualSettings';
import { AdditionalSettings } from '../pages/AdditionalSettings';
import { PerformanceSettings } from '../pages/PerformanceSettings';

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
      id='settings-modal'
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
              <Tab>Visual Settings</Tab>
              <Tab>Performance Settings</Tab>
              <Tab>Additional Settings</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VisualSettings />
              </TabPanel>
              <TabPanel>
                <PerformanceSettings />
              </TabPanel>
              <TabPanel>
                <AdditionalSettings />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
