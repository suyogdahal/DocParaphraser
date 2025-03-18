import React, { useState, ChangeEvent } from "react";
import mammoth from "mammoth";
import { DocumentUploaderProps } from "../types";

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onUpload }) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Check if file is a Word document
    if (!file.name.endsWith(".docx") && !file.name.endsWith(".doc")) {
      alert("Please upload a Word document (.doc or .docx)");
      return;
    }

    setFileName(file.name);
    setUploading(true);

    try {
      // Read the file as an array buffer
      const arrayBuffer = await file.arrayBuffer();

      // Convert the Word document to HTML
      const result = await mammoth.extractRawText({ arrayBuffer });

      // Send the extracted text to the parent component
      onUpload(result.value, file.name);
    } catch (error) {
      console.error("Error processing document:", error);
      alert("Error processing document. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Upload Word Document
      </label>
      <div className="flex items-center justify-center w-full">
        <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">
            {fileName ? fileName : "Select a document"}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".doc,.docx"
            disabled={uploading}
          />
        </label>
      </div>
      {uploading && (
        <div className="text-center mt-2">
          <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-2"></div>
          Processing document...
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
