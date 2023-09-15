import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Notecontext from './context/Notecontext.js'
import NoteItem from "./NoteItem.js";

const Notes = (props) => {
    const a = useContext(Notecontext);
    const { state } = a;
    const navigate = useNavigate()


    return (
        <>
            {localStorage.getItem('auth-token') ?
                <div className="row  row-cols-lg-3" style={{ marginTop: "55px" }}>

                    {state.length === 0 ? <h1> You have no todo list for today </h1>:
                    
                        state.map((element) => {
                            return (
                                <div key={element._id}>
                                    <NoteItem title={element.title} description={element.description} id={element._id} tag={element.tag} update={props.update} note={element} showAlert={props.showAlert} />
                                </div>)
                        }
                        )
                    }
                </div>
                : navigate("/login")}
                </>
    )
                }
    export default Notes;