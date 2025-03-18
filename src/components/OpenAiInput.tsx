import React, { useState, useEffect } from "react";
import { OpenAiInputProps } from "../types";

const OpenAiInput: React.FC<OpenAiInputProps> = ({
  apiKey,
  setApiKey,
  model,
  setModel,
}) => {
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [isCustomModel, setIsCustomModel] = useState<boolean>(false);
  const [customModelInput, setCustomModelInput] = useState<string>("");

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    const storedModel = localStorage.getItem("openAiModel") || "gpt-4o";

    if (storedApiKey) {
      setApiKey(storedApiKey);
    }

    if (storedModel) {
      // Check if the stored model is one of our predefined options
      const predefinedModels = [
        "gpt-4o",
        "gpt-4-turbo",
        "gpt-3.5-turbo",
        "gpt-4o-mini",
      ];
      if (!predefinedModels.includes(storedModel)) {
        setIsCustomModel(true);
        setCustomModelInput(storedModel);
      }
      setModel(storedModel);
    }
  }, [setApiKey, setModel]);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    localStorage.setItem("apiKey", newApiKey);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (selectedValue === "other") {
      setIsCustomModel(true);
      // Don't update the actual model yet until user types in custom field
    } else {
      setIsCustomModel(false);
      setModel(selectedValue);
      localStorage.setItem("openAiModel", selectedValue);
    }
  };

  const handleCustomModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const customModel = e.target.value;
    setCustomModelInput(customModel);
    setModel(customModel);
    localStorage.setItem("openAiModel", customModel);
  };

  return (
    <div className="mb-4">
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          OpenAI API Key
        </label>
        <div className="relative">
          <input
            type={showApiKey ? "text" : "password"}
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter your OpenAI API key"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5"
          >
            {showApiKey ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="mb-2">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          OpenAI Model
        </label>
        <select
          value={isCustomModel ? "other" : model}
          onChange={handleModelChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="gpt-4o">GPT-4o (Default)</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4o-mini">GPT-4o Mini</option>
          <option value="other">Other (Custom)</option>
        </select>
      </div>

      {isCustomModel && (
        <div className="mb-2 mt-2">
          <input
            type="text"
            value={customModelInput}
            onChange={handleCustomModelChange}
            placeholder="Enter custom model name (e.g., gpt-4-vision)"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}

      <p className="text-xs text-gray-500 mt-1">
        Your API key and model preference are stored locally in your browser.
      </p>
    </div>
  );
};

export default OpenAiInput;
