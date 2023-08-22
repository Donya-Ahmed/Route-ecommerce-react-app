import React, { useState } from 'react'
import styles from './Register.module.css'
import {  useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Register() {
  let [loading,setLoading]=useState(false)
  let [errorMsg,setErrorMsg]=useState('')
  let navigate=useNavigate()
   async function handleRegister(values) {
    setLoading(true)
    //send to api
    try{
      let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)


    if(data.message=='success'){
      setLoading(false)
      setErrorMsg('')
      navigate('/login')
    }
    }
    catch (error){
      setLoading(false)
      setErrorMsg(error.response.data.message)
    }
  }
 
  function validate(values){
 
    let errors={}
    //name validation
    if(!values.name){errors.name='Name is required'}
    else if(values.name.length<3){errors.name='Length must be more than 3 character'}
    else if(values.name.length>10){errors.name='Length must be less than 10 character'}
     //email validation
    if(!values.email){errors.email='Email is required'}
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){errors.email='Email is not valid'}
     //password validation
     if(!values.password){errors.password='Password is required'}
     else if(!/^[A-Z][a-z0-9]{5,10}$/i.test(values.password)){errors.password='Password is not valid'}
      //repassword validation
      if(!values.rePassword){errors.rePassword='Repassword is required'}
      else if(values.rePassword !== values.password){errors.rePassword='RePassword and password is not matching'}
       //phone validation
       if(!values.phone){errors.phone='Phone is required'}
       else if(!/^[0][1][125][0-9]{8}$/i.test(values.phone)){errors.phone='phone is not valid'}
     
    return errors
  }
  let formik=useFormik({
    initialValues:{ 
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },
    validate,
  //  validate:(values)=>validation(values),
    onSubmit:handleRegister
  })
 
  return <>
  <div className='container'>
  <div className='row justify-content-center pt-5'>
   <div className='col-9'>
   <h2 className='mb-4'>Register Now....</h2>
   {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}
  <form onSubmit={formik.handleSubmit}>
    <label htmlFor='name'>Name:</label>
    <input  className='form-control mb-2' value={formik.values.name} name='name' id='name' onChange={formik.handleChange} type='text' onBlur={formik.handleBlur}/>
    {formik.errors.name && formik.touched.name?<div className="alert alert-danger">{formik.errors.name}</div>:''}
    <label htmlFor='email'>Email:</label>
    <input className='form-control mb-2' value={formik.values.email} name='email' id='email' onChange={formik.handleChange} type='email' onBlur={formik.handleBlur}/>
    {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:''}
    <label htmlFor='password'>Password:</label>
    <input className='form-control mb-2' value={formik.values.password} name='password' id='password' onChange={formik.handleChange} type='password' onBlur={formik.handleBlur}/>
    {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:''}
    <label htmlFor='rePassword'>RePassword:</label>
    <input className='form-control mb-2' value={formik.values.rePassword} name='rePassword' id='rePassword' onChange={formik.handleChange} type='password' onBlur={formik.handleBlur}/>
    {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger">{formik.errors.rePassword}</div>:''}
    <label htmlFor='phone'>Phone:</label>
    <input className='form-control mb-2' value={formik.values.phone} name='phone' id='phone' onChange={formik.handleChange} type='tel' onBlur={formik.handleBlur}/>
    {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger">{formik.errors.phone}</div>:''}
    {loading?<button  type='button' className=' btn bg-main text-white'><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>
:<button disabled={!(formik.dirty && formik.isValid)} type='submit' className=' btn bg-main text-white'>Register</button>
}
  </form>
   </div>
  </div>
  
  </div>
  
  </>
}
