import React from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-dark text-white d-flex justify-content-center align-items-center" style={{height: "100vh"}}>

      <div className="text m-3" style={{width: "50vw"}}>
        <p className='fs-1 fw-bold text-center'>Welcome To To-Do</p><br />
        <p className="text-center">Organize Your Work In Simple Way</p>
      </div>

      {!(localStorage.getItem("authToken"))?
      <div className="navigation d-flex flex-column">
      <button type="button" className="btn btn-success m-2" onClick={()=>navigate("/signup")}>New User</button>
      <button type="button" className="btn btn-success m-2" onClick={()=>navigate("/signin")}>Already Have An Account</button>
      </div>:
      <div className="navigation d-flex flex-column" style={{width:"20vw"}}>
      <button type="button" className="btn btn-success m-2" onClick={()=>navigate("/list")}>My List</button>
      </div>
      }

    </div>
  )
}

export default Home
