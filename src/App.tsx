import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Notebook/component/Home';
import NoteState from './Notebook/component/context/context';
import AddNote from './Notebook/component/Addnote';
import Login from './Notebook/component/context/login';
import SignUP from './Notebook/component/context/signup';
import Navbar from './Notebook/component/Navbar';
import Alert from './Notebook/component/Alert';

const Notebook: React.FC = () => {
  const [alert, setAlert] = useState<{ msg: string; type: string } | null>(null);

  const showAlert = (message: string, type: string) => {
    setAlert({
      msg: message,
      type: type,
    });
  };

  setTimeout(() => {
    setAlert(null);
  }, 2000);

  return (
    <>
      <Router>
        <NoteState showAlert={showAlert}>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <Routes>
            <Route path="/notebook" element={<Home showAlert={showAlert} />} />
            <Route path="/addnote" element={<AddNote showAlert={showAlert} />} />
            <Route path="/signup" element={<SignUP showAlert={showAlert} />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
          </Routes>
        </NoteState>
      </Router>
    </>
  );
};

export default Notebook;
