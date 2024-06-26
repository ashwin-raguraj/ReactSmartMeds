

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

import axios from 'axios';

export default function Signup() {
  const [userType, setUserType] = useState('patient');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [patientId, setpatientId] = useState('');
  const [doctorId, setdoctorId] = useState('');
  const [department, setdepartment] = useState('');
  const [hospital, setHospital] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const toggleUserType = () => {
    setUserType((prevType) => (prevType === 'patient' ? 'doctor' : 'patient'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    // Reset password match status
    setPasswordsMatch(true);


    const userData = { firstName, lastName, email, password, userType, patientId,age,hospital,department };
    console.log(userData);

    axios
      .post('http://127.0.0.1:8000/signup/', userData)
      .then((response) => {
        if (response.data.success) {
          window.location.href = '/Login';
        } else {
          alert('User Exists. Please try again with different Email or ID.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='formbg'>
      <form onSubmit={handleSubmit}>
        <h3 style={{ fontFamily: "'Poppins', sans-serif" }}>Sign Up</h3>
        <div className='form-group'>
          <label style={{ fontFamily: "'Poppins', sans-serif" }}>User Type:</label>
          <div className='toggle-container'>
            <button
              type='button'
              onClick={toggleUserType}
              className={`toggle-button ${userType === 'patient' ? 'active' : ''}`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Patient
            </button>
            <button
              type='button'
              onClick={toggleUserType}
              className={`toggle-button ${userType === 'doctor' ? 'active' : ''}`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Doctor
            </button>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            className='form-control'
            id='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            className='form-control'
            id='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </div>
        {userType === 'patient' && (
          <>
            <div className='form-group'>
              <label htmlFor='patientId'>Patient ID</label>
              <input
                type='text'
                className='form-control'
                id='patientId'
                value={patientId}
                onChange={(e) => setpatientId(e.target.value)}
                placeholder='Patient ID'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='age'>Age</label>
              <input
                type='text'
                className='form-control'
                id='age'
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder='Age'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='uploadImage'style={{ width: '44%', marginLeft:140 }}>Upload Patient Image</label>
              <input
                type='file'
                className='form-control'
                id='uploadImage'
                accept='image/*'
                required
                style={{ width: '44%', marginLeft:140 }}
                
              />
            </div>
          </>
        )}
        {userType === 'doctor' && (
          <>
            <div className='form-group'>
              <label htmlFor='patientId'>Doctor ID</label>
              <input
                type='text'
                className='form-control'
                id='patientId'
                value={patientId}
                onChange={(e) => setpatientId(e.target.value)}
                placeholder='Doctor ID'
                required
              />
            </div>
            <div className='form-group'  style={{ position: 'relative', left: '-27px'}}>
              <label htmlFor='department'>Department</label>
              <select
                id='department'
                className='form-control'
                value={department}
                onChange={(e) => setdepartment(e.target.value)}
                style={{ width: '133%' }}
                required
              >
                <option value='' disabled>Select Department</option>
                <option value='General Medicine'>General Medicine</option>
                <option value='Orthopedics'>Orthopedics</option>
                <option value='Urology'>Urology</option>
                <option value='Oncology'>Oncology</option>
                <option value='Pediatrics'>Pediatrics</option>
                <option value='Cardiology'>Cardiology</option>
                <option value='Neurology'>Neurology</option>
                <option value='Gynaecology'>Gynaecology</option>
                <option value=''>Neurology</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className='form-group'style={{ position: 'relative', left: '8px'}}>
              <label htmlFor='hospital'>Hospital Name</label>
              <select
                id='hospital'
                className='form-control'
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                style={{ width: '90%' }}
                required
              >
                <option value='' disabled>Select Hospital</option>
                <option value='Apollo Hospital'>Apollo Hospital</option>
                <option value='Aster Medcity'>Aster Medcity</option>
                <option value='Alappuzha Medical College'>Alappuzha Medical College</option>
                <option value='Thrissur Medical College'>Thrissur Medical College</option>
                <option value='Rajagiri Hospital'>Rajagiri Hospital</option>
                <option value='LF Hospital'>LF Hospital</option>
                <option value='Kinder Hospital'>Kinder Hospital</option>
                <option value='Renai Medcity'>Renai Medcity</option>
                <option value='Ernakulam Medical Center'>Ernakulam Medical Center</option>
                <option value='Lissie Hospital'>Lissie Hospital</option>
                
                {/* Add more options as needed */}
              </select>
            </div>
          </>
        )}
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
            minLength='8'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            className='form-control'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
            minLength='8'
          />
            {!passwordsMatch && <p className='error-message'>Passwords do not match</p>}
        </div>
        <button type='submit' className='btn btn-primary'>
          Sign Up
        </button>
        <p className='para'>Are you an existing user?</p>
        <Link to='/Login'>
          <button type='submit' className='btn btn-secondary'>
            Login
          </button>
        </Link>
      </form>
    </div>
  );
}
