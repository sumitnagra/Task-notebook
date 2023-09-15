
import { useState, useRef, useContext } from "react";
import Notes from "./Notes";
import Notecontext from './context/Notecontext.js'



function Home(props) {

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const a = useContext(Notecontext);
    const { editNote } = a;


    const ref = useRef('')
    const refClose = useRef('')
    const update = (currentNote) => {
        ref.current.click()
        setNote(currentNote)

    }
    const handleClick = (e) => {
        e.preventDefault();
        editNote(note)
        refClose.current.click()
        props.showAlert('Note Updated', 'success')

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
    
            {localStorage.getItem('auth-token') ?
                <div className="container">
                    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} />
                                        <label htmlFor="description" id="description" name="description" className="form-label">Description:</label>
                                        <textarea className="form-control" value={note.description} id="description" name="description" rows="3" onChange={onChange}></textarea>
                                        <label htmlFor="tag" className="form-label">Tag:</label>
                                        <input type="text" value={note.tag} className="form-control" id="tag" name='tag' onChange={onChange} />

                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-warning" onClick={handleClick}>Update Note</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    < Notes update={update} showAlert={props.showAlert} />
                </div> : <header class="masthead">
                    <div class="container h-100">
                        <div class="row h-100 align-items-center">
                            <div class="col-12 text-center">
                                <h1 class="fw-light">Please login to continue with iNotebook</h1>
                                <p class="lead">secure your thought, todo list and notes</p>
                            </div>
                        </div>
                    </div>
                </header>}
        </>
    )
}

export default Home;