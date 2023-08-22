import React, { useEffect } from 'react'
import styles from './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import Header from '../Header/Header'
import SliderMain from '../SliderMain/SliderMain'
export default function Home() {
 
  return <>
   <div className='container'>
   <Header></Header>
  <SliderMain></SliderMain>
  <FeaturedProducts></FeaturedProducts>
   </div>
  
  </>
}
