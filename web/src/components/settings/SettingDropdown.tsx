import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { noop } from '../../utils/misc';
import { FaChevronDown } from 'react-icons/fa';

interface SettingDropdownProps {
  title: string;
  desc: string;
  value: string;
  options: string[];
  handler?: (val: string) => void;
}

export const SettingDropdown: React.FC<SettingDropdownProps> = ({
  title,
  value,
  desc,
  options,
  handler = noop,
}) => {
  return (
    <Box p={5} shadow='md' borderWidth='2px' borderRadius='md'>
      <Flex>
        <Box w='85%'>
          <Heading fontSize='l'>{title}</Heading>
          <Text mt={2} color='gray.400'>
            {desc}
          </Text>
        </Box>
        <Center w='25%'>
          <Menu>
            <MenuButton as={Button} rightIcon={<FaChevronDown />}>
              {value}
            </MenuButton>
            <MenuList>
              {options.map(opt => (
                <MenuItem key={opt} onClick={() => handler(opt)}>
                  {opt}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Center>
      </Flex>
    </Box>
  );
};
