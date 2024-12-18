import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface NoteHeaderProps {
  onAddNote: () => void;
}

export function NoteHeader({ onAddNote }: NoteHeaderProps) {
  return (
    <div className="p-4 border-b">
      <Button onClick={onAddNote} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        New Note
      </Button>
    </div>
  );
}