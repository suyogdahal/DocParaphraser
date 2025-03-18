import React, { useEffect, useState } from "react";
import * as PDFJS from "pdfjs-dist";
import { DocumentPreviewProps } from "../types";
import { HtmlGenerator, parse } from "latex.js";

// Set the PDF.js worker path
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

const latexContentGlobal =
  "\\documentclass{article}\\begin{document} \\textbf{Foundations of Computing -- Quiz 6} \\textbf{Question 4 -- Solution:} \\textbf{Step 1: Alphabet Counts} The English alphabet comprises 26 letters in total. \\begin{itemize} \\item Vowels: 5 in total \\item Consonants: The remaining letters, which total to 21. \\end{itemize} \\textbf{Step 2: Compute the Number of Valid Words} \\begin{itemize} \\item First letter (Consonant): We have 21 choices. \\item Third letter (Consonant, different from the first): We have 20 choices (one less than previously). \\item Second letter (Any letter, different from the first and third): We have 24 choices (total 26, excluding the first and third letter). \\end{itemize} Therefore, the total number of valid words is: $21 \\times 20 \\times 24 = 10,080$. \\textbf{Step 3: How Alice and Bob Count the Words} Alice selects in the order: First $\\rightarrow$ Third $\\rightarrow$ Second. The total number of words remains 10,080, since the order of selection does not affect the final count. Bob selects in the order: First $\\rightarrow$ Second $\\rightarrow$ Third. Again, the total count remains 10,080. Therefore, both Alice and Bob enumerate 10,080 words. \\textbf{Final Answer:} Alice and Bob both list 10,080 words. This conclusion is corroborated by the application of the fundamental counting principles. \\end{document}";

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  originalContent,
  latexContent,
  loading,
}) => {
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);
  const [converting, setConverting] = useState<boolean>(false);

  latexContent = latexContentGlobal;

  useEffect(() => {
    if (latexContent && !loading) {
      convertLatexToPdf(latexContent);
    }
  }, [latexContent, loading]);

  const convertLatexToPdf = async (latex: string) => {
    setConverting(true);
    try {
      // Use latex.js to convert LaTeX to HTML first
      const generator = new HtmlGenerator({ hyphenate: false });
      const doc = parse(latex, { generator: generator }).htmlDocument();
      const html = doc.documentElement.outerHTML;

      console.log("HTML:", html);

      // Create a blob from the HTML
      const blob = new Blob([html], { type: "text/html" });

      // In a real app, you might use a server-side conversion or a more robust
      // library that can directly convert LaTeX to PDF in the browser
      setPdfBlob(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error converting LaTeX to PDF:", error);
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      const a = document.createElement("a");
      a.href = pdfBlob;
      a.download = "paraphrased-document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
          {loading || converting ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : latexContent ? (
            <div>
              <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-100 p-4 rounded">
                {latexContent}
              </pre>
              {pdfBlob && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">PDF Preview:</h4>
                  <iframe
                    src={pdfBlob}
                    className="w-full h-96 border"
                    title="PDF Preview"
                  ></iframe>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No paraphrased content yet</p>
          )}
        </div>
      </div>

      {pdfBlob && (
        <div className="mt-4 text-center">
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Download Paraphrased Document
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;
