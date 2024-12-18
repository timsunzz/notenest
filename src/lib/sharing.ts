import { Note } from '@/types/note';

export function generateShareId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

export function generateShareLink(shareId: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/share/${shareId}`;
}

export function toggleNoteVisibility(note: Note): Partial<Note> {
  if (note.isPublic) {
    return {
      isPublic: false,
      shareId: undefined,
    };
  }

  return {
    isPublic: true,
    shareId: generateShareId(),
  };
}