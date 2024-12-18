import { marked } from 'marked';
import mermaid from 'mermaid';

// Initialize mermaid with default config
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
});

// Create a custom renderer for code blocks
const renderer = new marked.Renderer();
const originalCodeRenderer = renderer.code.bind(renderer);

renderer.code = (code, language) => {
  if (language === 'mermaid') {
    return `<div class="mermaid">${code}</div>`;
  }
  return originalCodeRenderer(code, language);
};

// Function to render markdown content
export async function renderMarkdown(content: string): Promise<string> {
  // First pass: Convert markdown to HTML
  const html = marked(content, { renderer });

  // Create a temporary div to hold the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Find all mermaid diagrams
  const mermaidDivs = tempDiv.getElementsByClassName('mermaid');

  // Render each mermaid diagram
  for (const div of Array.from(mermaidDivs)) {
    try {
      const id = `mermaid-${Math.random().toString(36).substring(7)}`;
      div.id = id;
      const { svg } = await mermaid.render(id, div.textContent || '');
      div.innerHTML = svg;
    } catch (error) {
      console.error('Failed to render mermaid diagram:', error);
      div.innerHTML = `<pre class="text-red-500">Failed to render diagram: ${error.message}</pre>`;
    }
  }

  return tempDiv.innerHTML;
}