export interface DocumentContent {
  content: string;
  fileName: string;
}

export interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
}

export interface PromptInputProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

export interface DocumentUploaderProps {
  onUpload: (content: string, fileName: string) => void;
}

export interface DocumentPreviewProps {
  originalContent: DocumentContent | null;
  latexContent: string | null;
  loading: boolean;
}

export interface OpenAiInputProps {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
  model: string;
  setModel: (model: string) => void;
}
