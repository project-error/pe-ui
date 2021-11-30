import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainWrapper from './components/MainWrapper';
import { ChakraProvider } from '@chakra-ui/react';
import { customTheme } from './styles/theme';
import { TextPromptProvider } from './providers/TextPromptProvider';
import { RecoilRoot } from 'recoil';
import { registerBrowserFuncs } from './utils/registerBrowserFuncs';
import { isEnvBrowser } from './utils/misc';
import { AlertDialogProvider } from './providers/AlertDialogProvider';

// Register window helper functions in browser
// to replicate lua behavior
registerBrowserFuncs();

if (isEnvBrowser() && process.env.NODE_ENV === 'development') {
  const root = document.getElementById('root');

  root!.style.backgroundImage = 'url("./build/assets/img/p.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider theme={customTheme}>
        <TextPromptProvider>
          <AlertDialogProvider>
            <MainWrapper />
          </AlertDialogProvider>
        </TextPromptProvider>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
