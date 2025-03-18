import React, { useEffect } from "react";
import { PromptInputProps } from "../types";

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt }) => {
  useEffect(() => {
    const storedPrompt = localStorage.getItem("prompt");
    if (storedPrompt) {
      setPrompt(storedPrompt);
    }
  }, [setPrompt]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPrompt = e.target.value;
    setPrompt(newPrompt);
    localStorage.setItem("prompt", newPrompt);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Paraphrasing Prompt
      </label>
      <textarea
        value={prompt}
        onChange={handlePromptChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
        rows={4}
        placeholder="Enter the instructions for paraphrasing"
      />
      <p className="text-xs text-gray-500 mt-1">
        Edit this prompt to customize how your document will be paraphrased.
      </p>
    </div>
  );
};

export default PromptInput;
