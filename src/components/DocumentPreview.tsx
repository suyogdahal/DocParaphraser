import React from "react";
import { DocumentPreviewProps } from "../types";

const latexContentTest =
  "\\documentclass{article}\\begin{document} \\textbf{Foundations of Computing -- Quiz 6} \\textbf{Question 4 -- Solution:} \\textbf{Step 1: Alphabet Counts} The English alphabet comprises 26 letters in total. \\begin{itemize} \\item Vowels: 5 in total \\item Consonants: The remaining letters, which total to 21. \\end{itemize} \\textbf{Step 2: Compute the Number of Valid Words} \\begin{itemize} \\item First letter (Consonant): We have 21 choices. \\item Third letter (Consonant, different from the first): We have 20 choices (one less than previously). \\item Second letter (Any letter, different from the first and third): We have 24 choices (total 26, excluding the first and third letter). \\end{itemize} Therefore, the total number of valid words is: $21 \\times 20 \\times 24 = 10,080$. \\textbf{Step 3: How Alice and Bob Count the Words} Alice selects in the order: First $\\rightarrow$ Third $\\rightarrow$ Second. The total number of words remains 10,080, since the order of selection does not affect the final count. Bob selects in the order: First $\\rightarrow$ Second $\\rightarrow$ Third. Again, the total count remains 10,080. Therefore, both Alice and Bob enumerate 10,080 words. \\textbf{Final Answer:} Alice and Bob both list 10,080 words. This conclusion is corroborated by the application of the fundamental counting principles. \\end{document}";

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
