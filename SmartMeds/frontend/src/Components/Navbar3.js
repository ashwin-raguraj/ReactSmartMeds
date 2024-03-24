import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import axios from 'axios';
import { ImMenu3 } from 'react-icons/im';
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
  return (
    <nav className='navbar'>
        <div className='site-title'>
            <img src={require('../Assets/Icon.png')} alt=""/>
            <div >SmartMeds Connect</div>
        </div> 
        <ul>
            <li className='nav-item'>
                <Link to='/DocDashboard'>Dashboard</Link>
            </li>
            {/* <li className='nav-item'>
                <Link to='/Order'>Orders</Link>
            </li>
            <li className='nav-item'>

                <Link to='/Cart'>Cart</Link>

            </li> */}
            {/* <li className='nav-item'>
                <Link to='/Checkout'>Checkout</Link>
            </li> */}
            <li className='nav-item'>
                {/* <img src={require('../Assets/Profile.png')}  alt="" className='img-fluid w-50 profile-picture' onClick={toggleDropdown}/> */}
                <ImMenu3 onClick={toggleDropdown} className='drop-down-menu-icon' size={37} />
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

export default Navbar3