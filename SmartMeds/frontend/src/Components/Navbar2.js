import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import axios from 'axios';
import { ImMenu3 } from 'react-icons/im';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell,faHeartPulse } from '@fortawesome/free-solid-svg-icons';


const Navbar2 = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const handleSignOut=async ()=>{
        try {
            const response = await axios.get('http://127.0.0.1:8000/patient/signout');//API for log out
            
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
      };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  const [patientInfo, setPatientInfo] = useState({});
const fetchDashboardData = async () => {
    try {
      const patientResponse = await axios.get('http://127.0.0.1:8000/patientinfo/');
      if (patientResponse && patientResponse.data) setPatientInfo(patientResponse.data);

     
    } catch (error) {
      console.log(error);
    }
  };
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/notifications/');
      if (response && response.data) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDashboardData();
    fetchNotifications();
  }, []);
  return (
    <nav className='navbar'>
        <div className='site-title'>
            <img src={require('../Assets/Icon.png')} alt=""/>
            <a href="/" >SmartMeds Connect</a>
        </div> 
        <ul>
            <li className='nav-item'>
                {/* <Link to='/Dashboard'>Dashboard</Link> */}
                <div>
      {notifications.length > 0 ? (
        <FontAwesomeIcon
          onClick={toggleDropdown1}
          icon={faBell} shake// or any other icon you want to use for notifications
          size="xl"
          style={{ color: "c84646", marginLeft: "-30px" }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faBell} 
          size="xl"
          style={{ color: "grey", marginLeft: "-30px" }}
        />
      )}
      {isDropdownOpen1 && (
        <div className="dropdown1">
          {notifications.length > 0 ? (
            <ul className="dropdown1-menu d-flex flex-column">
                <p style={{ fontSize: '26px', color: '' }}><FontAwesomeIcon icon={faHeartPulse} style={{color: "#cf3a3a",}} /><strong> Missed Medications</strong></p>
              {notifications.map(notification => (
                <li key={notification.id}>
                  <div className="notification-item">
                    
                    {/* <p><strong>Patient ID:</strong> {notification.patient_id}</p> */}
                    
                    <p><strong>Date:</strong> {notification.date}</p>
                    <p><strong>Medicine:</strong> {notification.medicine}</p>
                    <p><strong>Time:</strong> {notification.time}</p>
                    <p><strong>Quantity:</strong> {notification.qty}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications to show</p>
          )}
        </div>
      )}
    </div>
                
                
            </li>
            <p style={{ marginBottom: '-1px', marginRight:'10px'}} > Welcome, {patientInfo.firstName} {patientInfo.lastName} </p>
           
            <li className='nav-item'>
                {/* <img src={require('../Assets/Profile.png')}  alt="" className='img-fluid w-50 profile-picture' onClick={toggleDropdown}/> */}
                {/* <ImMenu3 onClick={toggleDropdown} className='drop-down-menu-icon' size={37} /> */}
                <FontAwesomeIcon  onClick={toggleDropdown} className='drop-down-menu-icon' icon={faCircleUser} size="2xl" style={{color: "#1c4ee6",marginLeft: "-10px"}} />
                {isDropdownOpen && (
                    <ul className="dropdown-menu d-flex flex-column">
                    <li><Link to='/About'>About us</Link></li>
                    {/* <li><Link to='/Complaint'>Complaint</Link></li> */}
                    <li><Link to='/' onClick={handleSignOut}>Sign out</Link></li>
                    </ul>
                )}
            </li>
        </ul>
    </nav>
  )
}

export default Navbar2