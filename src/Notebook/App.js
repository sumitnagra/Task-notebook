import React,{useState} from "react";
import Navbar from './component/Navbar.js'
import {  Routes, Route } from 'react-router-dom'
import Home from "./component/Home.js";
import NoteState from "./component/context/context.js"
import Alert from "./component/Alert.js";
import AddNote from "./component/Addnote.js";
import Login from "./component/context/login.js";
import SignUP from "./component/context/signup.js";

function App() {
    const [alert, setAlert] = useState(null)
    const showAlert = (massage, type) => {
        setAlert({
            msg: massage,
            type: type
        })
    }
    setTimeout(() => {
        setAlert(null)
    }, 2000);

    return (
        <>
        
            <NoteState showAlert={showAlert}>
                
                    <Navbar showAlert={showAlert}/>
                    <Alert alert={alert}/>
                    <Routes>
                        <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
                        <Route exact path="/addnote" element={<AddNote showAlert={showAlert}/>}></Route>
                        <Route exact path="/signup" element={<SignUP showAlert={showAlert} />}></Route>
                        <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
                    </Routes>
            
            </NoteState>
        </>
    )

}

export default App;
