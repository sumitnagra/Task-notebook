import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
function Navbar(props) {
  const location = useLocation();
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('auth-token')
    navigate("/login")
    props.showAlert('logout successfully', 'success')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light my-1  ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">iNOTEBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/notebook" ? "active" : ""} `} aria-current="page" to="/notebook">Note</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/addnote" ? "active" : ""} `} to="/addnote">Add Note</Link>
              </li>

            </ul>
            {!localStorage.getItem('auth-token') ? <form className="d-flex" role="search">
              <Link to="/login"><button className="btn btn-outline-primary mx-2" type="submit">LogIn</button></Link>
              <Link to="/signup"> <button className="btn btn-outline-primary" type="submit">SignUP</button></Link>
            </form> : <button className="btn btn-outline-success" onClick={logout}>Logout</button>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;