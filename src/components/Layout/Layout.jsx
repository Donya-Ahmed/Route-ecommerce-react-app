import React from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout({userData,setUserData}) {
  let navigate=useNavigate()
  function logOut() {
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/')

  }
  return <>
  <Navbar userData={userData} logOut={logOut}></Navbar>
  <div className='pt-5'>
       <Outlet></Outlet>
  </div>
  </>
}
