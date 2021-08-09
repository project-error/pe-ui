import React, {useEffect, useRef, useState} from 'react';
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

  const handleSubmit = () => {
    handleSubmitPrompt(promptInfo.id, promptVal);
  };

  const initRef = useRef(null);

  return (
    <Modal
      isOpen={visible}
      onClose={() => handleClosePrompt(promptInfo.id)}
      initialFocusRef={initRef}
      isCentered
      size='xl'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{promptInfo.title}</ModalHeader>
        <ModalCloseButton />
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
            mr={3}
            onClick={handleSubmit}
            disabled={!promptVal.length}
          >
            Submit
          </Button>
          <Button onClick={() => handleClosePrompt(promptInfo.id)}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
