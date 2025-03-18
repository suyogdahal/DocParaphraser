import React from "react";
import { DocumentPreviewProps } from "../types";

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  originalContent,
  latexContent,
  loading,
}) => {
  // latexContent = latexContentGlobal;

  const openInOverleaf = () => {
    if (latexContent) {
      // Convert LaTeX content to base64
      const base64Latex = btoa(unescape(encodeURIComponent(latexContent)));

      // Create data URI with the base64-encoded content
      const dataUri = `data:application/x-tex;base64,${base64Latex}`;

      // Create form with data URI for submission to Overleaf
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://www.overleaf.com/docs";
      form.target = "_blank";

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "snip_uri";
      input.value = dataUri;

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    }
  };

  const handleDownload = () => {
    if (latexContent) {
      const blob = new Blob([latexContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "paraphrased-document.tex";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (!originalContent && !latexContent) {
    return (
      <div className="text-center p-10 bg-gray-100 rounded-lg">
        <p className="text-gray-500">Upload a document to see the preview</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:h-[600px] gap-4">
        {/* Original Document Preview */}
        <div className="md:w-1/2 h-full overflow-auto border rounded p-4">
          <h3 className="font-bold mb-2">Original Document</h3>
          {originalContent ? (
            <div className="whitespace-pre-wrap">{originalContent.content}</div>
          ) : (
            <p className="text-gray-500">No document uploaded</p>
          )}
        </div>

        {/* Paraphrased Document Preview */}
        <div className="md:w-1/2 h-full overflow-auto border rounded p-4">
          <h3 className="font-bold mb-2">Paraphrased Document (LaTeX)</h3>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : latexContent ? (
            <div>
              <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-100 p-4 rounded">
                {latexContent}
              </pre>
            </div>
          ) : (
            <p className="text-gray-500">No paraphrased content yet</p>
          )}
        </div>
      </div>

      {latexContent && !loading && (
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={openInOverleaf}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Open in Overleaf
          </button>
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download LaTeX File
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;
