import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { usePromptCtx } from '../providers/TextPromptProvider';

export const TextPrompt: React.FC = () => {
  const { handleClosePrompt, promptInfo, visible, handleSubmitPrompt } =
    usePromptCtx();

  const [promptVal, setPromptVal] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitPrompt(promptInfo.id, promptVal);
    setPromptVal('');
  };

  const handleClose = () => {
    handleClosePrompt(promptInfo.id);
    setPromptVal('');
  };

  const initRef = useRef(null);

  return (
    <Modal
      isOpen={visible}
      closeOnEsc={!!promptInfo.isClosable}
      closeOnOverlayClick={false}
      onClose={handleClose}
      initialFocusRef={initRef}
      isCentered
      size='xl'
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>{promptInfo.title}</ModalHeader>
          {promptInfo?.isClosable && <ModalCloseButton />}
          <ModalBody pb={3}>
            <Box pb={4}>
              <Text size='md'>{promptInfo.description}</Text>
            </Box>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                fontSize='1.2em'
                children={<EditIcon />}
              />
              <Input
                ref={initRef}
                placeholder={promptInfo.placeholder}
                value={promptVal}
                onChange={e => setPromptVal(e.target.value)}
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              disabled={!promptVal.length}
              type='submit'
            >
              Submit
            </Button>
            {promptInfo?.isClosable && (
              <Button ml={3} onClick={handleClose}>
                Cancel
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
