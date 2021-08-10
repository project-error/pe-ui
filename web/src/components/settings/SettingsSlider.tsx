import React from 'react';
import {
  Box,
  Center,
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';

interface SettingsSliderProps {
  title: string;
  desc: string;
  value?: number;
  handler?: (val: number) => void;
}

export const SettingsSlider: React.FC<SettingsSliderProps> = ({
  title,
  desc,
  value,
  handler,
}) => (
  <Box p={5} shadow='md' borderWidth='2px' borderRadius='md'>
    <Flex>
      <Box w='70%'>
        <Heading fontSize='l'>{title}</Heading>
        <Text mt={2}>{desc}</Text>
      </Box>
      <Center w='30%'>
        <Slider defaultValue={value} onChange={handler}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Center>
    </Flex>
  </Box>
);
