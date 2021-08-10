import React from 'react';
import { Box, Center, Flex, Heading, Input, Text } from '@chakra-ui/react';

interface SettingInputProps {
  title: string;
  desc: string;
}

export const SettingInput: React.FC<SettingInputProps> = ({ title, desc }) => (
  <Box p={5} shadow='md' borderWidth='2px' borderRadius='md'>
    <Flex>
      <Box w='85%'>
        <Heading fontSize='l'>{title}</Heading>
        <Text mt={2}>{desc}</Text>
      </Box>
      <Center w='15%'>
        <Input
          type={'number'}
          defaultValue={15}
          justifyContent='center'
          textAlign='center'
        />
      </Center>
    </Flex>
  </Box>
);
