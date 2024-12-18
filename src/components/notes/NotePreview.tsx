import { useEffect, useRef } from 'react';
import { marked } from 'marked';

interface NotePreviewProps {
  content: string;
}

export function NotePreview({ content }: NotePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = marked(content);
    }
  }, [content]);

  return (
    <div
      ref={previewRef}
      className="prose prose-sm max-w-none h-full overflow-auto p-4 rounded-md bg-secondary"
    />
  );
}