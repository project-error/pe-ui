import React from 'react';
import { Box } from '@chakra-ui/react';
import { TextPrompt } from './TextPrompt';

const MainWrapper: React.FC = () => {
  return (
    <Box h='100%' w='100%' p={4} bg='none'>
      <TextPrompt />
    </Box>
  );
};

export default MainWrapper;
