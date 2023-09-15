import React, { useContext } from 'react'
import Notecontext from './context/Notecontext.js'
import './notesitem.css'

const NoteItem = (props) => {
    const a = useContext(Notecontext);
    const { deleteNote } = a;
    const { showAlert } = props;
    return (
        <>
            <div className="card  col-md-4  my-2" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h3 className="card-text"> Tag: {props.tag}</h3>
                    <h5 className="card-title">Title: {props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Description: {props.description}</h6>


                    <button type="submit" className="btn btn-sm" onClick={() => { props.update(props.note) }}><i className="fa-solid fa-pen-to-square mx-2">
                    </i>
                    </button>
                    <button type="submit" className="btn btn-sm" onClick={() => { deleteNote(props.id) }}><i className="fa-solid fa-trash" ></i></button>
                </div>
            </div>



        </>
    )
}

export default NoteItem;