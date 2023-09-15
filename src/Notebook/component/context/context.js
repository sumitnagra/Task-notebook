import { useEffect, useState } from "react";
import Notecontext from "./Notecontext";

const NoteState = (props) => {
    const [state, setState] = useState([])
    const host = "https://sumitportfolio-u9sd.onrender.com"
    const getAllnote = async () => {
        const responce = await fetch(`${host}/getallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        }).then((res) => res.json()).then((data) => setState(data))
    }
    useEffect(() => {
        getAllnote()
    }, [])

    const addNote = async (title, description, tag) => {
        const responce = await fetch(`${host}/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const note = {
            "title": title,
            "description": description,
            "tag": tag
        }
        setState(state.concat(note))

    }
    const deleteNote = async (id) => {
        try {

            const responce = await fetch(`${host}/deletenotes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            })
            const newNote = state.filter(note => note._id !== id)
            setState(newNote)
            props.showAlert('Note deleted', 'warning')


        } catch (error) {
            props.showAlert('Note was not deleted', 'danger')
        }
    }
    const editNote = async (note) => {
        const id = note._id
        const responce = await fetch(`${host}/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title: note.title, description: note.description, tag: note.tag })
        })
        const newNote = JSON.parse(JSON.stringify(state))

        for (let index = 0; index < newNote.length; index++) {
            const element = state[index];
            if (element._id === id) {
                newNote[index].title = note.title
                newNote[index].description = note.description
                newNote[index].tag = note.tag
                break;
            }
        }
        setState(newNote)
    }


    return (
        <Notecontext.Provider value={{ state, addNote, deleteNote, editNote, getAllnote }}>
            {props.children}
        </Notecontext.Provider>
    )

}
export default NoteState;