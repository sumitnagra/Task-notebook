import Home from "./Notebook/component/Home.js";
import NoteState from "./Notebook/component/context/context.js"
import AddNote from "./Notebook/component/Addnote.js";
import Login from "./Notebook/component/context/login.js";
import SignUP from "./Notebook/component/context/signup.js";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Notebook/component/Navbar.js";


const Notebook = () => {
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
  return (<>


    <Router>
    <NoteState showAlert={showAlert}>

      <Navbar/>
      <Routes>

        <Route exact path="/notebook" element={<Home showAlert={showAlert} />}></Route>
        <Route exact path="/addnote" element={<AddNote showAlert={showAlert} />}></Route>
        <Route exact path="/signup" element={<SignUP showAlert={showAlert} />}></Route>
        <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
      </Routes>
      </NoteState>
    </Router>
  </>)
}

export default Notebook