declare module "latex.js" {
  export class HtmlGenerator {
    constructor(options?: { hyphenate?: boolean; [key: string]: any });
    renderToString(content: string): string;
  }

  export function parse(latex: string, options: any): any;
}
