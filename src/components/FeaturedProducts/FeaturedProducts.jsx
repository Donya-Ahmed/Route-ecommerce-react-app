import React, { useContext, useEffect, useState } from 'react'
import styles from './FeaturedProducts.module.css'
import  axios  from 'axios'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/cartContext'
import toast, { Toaster } from 'react-hot-toast';
import { WishListContext } from '../../context/wishListContext' 
export default function FeaturedProducts() {
  let {addToCart}=useContext(CartContext)
  let {addToWishList}=useContext(WishListContext)
  async function addProduct(productId) {
    let response =await addToCart(productId)
    if(response.status=='success'){
      toast.success(response.message)
    }
    else{
      toast.error("Oops, something wasn't right")
    }
    
    
  }
  let [products,setProduct]=useState([])
  let [loading,setLoading]=useState(false)
 
  async function getProducts() {
    setLoading(true)
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    setProduct(data.data)
    setLoading(false) 
  }
 
  useEffect(()=>{
    getProducts()
   },[])

  return<>
    {loading?<div className="lds-facebook lds-facebookE"><div></div><div></div><div></div></div>:<div className='row gy-5 mt-4'>
    {
       products.map((product)=>{
        return  <>
        <div key={product._id} className='col-xl-2 col-lg-3   col-md-4 product p-3 cursor-pointer '>
       <Link to={`products/${product.id}`}>
         <div>
            <img src={product.imageCover} className='w-100'/>
           <div className='d-flex justify-content-between'>
           <span className='font-sm text-main fw-bold'>{product.category.name}</span>
           
           </div>
            <h6 className='fw-bolder'>{product.title.split(' ').slice(0,2).join(' ')}</h6>
            <div className='d-flex justify-content-between'>
              <span className='text-muted'>{product.price}EGP</span>
              <span className='text-muted'><i className="fa-solid fa-star rating-color"></i>{product.ratingsAverage}</span>
              </div>
             

          </div>
       
       </Link>
       <button className='btn  bg-main text-white w-100' onClick={()=>addProduct(product._id)}>+Add</button>

        </div>
        </>
       
       }
      

       )
    }
  </div>}
  </>
}
