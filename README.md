# Document Paraphraser

A React application with TypeScript that allows users to upload Word documents, paraphrase them using OpenAI, and convert the results to LaTeX and PDF formats.

## Features

- Upload Word documents (.doc, .docx)
- Configure OpenAI API key for processing
- Customize paraphrasing prompts
- Side-by-side preview of original and paraphrased documents
- Download paraphrased documents as PDF

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- NPM or Yarn
- An OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Usage

1. Upload a Word document using the file uploader
2. Enter your OpenAI API key
3. Optionally, edit the paraphrasing prompt
4. Click "Paraphrase Document" to process your document
5. View the side-by-side comparison
6. Download the paraphrased document as a PDF

## Technologies Used

- React with TypeScript
- Tailwind CSS
- OpenAI API
- Mammoth.js (for Word document processing)
- latex.js (for LaTeX to HTML conversion)
- PDF.js (for PDF rendering)

## License

MIT
