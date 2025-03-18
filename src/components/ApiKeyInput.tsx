import React, { useState, useEffect } from "react";
import { ApiKeyInputProps } from "../types";

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey }) => {
  const [showApiKey, setShowApiKey] = useState<boolean>(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, [setApiKey]);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    localStorage.setItem("apiKey", newApiKey);
  };

  return (
    <div className="mb-4">
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
      <p className="text-xs text-gray-500 mt-1">
        Your API key is used only for requests to OpenAI and is not stored.
      </p>
    </div>
  );
};

export default ApiKeyInput;
