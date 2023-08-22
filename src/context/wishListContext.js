import axios from "axios";
import { createContext } from "react";
import { CartContext } from "./cartContext";
import { useContext } from "react";

export const WishListContext =createContext();
export function WishListContextProvider(props) {
   let{headers}=useContext(CartContext) 
  async function addToWishList(productId) {
     try{
        let data=axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            productId:productId
        },{
            headers:headers
        })
         
        return data 
     }
     catch(err){
        console.log(err);
        return err
     }
  }
  
   async function getAllWishList (){
     try{
      let data =await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      headers:headers
     })
     return data
     }
     catch(err){
        return err
     }

   }
 async function removeItemWish(productId) {
   try{
    let data= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
      headers:headers
    })
    return data
   }
   catch(err){
       return err
   }
 }

    return (
        <WishListContext.Provider value={{addToWishList ,getAllWishList ,removeItemWish}}>
         {props.children}
    </WishListContext.Provider>
    )
}
