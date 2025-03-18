import React, { useState } from "react";
import DocumentUploader from "./components/DocumentUploader";
import OpenAiInput from "./components/OpenAiInput";
import PromptInput from "./components/PromptInput";
import DocumentPreview from "./components/DocumentPreview";
import { DocumentContent } from "./types";
import { extractLatexContent } from "./utils/responseParser";
import OpenAI from "openai";
import "./App.css";

function App() {
  const [apiKey, setApiKey] = useState<string>("");
  const [model, setModel] = useState<string>("gpt-4o");
  const [prompt, setPrompt] = useState<string>(
    "Paraphrase the following document into academic language, maintaining the structure and formatting. Return the result in LaTeX format."
  );
  const [originalContent, setOriginalContent] =
    useState<DocumentContent | null>(null);
  const [latexContent, setLatexContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDocumentUpload = async (content: string, fileName: string) => {
    setOriginalContent({ content, fileName });
  };

  const handleSubmit = async () => {
    if (!originalContent || !apiKey) {
      setError("Please upload a document and provide an API key");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Initialize the OpenAI client with the API key
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true, // Required for browser environments
      });

      // Call the OpenAI API using the SDK
      const response = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that paraphrases documents into LaTeX format.",
          },
          {
            role: "user",
            content: `${prompt}\n\nHere is the document content:\n\n${originalContent.content}`,
          },
        ],
        temperature: 0.7,
      });

      const latexResponse = response.choices[0].message.content;
      if (!latexResponse) {
        throw new Error("No response from OpenAI");
      }
      const parsedLatexContent = extractLatexContent(latexResponse);
      setLatexContent(parsedLatexContent);

      // Convert LaTeX to PDF using a client-side library
      // This will be handled by DocumentPreview component
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error: ${err.message}`);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Document Paraphraser
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-6">
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 mt-4">Configuration</h2>

          <DocumentUploader onUpload={handleDocumentUpload} />

          <div className="my-4 mt-4">
            <OpenAiInput
              apiKey={apiKey}
              setApiKey={setApiKey}
              model={model}
              setModel={setModel}
            />
          </div>

          <div className="my-4 mt-4">
            <PromptInput prompt={prompt} setPrompt={setPrompt} />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !originalContent || !apiKey}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Paraphrase Document"}
          </button>

          {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Document Preview</h2>
          <DocumentPreview
            originalContent={originalContent}
            latexContent={latexContent}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
