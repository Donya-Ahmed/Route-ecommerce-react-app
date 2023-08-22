import React, { useContext, useEffect, useState } from "react";
import styles from "./Favorites.module.css";
import { Axios } from "axios";
import { CartContext } from "../../context/cartContext";
import { WishListContext } from "../../context/wishListContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  let  navigate=useNavigate()
  let { addToCart } = useContext(CartContext);
  let { getAllWishList ,removeItemWish} = useContext(WishListContext);
  let [wishList, setWishList] = useState([]);
  let [loading, setLoading] = useState(false);
  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add(`${styles.heart}`);
    const containerfav = document.getElementById("containerfav");

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.animationDuration = Math.random() * 2 + 3 + "s";

    heart.innerText = "💗";

    containerfav.appendChild(heart);

    // setTimeout(() => {
    //   heart.style.opacity=0;
    // }, 3000);
  }
  async function getWish() {
    setLoading(true);
    let response = await getAllWishList();
   
  
    
    if (response.data?.status == "success") {
      
      setWishList(response.data.data);
    }
    setLoading(false);
  }
  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.status == "success") {
      toast.success(response.message);
    } else {
      toast.error("Oops, something wasn't right");
    }
    
  }
  async function deleteItem(productId) {
    setLoading(true);
    let response =await removeItemWish(productId)
    if(response?.data?.status=='success'){

      toast.success(response.data.message)
      console.log(response);
      setWishList(response.data)
    }
    setLoading(false);
  }
  function returnHome() {
    navigate("/");
  }
  useEffect(() => {
   setInterval(() => {  createHeart() }, 1500)
    getWish();
    return () => {
      const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);

      // Clear any timeout/interval up to that id
      for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
      }
    };
  }, []);

  return (
    <>
      <div className="container">
      <div className="mt-5">
        <div className={`${styles.containerfav}`}>
          <h2 id="containerfav" className={`${styles.title}`}>
            My Wishlist
          </h2>
        </div>
      
        {!loading ? (
          <>
         {wishList.length>0? <table class="table w-75 mx-auto mt-3">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Ptoduct Name</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Stock status</th>
                <th scope="col"></th>
              </tr>
            </thead>

            <tbody>
              {wishList.map((item) => (
                <tr className="align-middle">
                  <td className="align-middle">
                    <button className={` btn border-0 ${styles.ihover}` } onClick={()=>{deleteItem(item.id)}}>
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                  <td className="w-40">
                    <img src={item.imageCover} className="w-25 me-3" alt="" />
                    <span>{item.title.split(" ").slice(0, 2).join(" ")}</span>
                  </td>
                  <td>{item.price}EGP</td>
                  <td>{item.quantity > 0 ? "In Stock" : "Out Stock"}</td>
                  <td>
                    <button
                      className="btn  btnCart "
                      onClick={() => addProduct(item.id)}
                    >
                      Add to cart <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>:<div className="d-flex justify-content-center pt-5 align-content-center">
              <button className="btn btnCart" onClick={returnHome}>
                Return to shop
              </button>
            </div>}
          </>
        ) : (
          <div className="wrapperContainer">
          <div className="wrapper">
             <div className="pulsingheart"></div>
           </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
