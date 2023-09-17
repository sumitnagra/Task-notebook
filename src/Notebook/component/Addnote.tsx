import React, { useContext, useState } from 'react';
import Notecontext from './context/Notecontext';

interface Note {
  title: string;
  description: string;
  tag: string;

}

interface Props {
  showAlert: (message: string, type: string) => void;
}

const AddNote: React.FC<Props> = ({ showAlert }) => {
  const [note, setNote] = useState<Note>({ title: '', description: '', tag: '' });
  const context = useContext(Notecontext);
  const { addNote } = context;

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
    showAlert('Note added successfully', 'success');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {localStorage.getItem('auth-token') ? (
        <div className="mb-3 container" style={{ marginTop: '55px' }}>
          <h3>Enter the Notes Here</h3>
          <form>
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input type="text" className="form-control" id="title" name="title" onChange={onChange} />
            <label htmlFor="description" className="form-label" id="description" >
              Description:
            </label>
            <textarea className="form-control" id="description" name="description" rows={3} onChange={onChange}></textarea>
            <label htmlFor="tag" className="form-label">
              Tag:
            </label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
            <button type="submit" className="btn btn-warning my-2" onClick={handleClick}>
              Add Note
            </button>
          </form>
        </div>
      ) : (
        <header className="masthead">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 text-center">
                <h1 className="fw-light">Please login to continue with iNotebook</h1>
                <p className="lead">Secure your thoughts, todo list, and notes</p>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default AddNote;
