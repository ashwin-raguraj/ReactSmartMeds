import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

import axios from 'axios';
// import { useNavigate } from 'react-router-dom';



export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const navigate = useNavigate();



  



  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { firstName, lastName, email, password };
    console.log(userData);


  axios.post('http://127.0.0.1:8000/signup/', { firstName,lastName,email,password })
  .then((response) => {
    if (response.data.success) {
     window.location.href = '/Login';
    } else {
      alert('Signup failed. Please try again.');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  };
  return (
    <div className='formbg'>
  
 
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength="8"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            minLength="8"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <p className='para'>Are you can existing user?</p>
        <Link to="/Login">
      <button type='submit' className="btn btn-secondary">Login</button>
    </Link>
        
      </form>

     </div>
  );
}


