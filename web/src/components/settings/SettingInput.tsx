import React, { useState } from 'react';
import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { noop } from '../../utils/misc';
import { useAlertProvider } from '../../providers/ToastProvider';

interface SettingInputProps {
  title: string;
  desc: string;
  value: number;
  handler?: (val: number) => void;
}

export const SettingInput: React.FC<SettingInputProps> = ({
  title,
  value,
  desc,
  handler = noop,
}) => {
  const { addToast } = useAlertProvider();

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    const parsedInt = parseInt(e.target.value);
    if (parsedInt === value) return;

    addToast({
      message: 'Saved new value!',
      position: 'bottom',
      status: 'success',
    });

    handler(parsedInt);
  };

  return (
    <Box p={5} shadow='md' borderWidth='2px' borderRadius='md'>
      <Flex>
        <Box w='85%'>
          <Heading fontSize='l'>{title}</Heading>
          <Text mt={2} color='gray.400'>
            {desc}
          </Text>
        </Box>
        <Center w='15%'>
          <Input
            onBlur={handleBlur}
            defaultValue={value}
            type={'number'}
            justifyContent='center'
            textAlign='center'
          />
        </Center>
      </Flex>
    </Box>
  );
};
