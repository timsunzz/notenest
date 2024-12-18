import { Note } from '@/types/note';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { FileText, Trash2 } from 'lucide-react';

interface NoteListItemProps {
  note: Note;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteListItem({
  note,
  isSelected,
  onSelect,
  onDelete,
}: NoteListItemProps) {
  return (
    <div
      className={`p-3 rounded-lg cursor-pointer group hover:bg-secondary ${
        isSelected ? 'bg-secondary' : ''
      }`}
      onClick={() => onSelect(note.id)}
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
            onDelete(note.id);
          }}
        >
          <Trash2 className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
      </p>
    </div>
  );
}