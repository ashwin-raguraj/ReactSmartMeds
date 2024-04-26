import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import axios from 'axios';
import { ImMenu3 } from 'react-icons/im';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
const Navbar3 = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleSignOut=async ()=>{
        try {
            const response = await axios.get('http://127.0.0.1:8000/doctor/signout');//API for log out
            
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
      };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [doctorInfo, setDoctorInfo] = useState([]);
  const fetchDashboardData = async () => {
    try {
      const doctorResponse = await axios.get('http://127.0.0.1:8000/docdash/');
      if (doctorResponse && doctorResponse.data) {
        setDoctorInfo(doctorResponse.data);
      }
      
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <nav className='navbar'>
        <div className='site-title'>
            <img src={require('../Assets/Icon.png')} alt=""/>
            <div >SmartMeds Connect</div>
        </div> 
        <ul>
            <li className='nav-item'>
                {/* <Link to='/DocDashboard'>Dashboard</Link> */}
                <FontAwesomeIcon icon={faBell} size="xl" style={{color: "#1c4ee6",marginLeft: "-30px"}} />

            </li>
            {doctorInfo.map((doctor, index) => (
                        <div key={index}>
                          <p style={{ marginBottom: '-1px', marginRight:'10px'}}>Welcome, Dr. {doctor.firstName} {doctor.lastName}</p>
                        </div>
                      ))}
       
            <li className='nav-item'>
                {/* <img src={require('../Assets/Profile.png')}  alt="" className='img-fluid w-50 profile-picture' onClick={toggleDropdown}/> */}
                {/* <ImMenu3 onClick={toggleDropdown} className='drop-down-menu-icon' size={37} /> */}
                <FontAwesomeIcon  onClick={toggleDropdown} className='drop-down-menu-icon' icon={faCircleUser} size="2xl" style={{color: "#1c4ee6",marginLeft: "-10px"}} />
                {isDropdownOpen && (
                    <ul className="dropdown-menu d-flex flex-column">
                    <li><Link to='/About'>About us</Link></li>
               
                    <li><Link to='/' onClick={handleSignOut}>Sign out</Link></li>
                    </ul>
                )}
            </li>
        </ul>
    </nav>
  )
}

export default Navbar3