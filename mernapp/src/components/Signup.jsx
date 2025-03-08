import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [credit, setCredit] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/createuser", { // Ensure the URL is correct
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
        navigate("/signin");
        setCredit({ name: "", email: "", password: "" });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to connect to the server.");
    }
  };

  const handleChange = (event) => {
    setCredit({ ...credit, [event.target.name]: event.target.value });
  };

  return (
    <div className="container-fluid bg-dark text-white d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="Text text-center m-3" style={{ width: "50vw" }}>
        <p className="fs-3 fw-bold">New To To-Do List?</p>
        <p className="text-success display-4 fw-bold">Sign Up Now!!</p>
        <p>Get Better Experience</p>
      </div>

      <div className="boxes">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter Your Username"
              name="name"
              value={credit.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Your Email Id"
              name="email"
              value={credit.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Your Password"
              name="password"
              value={credit.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className='m-3 btn btn-success'>Submit</button>
          <Link to="/signin" className='m-3 btn btn-danger'>Already A User</Link>
          </form>
      </div>
    </div>
  );
};

export default Signup;
