import React, { useContext, useEffect, useState } from 'react'
import styles from './DetailProduct.module.css'
import { Routes, Route, useParams } from 'react-router-dom';
import Slider from "react-slick";
import axios from 'axios';
import { CartContext } from '../../context/cartContext'
import toast, { Toaster } from 'react-hot-toast';
import { WishListContext } from '../../context/wishListContext'
export default function DetailProduct() {
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
  let { id } = useParams();
  let [product,setProduct]=useState({})
  let [images,setImages]=useState([])
  let [loading,setLoading]=useState(false)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  useEffect(()=>{
    getProduct(id)
   
  },[])

  async function addWishList(productId) {
    let response= await addToWishList(productId)
    console.log(response)
    if(response.data?.status=='success'){
      toast.success(response.data.message)
    }
     
   }
 async function getProduct(id){
  
    setLoading(true)
    let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    console.log(data)
    setProduct(data.data)
    setImages(data.data.images);
    setLoading(false)
  }
  return <>
   {loading?<div className="lds-facebook"><div></div><div></div><div></div></div>:<>
   <div className='row mt-5'>
   <div className='col-md-3'>
   <Slider {...settings}>
     {images.map((image,index)=><div key={index}>
        <img src={image} className='w-100' />

     </div>)}
     </Slider>
   </div>
   <div className='col-md-9 d-flex align-items-center'>
    <div className="w-100">
        <h3>{product.title}</h3>
        <p className='text-muted'>{product.description}</p>
        <h6 className='font-sm text-main mt-4'>{product.slug}</h6>
        <div className='d-flex justify-content-between'>
              <span className='text-muted'>{product.price}EGP</span>
              <span className='text-muted'><i className="fa-solid fa-star rating-color"></i>{product.ratingsAverage}</span>
              </div>
              <div className='mt-4'> <button className={` btn ${styles.btnWish} p-2`}  onClick={()=>addWishList(product._id)}>Add to wishlist <i class="fa-solid fa-heart"></i></button> <button className='btn  btnCart  p-2' onClick={()=>addProduct(product._id)}>+Add to cart <i class="fa-solid fa-cart-shopping"></i></button></div>      
    </div>

   </div>

   </div>
   
   </>}
  </>
}
