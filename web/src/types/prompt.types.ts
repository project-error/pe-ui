export interface PromptCtxValue {
  visible: boolean;
  promptInfo: PromptInfo;
  openPrompt: (info: PromptInfo) => void;
  handleSubmitPrompt: (promptId: string, content: string) => void;
  handleClosePrompt: (promptId: string) => void;
}

export interface PromptInfo {
  placeholder?: string;
  description: string;
  id: string;
  title: string;
  isClosable?: boolean;
}
