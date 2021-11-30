import React from 'react';
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { noop } from '../../../utils/misc';

interface SettingColorPickerProps {
  title: string;
  desc: string;
  value: string;
  handler?: (val: string) => void;
}

export const SettingColorPicker: React.FC<SettingColorPickerProps> = ({
  title,
  value,
  desc,
  handler = noop,
}) => (
  <Box p={5} shadow='md' borderWidth='2px' borderRadius='md'>
    <Flex>
      <Box w='85%'>
        <Heading fontSize='l'>{title}</Heading>
        <Text mt={2} color='gray.400'>
          {desc}
        </Text>
      </Box>
      <Center w='15%'>
        <input
          onChange={e => handler(e.target.value)}
          defaultValue={value}
          type={'color'}
        />
      </Center>
    </Flex>
  </Box>
);
