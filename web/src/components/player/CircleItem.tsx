import React from 'react';
import {
  CircularProgress,
  CircularProgressLabel,
  Fade,
  Icon,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { CircularProgressProps } from '@chakra-ui/progress/dist/types/circular-progress';
import { Token } from '@chakra-ui/styled-system/dist/types/utils';
import * as CSS from 'csstype';

interface CircleItemProps extends CircularProgressProps {
  icon: IconType;
  iconColor: Token<CSS.Property.Color, 'colors'>;
  value: number;
  hideWhenZero?: boolean;
}

export const CircleItem: React.FC<CircleItemProps> = ({
  icon,
  value,
  iconColor,
  hideWhenZero,
  ...props
}) => {
  return (
    <Fade in={hideWhenZero ? value !== 0 : true} unmountOnExit>
      <CircularProgress
        value={value}
        color={props.color || 'white'}
        bg={'gray.800'}
        capIsRound
        rounded={100}
        {...props}
      >
        <CircularProgressLabel>
          {<Icon as={icon} w={5} h={5} color={iconColor} />}
        </CircularProgressLabel>
      </CircularProgress>
    </Fade>
  );
};
