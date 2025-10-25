import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
    const [credit, setCredit] = useState({email: "", password: "" });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch("https://to-do-list-wuoo.onrender.com/api/loginuser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credit)
        });
  
        const json = await response.json();
        console.log(json);
  
        if (!json.success) {
          alert("Enter Valid Credentials");
        } else {
          localStorage.setItem("UserEmail",credit.email);
          localStorage.setItem("authToken",json.authToken);
          navigate("/");
          setCredit({email: "", password: "" });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to connect to the server.");
      }
    };
  
    const onchange = (event) => {
      setCredit({ ...credit, [event.target.name]: event.target.value });
    };
  
  return (
    <div className="container-fluid bg-dark text-white d-flex justify-content-center align-items-center" style={{height: "100vh"}}>

      <div className="Text text-center m-3" style={{width: "50vw"}}>
        <p className="fs-3 fw-bold">Already A User ?</p>
        <p className="text-success display-4 fw-bold">Sign In Now!!</p>
        <p>To Continue</p>
      </div>

      <div className="boxes">
      <form onSubmit={handleSubmit}>
      <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Your Email Id" name="email" value={credit.email} onChange={onchange}/>
      </div>

      <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Enter Your Password" name="password" value={credit.password} onChange={onchange}/>
      </div>

      <button type="submit" className='m-3 btn btn-success' >Submit</button>
      <button className="btn btn-danger" onClick={()=>navigate("/signup")}>Do Not Have An Account</button>
      </form>
      </div>
    </div>
  )
}

export default Login

