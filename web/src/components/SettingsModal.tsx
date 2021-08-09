import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Tab,
  Text,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

export const SettingsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {};

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size='3xl' isCentered>
      <ModalContent minH={400}>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted variant='line'>
            <TabList mb='1em'>
              <Tab>Main Settings</Tab>
              <Tab>Secondary Settings</Tab>
              <Tab>Other Settings</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text>Content of tab 1</Text>
              </TabPanel>
              <TabPanel>
                <Text>Content of tab 2</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
