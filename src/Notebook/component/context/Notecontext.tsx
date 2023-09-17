import { createContext, Context } from 'react';

interface NoteContextValue {
  state: any[]; // Replace with the actual type for "state"
  addNote: (title: string, description: string, tag: string) => void;
  deleteNote: (id: string) => void;
  editNote: (note: any) => void; // Replace "any" with the actual type for "note"
  getAllnote: () => void;
}

const Notecontext: Context<NoteContextValue> = createContext<NoteContextValue>({
  state: [],
  addNote: () => {},
  deleteNote: () => {},
  editNote: () => {},
  getAllnote: () => {},
});

export default Notecontext;
