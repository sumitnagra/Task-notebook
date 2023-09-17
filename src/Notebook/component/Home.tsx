import React, { useState, useRef, useContext } from 'react';
import Notes from './Notes';
import Notecontext from './context/Notecontext';

interface Note {
  title: string;
  description: string;
  tag: string;
}

interface HomeProps {
  showAlert: (message: string, type: string) => void;
}

const Home: React.FC<HomeProps> = (props) => {
  const [note, setNote] = useState<Note>({ title: '', description: '', tag: '' });
  const context = useContext(Notecontext);
  const { editNote } = context;

  const ref = useRef<HTMLButtonElement>(null);
  const refClose = useRef<HTMLButtonElement>(null);

  const update = (currentNote: Note) => {
    if (ref.current) {
      ref.current.click();
      setNote(currentNote);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    editNote(note);
    if (refClose.current) {
      refClose.current.click();
    }
    props.showAlert('Note Updated', 'success');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {localStorage.getItem('auth-token') ? (
        <div className="container">
          <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
          </button>

          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3 container">
                    <h3>Enter the Notes Here</h3>
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                    <label htmlFor="description" id="description"  className="form-label">Description:</label>
                    <textarea className="form-control" value={note.description} id="description" name="description" rows={3} onChange={onChange}></textarea>
                    <label htmlFor="tag" className="form-label">Tag:</label>
                    <input type="text" value={note.tag} className="form-control" id="tag" name="tag" onChange={onChange} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-warning" onClick={handleClick}>Update Note</button>
                </div>
              </div>
            </div>
          </div>

          <Notes update={update} showAlert={props.showAlert} />
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

export default Home;
