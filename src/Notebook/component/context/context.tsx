import React, { useEffect, useState, ReactNode } from "react";
import Notecontext from "./Notecontext";

interface Note {
  _id: string;
  title: string;
  description: string;
  tag: string;
}

interface NoteStateProps {
  children: ReactNode;
  showAlert: (message: string, type: string) => void;
}

const NoteState: React.FC<NoteStateProps> = (props) => {
  const [state, setState] = useState<Note[]>([]);
  const host = "https://sumitportfolio-u9sd.onrender.com";

  const getAllnote = async () => {
    try {
      const response = await fetch(`${host}/getallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token') || '',
        },
      });

      if (response.ok) {
        const data: Note[] = await response.json();
        setState(data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getAllnote();
  }, []);

  const addNote = async (title: string, description: string, tag: string) => {
    try {
      const response = await fetch(`${host}/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token') || '',
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (response.ok) {
        const note: Note = {
          _id: '',
          title,
          description,
          tag,
        };
        setState((prevState) => [...prevState, note]);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const response = await fetch(`${host}/deletenotes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token') || '',
        },
      });

      if (response.ok) {
        const newNote = state.filter((note) => note._id !== id);
        setState(newNote);
        props.showAlert('Note deleted', 'warning');
      } else {
        props.showAlert('Note was not deleted', 'danger');
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = async (note: Note) => {
    try {
      const id = note._id;
      const response = await fetch(`${host}/updatenotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token') || '',
        },
        body: JSON.stringify({ title: note.title, description: note.description, tag: note.tag }),
      });

      if (response.ok) {
        const newNote = [...state];
        const index = newNote.findIndex((element) => element._id === id);

        if (index !== -1) {
          newNote[index].title = note.title;
          newNote[index].description = note.description;
          newNote[index].tag = note.tag;
          setState(newNote);
        }
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <Notecontext.Provider value={{ state, addNote, deleteNote, editNote, getAllnote }}>
      {props.children}
    </Notecontext.Provider>
  );
};

export default NoteState;
