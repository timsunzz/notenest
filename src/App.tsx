import { useState } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { NoteList } from '@/components/notes/NoteList';
import { NoteEditor } from '@/components/notes/NoteEditor';
import { NoteHeader } from '@/components/notes/NoteHeader';
import { TooltipProvider } from '@/components/ui/tooltip';
import { MainLayout } from '@/components/layout/MainLayout';

function App() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(
    notes[0]?.id ?? null
  );

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const handleAddNote = () => {
    const newNote = addNote();
    setSelectedNoteId(newNote.id);
  };

  return (
    <TooltipProvider>
      <MainLayout
        sidebar={
          <>
            <NoteHeader onAddNote={handleAddNote} />
            <NoteList
              notes={notes}
              selectedNoteId={selectedNoteId}
              onSelectNote={setSelectedNoteId}
              onDeleteNote={deleteNote}
            />
          </>
        }
        content={
          selectedNote ? (
            <NoteEditor note={selectedNote} onUpdateNote={updateNote} />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a note or create a new one
            </div>
          )
        }
      />
    </TooltipProvider>
  );
}

export default App;