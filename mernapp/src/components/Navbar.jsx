import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar() {
const navigate = useNavigate();

  const handleLogOut = () =>{
    localStorage.removeItem("authToken");
    navigate("/signin");
}


  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        
        <a className="navbar-brand text-white fs-2" href="#">
          To-Do
        </a>

        { (localStorage.getItem("authToken"))?
        <Link className="nav-link active text-white" to="/list">
            List
        </Link>:""
        }

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/">
                Home
              </Link>
            </li>
            {!(localStorage.getItem("authToken"))? 
        <div className='d-flex'>
          <Link className="btn text-white" to="/signin">Sign In</Link>
          <Link className="btn text-white" to="/SignUp">SignUp</Link>
        </div>:
        <div> 
          <Link className="btn text-danger" to="/signin" onClick={handleLogOut}>LogOut</Link>
        </div>
        }

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
