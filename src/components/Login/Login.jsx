import React, { useState } from 'react'
import styles from './Login.module.css'
import {  useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function Login({saveUserData}) {
  let [loading,setLoading]=useState(false)
  let [errorMsg,setErrorMsg]=useState('')
  let navigate=useNavigate()
   async function handleLogin(values) {
    setLoading(true)
    //send to api
    try{
      let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
   

    if(data.message=='success'){
      localStorage.setItem('userToken',data.token)
      saveUserData()
      setLoading(false)
      setErrorMsg('')
      navigate('/')
    }
    }
    catch (error){

      setLoading(false)
      setErrorMsg(error.response.data.message)
    
    }
  }
  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Email is not valid'),
    password:Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/,'Password is not valid')
  })

  let formik=useFormik({
    initialValues:{ 
    email:"",
    password:"",
    },
    validationSchema,
    onSubmit:handleLogin
  })
 
  return <>
  <div className='row justify-content-center pt-5'>
   <div className='col-9'>
   <h2 className='mb-4'>Login Now....</h2>
   {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}
  <form onSubmit={formik.handleSubmit}>
    <label htmlFor='email'>Email:</label>
    <input className='form-control mb-2' value={formik.values.email} name='email' id='email' onChange={formik.handleChange} type='email' onBlur={formik.handleBlur}/>
    {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:''}
    <label htmlFor='password'>Password:</label>
    <input className='form-control mb-2' value={formik.values.password} name='password' id='password' onChange={formik.handleChange} type='password' onBlur={formik.handleBlur}/>
    {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:''}
    {loading?<button  type='button' className=' btn bg-main text-white'><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>
:<button disabled={!(formik.dirty && formik.isValid)} type='submit' className=' btn bg-main text-white'>Login</button>
}
  </form>
   </div>
  </div>
  
  
  </>
}
