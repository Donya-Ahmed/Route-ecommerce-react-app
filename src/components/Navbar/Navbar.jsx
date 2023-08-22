import React from 'react'
import styles from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link } from 'react-router-dom'
export default function Navbar({userData,logOut}) {
  return <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
      <a className="navbar-brand" href="#"><img src={logo}/></a>
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        {userData?<ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
         
          <li className="nav-item">
            <Link className="nav-link" to="/favorites">Favorites</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categories">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/brands">Brands</Link>
          </li>
         
        </ul>:null}
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
        <li className="nav-item d-flex align-items-center">
        <i className="fa-brands mx-2 fa-instagram"></i>
        <i className="fa-brands mx-2 fa-facebook"></i>
        <i className="fa-brands mx-2  fa-twitter"></i>
        <i className="fa-brands mx-2  fa-youtube"></i>
        <i className="fa-brands mx-2  fa-linkedin"></i>
        <i className="fa-brands mx-2  fa-tiktok"></i>
          </li>
          {userData?<><li className="nav-item">
            <Link className="nav-link" onClick={logOut}>Logout</Link>
          </li> <li className="nav-item">
            <Link className="nav-link position-relative" to="/cart"><i className="fa-solid fa-cart-shopping fa-lg "></i><span className='spanCart'>0</span></Link>
          </li></>:<>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          </>}
         
        
        </ul>
       
      </div>
    </div>
  </nav>
  
  </>
   
  
}
