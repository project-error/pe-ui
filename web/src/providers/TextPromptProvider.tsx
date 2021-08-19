import React, {
  Context,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchNui } from '../utils/fetchNui';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { PromptCtxValue, PromptInfo } from '../types/prompt.types';

const TextPromptCtx = createContext<PromptCtxValue | null>(null);

export const usePromptCtx = () =>
  useContext<PromptCtxValue>(TextPromptCtx as Context<PromptCtxValue>);

const defaultPromptValue: PromptInfo = {
  placeholder: 'Enter here',
  description: 'adadadadadadadadadadadadadadada',
  id: '132131',
  title: 'adada',
  isClosable: true,
};

export const TextPromptProvider: React.FC = ({ children }) => {
  const [promptVisible, setPromptVisible] = useState(false);
  const [promptInfo, setPromptInfo] = useState<PromptInfo>(defaultPromptValue);

  useEffect(() => {
    fetchNui('requestFocus', promptVisible);
  }, [promptVisible]);

  const openPrompt = useCallback((promptInfo: PromptInfo) => {
    setPromptInfo(promptInfo);
    setPromptVisible(true);
  }, []);

  const handleSubmitPrompt = useCallback(
    (promptId: string, content: string) => {
      fetchNui(`promptNuiResp-${promptId}`, ['submitted', content]);
      setPromptVisible(false);
    },
    []
  );

  const handleClosePrompt = useCallback((promptId: string) => {
    setPromptVisible(false);
    setPromptInfo(defaultPromptValue);
    fetchNui(`promptNuiResp-${promptId}`, ['closed', null]);
  }, []);

  useNuiEvent<PromptInfo>('openPrompt', openPrompt);

  useNuiEvent<string>('closePrompt', handleClosePrompt);

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
