import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainWrapper from './components/MainWrapper';
import { ChakraProvider } from '@chakra-ui/react';
import { customTheme } from './styles/theme';
import { TextPromptProvider } from './providers/TextPromptProvider';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <TextPromptProvider>
        <MainWrapper />
      </TextPromptProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
