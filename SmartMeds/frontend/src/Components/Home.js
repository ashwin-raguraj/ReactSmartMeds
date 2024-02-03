import React from 'react'
import Navbar from './Navbar'
import './Home.css'
import Footer from './Footer'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
        <nav>
            <Navbar/>
        </nav>
        <body className='home-page'>
            <div className='home-body'>
                <div className='text-container'>
                    <h1>
                        Discover new flavors, delivered to your door.
                    </h1>
                    <div>
                        <h2>Welcome to Foodiko</h2>
                        <p>We are a one-stop-shop for all your food needs, 
                            bringing together the best restaurants and cuisines from around the world.</p>
                    </div>
                </div>
                <img className='img-fluid rounded float-right' src={require('../Assets/Home-Page-Food.png')} alt="" />
            </div>
            <div className="container-fluid p-0">
                <div class="d-flex justify-content-between gap-5">
                    <img src={require('../Assets/Home-Food-1.png')} class="img1 rounded float-left img-fluid " alt=""/>
                    <div className='txt1 d-flex flex-column justify-content-center'>
                        <h2>Order your favorite food from your favorite restaurant</h2>
                        <p>With Foodiko, you can order from your favorite restaurants with just a few clicks.
                             Whether you're craving pizza, sushi, or anything in between, we've got you covered.</p>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-0">
                <div class="d-flex justify-content-between gap-5">
                    <div className='txt1 d-flex flex-column justify-content-center'>
                        <h2>Quick and easy ordering</h2>
                        <p>Our website is designed to make ordering food as quick and easy as possible. 
                            Simply choose your restaurant, browse the menu, and place your order – it's that simple!</p>
                    </div>
                    <img src={require('../Assets/Home-Food-2.png')} class="img1 rounded float-right img-fluid "  alt=""/>
                </div>
            </div>
            <div className="container-fluid p-0">
                <div class="d-flex justify-content-between gap-5">
                    <img src={require('../Assets/Home-Food-3.png')} class="img1 rounded float-left img-fluid " alt=""/>
                    <div className='txt1 d-flex flex-column justify-content-center'>
                        <h2>Ready to order delicious food? Sign up or log in now!</h2>
                        <p>It only takes a few seconds to sign up or log in – why not get started now?</p>
                        <div className="d-flex flex-column gap-3">
                            <Link to='/Signup' class="btn custom-button btn-lg">Sign Up</Link>
                            <Link to='/Login' class="btn custom-button btn-lg">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Home
