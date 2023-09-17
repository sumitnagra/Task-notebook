import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Notecontext from './context/Notecontext';
import NoteItem from './NoteItem';

interface Note {
  _id: string;
  title: string;
  description: string;
  tag: string;
}

interface NotesProps {
  update: (note: Note) => void;
  showAlert: (message: string, type: string) => void;
}

const Notes: React.FC<NotesProps> = (props) => {
  const a = useContext(Notecontext);
  const { state } = a;
  const navigate = useNavigate();

  return (
    <>
      {localStorage.getItem('auth-token') ? (
        <div className="row row-cols-lg-3" style={{ marginTop: '55px' }}>
          {state.length === 0 ? (
            <h1> You have no todo list for today </h1>
          ) : (
            state.map((element: Note) => (
              <div key={element._id}>
                <NoteItem title={element.title} description={element.description} id={element._id} tag={element.tag} update={props.update} note={element} showAlert={props.showAlert} />
              </div>
            ))
          )}
        </div>
      ) : (
        navigate('/login')
      )}
    </>
  );
};

export default Notes;
