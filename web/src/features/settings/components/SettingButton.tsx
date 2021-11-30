import {
  Box,
  Button,
  ButtonProps,
  Center,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import React from 'react';

interface SettingButtonProps extends ButtonProps {
  title: string;
  desc: string;
  buttonText: string;
  handler: () => void;
}

export const SettingButton: React.FC<SettingButtonProps> = ({
  title,
  desc,
  buttonText,
  handler,
  ...props
}) => {
  return (
    <Box p={5} shadow='md' borderWidth='2px' borderRadius='md'>
      <Flex>
        <Box w='75%'>
          <Heading fontSize='l'>{title}</Heading>
          <Text mt={2} color='gray.400'>
            {desc}
          </Text>
        </Box>
        <Center w='25%'>
          <Button {...props} onClick={() => handler()}>
            {buttonText}
          </Button>
        </Center>
      </Flex>
    </Box>
  );
};
