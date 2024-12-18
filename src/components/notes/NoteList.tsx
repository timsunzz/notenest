import { Note } from '@/types/note';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NoteListItem } from './NoteListItem';

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
          <NoteListItem
            key={note.id}
            note={note}
            isSelected={selectedNoteId === note.id}
            onSelect={onSelectNote}
            onDelete={onDeleteNote}
          />
        ))}
      </div>
    </ScrollArea>
  );
}