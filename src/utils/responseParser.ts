export const extractLatexContent = (text: string): string => {
  const latexPattern = /\\begin{.*}[\s\S]*\\end{.*}/g;
  const matches = text.match(latexPattern);

  if (matches && matches.length > 0) {
    return matches[0];
  }

  // Return the original text if no LaTeX pattern is found
  return text;
};
