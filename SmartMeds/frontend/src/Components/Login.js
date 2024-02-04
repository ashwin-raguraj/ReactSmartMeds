
// import React, { useState } from 'react';
// import './Login.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// export default function Login() {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const Navigate = useNavigate();

//   const users = [
//     {email: "aj@gmail.com", password: "123456789"},
//     {email: "aj@gmail.com", password: "123456789"},
//     {email: "aj@gmail.com", password: "123456789"}
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const userData = {  email, password };
//     console.log(userData);

//     axios.post('http://127.0.0.1:8000/login/', userData)
//       .then(res => {
//         console.log(res);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     const user = users.find((user) => {
//         return user.email === email && user.password === password;
//       });
  
//       if (user) {
//         Navigate("/Dashboard");
//       } else {
//         alert("Invalid username or password.");
//       }

//   };

//   return (
//     <div className='formlbg'>
//       <form onSubmit={handleSubmit}>
//         <h3>Login</h3>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//             minLength="8"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const [id, setid] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient'); // Default to patient
  const Navigate = useNavigate();

 

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { id, password, userType };
    console.log(userData);

    axios
      .post('http://127.0.0.1:8000/login/', userData)
      .then((response) => {
        if (response.data.success) {
          window.location.href = '/Dashboard';
        } else {
          alert('Invalid userID, password, or user type.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // axios.post('http://127.0.0.1:8000/login/', userData)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // const user = users.find((user) => {
    //   return user.email === email && user.password === password && user.userType === userType;
    // });

    // if (user) {
    //   Navigate("/Dashboard");
    // } else {
    //   alert("Invalid userID, password, or user type.");
    // }
  };

  const toggleUserType = () => {
    setUserType((prevType) => (prevType === 'patient' ? 'doctor' : 'patient'));
  };

  return (
    <div className='formlbg'>
      <form onSubmit={handleSubmit}>
      <h3 style={{ fontFamily: "'Poppins', sans-serif", color: '#000000' }}>Login</h3>
        <div className='form-group'>
          <label style={{ fontFamily: "'Poppins', sans-serif" }}>User Type:</label>
          <div className='toggle-container'>
            <button
              type='button'
              onClick={toggleUserType}
              className={`toggle-button ${userType === 'patient' ? 'active' : ''}`}
            >
              Patient
            </button>
            <button
              type='button'
              onClick={toggleUserType}
              className={`toggle-button ${userType === 'doctor' ? 'active' : ''}`}
            >
              Doctor
            </button>
          </div>
        </div>

        {userType === 'patient' && (
          <div className='form-group'>
            <label style={{ fontFamily: "'Poppins', sans-serif" }} htmlFor='patientId '>Patient ID</label>
            <input
              type='text'
              className='form-control'
              id='patientId'
              value={id}
            onChange={(e) => setid(e.target.value)}
              placeholder='Patient ID'
              required
            />
          </div>
        )}

        {userType === 'doctor' && (
          <div className='form-group'>
            <label style={{ fontFamily: "'Poppins', sans-serif" }} htmlFor='doctorId'>Doctor ID</label>
            <input
              type='text'
              className='form-control'
              id='doctorId'
                value={id}
            onChange={(e) => setid(e.target.value)}
              placeholder='Doctor ID'
              required
            />
          </div>
        )}
        <div className="form-group">
          <label style={{ fontFamily: "'Poppins', sans-serif" }} htmlFor="password">Password</label>
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

       

        <button type="submit" className="btn btn-primary">
          Login
        </button>

       
        <p className='para'>Not Registered?</p>
        <Link to='/Signup'>
          <button type='submit' className='btn btn-secondary'>
            Signup
          </button>
        </Link>
      </form>
    </div>
  );
}
