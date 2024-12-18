import { useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Note } from '@/types/note';
import { EditorToolbar } from './EditorToolbar';
import { EditorPreview } from './EditorPreview';
import { NoteActions } from './NoteActions';

interface NoteEditorProps {
  note: Note;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
}

export function NoteEditor({ note, onUpdateNote }: NoteEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormat = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    let newText = '';
    let newCursorPos = start;

    if (format.startsWith('#') || format.startsWith('-') || format.startsWith('1.')) {
      // Handle line-starting formats
      const lineStart = text.lastIndexOf('\n', start - 1) + 1;
      newText = text.slice(0, lineStart) + format + text.slice(lineStart);
      newCursorPos = lineStart + format.length;
    } else if (format.includes('\n')) {
      // Handle multi-line formats (tables, code blocks, etc)
      newText = text.slice(0, start) + format + text.slice(end);
      newCursorPos = start + format.indexOf('\n', format.indexOf('\n') + 1);
    } else {
      // Handle inline formatting
      const selectedText = text.slice(start, end);
      if (selectedText) {
        newText = `${text.slice(0, start)}${format}${selectedText}${format}${text.slice(end)}`;
        newCursorPos = end + format.length * 2;
      } else {
        newText = `${text.slice(0, start)}${format}${format}${text.slice(end)}`;
        newCursorPos = start + format.length;
      }
    }

    onUpdateNote(note.id, { content: newText });
    
    // Restore focus and selection
    textarea.focus();
    setTimeout(() => {
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-none p-4 border-b flex items-center justify-between">
        <Input
          value={note.title}
          onChange={(e) => onUpdateNote(note.id, { title: e.target.value })}
          className="text-2xl font-bold flex-1 mr-4"
          placeholder="Note title"
        />
        <NoteActions note={note} onUpdateNote={onUpdateNote} />
      </div>
      <div className="flex-1 min-h-0 flex flex-col">
        <Tabs defaultValue="edit" className="flex-1 flex flex-col">
          <div className="flex-none px-4 pt-4">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="edit" className="flex-1 p-4 pt-0">
            <div className="h-full flex flex-col">
              <EditorToolbar onFormat={handleFormat} />
              <Textarea
                ref={textareaRef}
                value={note.content}
                onChange={(e) => onUpdateNote(note.id, { content: e.target.value })}
                className="flex-1 resize-none font-mono"
                placeholder="Write your note in markdown..."
              />
            </div>
          </TabsContent>
          <TabsContent value="preview" className="flex-1 p-4 pt-0">
            <EditorPreview content={note.content} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}