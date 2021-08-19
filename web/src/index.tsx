import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainWrapper from './components/MainWrapper';
import { ChakraProvider } from '@chakra-ui/react';
import { customTheme } from './styles/theme';
import { TextPromptProvider } from './providers/TextPromptProvider';
import { RecoilRoot } from 'recoil';
import { registerBrowserFuncs } from './utils/registerBrowserFuncs';

// Register window helper functions in browser
// to replicate lua behavior
registerBrowserFuncs();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider theme={customTheme}>
        <TextPromptProvider>
          <MainWrapper />
        </TextPromptProvider>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
