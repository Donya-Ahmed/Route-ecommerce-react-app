import axios from "axios";
import { createContext, useState } from "react";

export const CartContext = createContext();
export function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  async function addToCart(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      );
      return data;
    } catch (err) {
      return err;
    }
  }
  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function deleteItem(productI) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productI}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function updateItem(count,productI) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productI}`,
        {
          count:count ,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function deleteCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  return (
    <CartContext.Provider value={{ addToCart, getLoggedUserCart, deleteItem ,updateItem ,deleteCart ,headers}}>
      {props.children}
    </CartContext.Provider>
  );
}
