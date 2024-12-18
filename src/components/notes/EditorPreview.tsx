import { useEffect, useRef } from 'react';
import { renderMarkdown } from '@/lib/markdown';

interface EditorPreviewProps {
  content: string;
}

export function EditorPreview({ content }: EditorPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function updatePreview() {
      if (previewRef.current) {
        const html = await renderMarkdown(content);
        previewRef.current.innerHTML = html;
      }
    }
    updatePreview();
  }, [content]);

  return (
    <div
      ref={previewRef}
      className="prose prose-sm max-w-none h-full overflow-auto p-4 rounded-md bg-secondary"
    />
  );
}