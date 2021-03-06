import React from 'react';
import { Box, Center, Flex, Heading, Switch, Text } from '@chakra-ui/react';

interface SettingSwitchProps {
  title: string;
  desc: string;
  value: boolean;
  handler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SettingSwitch: React.FC<SettingSwitchProps> = ({
  title,
  desc,
  value,
  handler,
}) => (
  <Box p={5} shadow='md' borderWidth='2px' borderRadius='md'>
    <Flex>
      <Box flex={1} w='75%'>
        <Heading fontSize='l'>{title}</Heading>
        <Text mt={2} color='gray.400'>
          {desc}
        </Text>
      </Box>
      <Center w='25%' justifyContent='flex-end'>
        <Switch size='md' isChecked={value} onChange={handler} />
      </Center>
    </Flex>
  </Box>
);
