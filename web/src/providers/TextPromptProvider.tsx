import React, {
  Context,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { fetchNui } from '../utils/fetchNui';
import { useNuiEvent } from '../hooks/useNuiEvent';

interface PromptCtxValue {
  visible: boolean;
  promptInfo: PromptInfo;
  openPrompt: (info: PromptInfo) => void;
  handleSubmitPrompt: (promptId: string, content: string) => void;
  handleClosePrompt: (promptId: string) => void;
}

interface PromptInfo {
  placeholder: string;
  description: string;
  id: string;
  title: string;
}

const TextPromptCtx = createContext<PromptCtxValue | null>(null);

export const usePromptCtx = () =>
  useContext<PromptCtxValue>(TextPromptCtx as Context<PromptCtxValue>);

const defaultPromptValue: PromptInfo = {
  placeholder: 'placeholder text',
  description: 'adadadadadadadadadadadadadadada',
  id: '132131',
  title: 'adada',
};

export const TextPromptProvider: React.FC = ({ children }) => {
  const [promptVisible, setPromptVisible] = useState(true);
  const [promptInfo, setPromptInfo] = useState<PromptInfo>(defaultPromptValue);

  const openPrompt = useCallback((promptInfo: PromptInfo) => {
    setPromptInfo(promptInfo);
    setPromptVisible(true);
  }, []);

  const handleSubmitPrompt = useCallback(
    (promptId: string, content: string) => {
      fetchNui('submitPrompt', { promptId, content }).then(() => {
        setPromptVisible(false);
        setPromptInfo(defaultPromptValue);
      });
    },
    []
  );

  const handleClosePrompt = useCallback((promptId: string) => {
    setPromptVisible(false);
    setPromptInfo(defaultPromptValue);
  }, []);

  useNuiEvent<PromptInfo>('openPrompt', promptInfo => {
    openPrompt(promptInfo);
  });

  useNuiEvent<string>('closePrompt', promptId => {});

  return (
    <TextPromptCtx.Provider
      value={{
        visible: promptVisible,
        promptInfo,
        openPrompt,
        handleSubmitPrompt,
        handleClosePrompt,
      }}
    >
      {children}
    </TextPromptCtx.Provider>
  );
};
