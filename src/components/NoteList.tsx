import { Note } from '@/types/note';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { FileText, Trash2 } from 'lucide-react';

interface NoteListProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

export function NoteList({
  notes,
  selectedNoteId,
  onSelectNote,
  onDeleteNote,
}: NoteListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)] border-r">
      <div className="p-4 space-y-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`p-3 rounded-lg cursor-pointer group hover:bg-secondary ${
              selectedNoteId === note.id ? 'bg-secondary' : ''
            }`}
            onClick={() => onSelectNote(note.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium truncate">{note.title}</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                }}
              >
                <Trash2 className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}