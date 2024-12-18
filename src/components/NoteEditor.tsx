import { useEffect, useRef } from 'react';
import { marked } from 'marked';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Note } from '@/types/note';

interface NoteEditorProps {
  note: Note;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
}

export function NoteEditor({ note, onUpdateNote }: NoteEditorProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = marked(note.content);
    }
  }, [note.content]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col p-4">
      <Input
        value={note.title}
        onChange={(e) => onUpdateNote(note.id, { title: e.target.value })}
        className="text-2xl font-bold mb-4"
        placeholder="Note title"
      />
      <Tabs defaultValue="edit" className="flex-1">
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="flex-1">
          <Textarea
            value={note.content}
            onChange={(e) => onUpdateNote(note.id, { content: e.target.value })}
            className="h-full resize-none font-mono"
            placeholder="Write your note in markdown..."
          />
        </TabsContent>
        <TabsContent value="preview" className="flex-1">
          <div
            ref={previewRef}
            className="prose prose-sm max-w-none h-full overflow-auto p-4 rounded-md bg-secondary"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}