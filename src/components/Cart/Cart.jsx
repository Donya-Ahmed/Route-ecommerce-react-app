import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../context/cartContext";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let { getLoggedUserCart, deleteItem, updateItem, deleteCart } =
    useContext(CartContext);
  let navigate = useNavigate();
  let [products, setProducts] = useState([]);
  let [data, setData] = useState(null);

  // var updateMap;
  let [updateMap, setUpdateMap] = useState(new Map());
  let [countMap, setCountMap] = useState(new Map());
  const [selected, setSelected] = useState(null);
  let [loading, setLoading] = useState(false);
  let [deleteB, setDeleteB] = useState(false);
  let [loadingUpdate, setloadingUpdate] = useState(false);
  const [myMap, setMyMap] = useState(new Map());
  const newMap = new Map(myMap);
  const [inputValue, setInputValue] = useState("");
  if (!localStorage.getItem("payment")) {
    localStorage.setItem("payment", "cash");
  }
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("payment")
  );

  const handleInputChange = (event, i) => {
    if (Number(event.target.value) > 0) {
      newMap.set(i, Number(event.target.value));

      setMyMap(newMap);
    } else {
      toast.error("invalid quantity");
    }
  };

  useEffect(() => {}, [myMap]);
  useEffect(() => {
    localStorage.setItem("payment", selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    setLoading(true);
    let response = await getLoggedUserCart();

    if (response.data?.data?.products) {
      setData(response.data.data.totalCartPrice);
      setProducts(response.data.data.products);

      response.data.data.products.map((product, i) => {
        newMap.set(i, product.count);
      });

      setMyMap(newMap);
    } else {
      setDeleteB(true);
    }
    setLoading(false);
  }

  function handleChange(option) {
    setSelected(option.target.value);
  }
  async function deleteCartAllProducts() {
    let response = await deleteCart();

    if (response.data.message == "success") {
      setDeleteB(true);
      toast.success("Products deleted successfully");
    }
  }

  async function UpdateCountItem(count, id) {
    setloadingUpdate(true);
    let response = await updateItem(count, id);

    if (response.data.status === "success") {
      toast.success("Product Updated successfully");
      setProducts(response.data.data.products);
      setData(response.data.data.totalCartPrice);
      setloadingUpdate(false);
    }
  }

  async function removeItem(id) {
    setLoading(true);
    let response = await deleteItem(id);

    if (response.data.status === "success") {
      toast.success("Product deleted successfully");
      setProducts(response.data.data.products);
      setLoading(false);
    }
  }
  function returnHome() {
    navigate("/");
  }
  function handleRadio(e) {
    setSelectedOption(e.target.value);
  }
  function handleOrder() {
    if(localStorage.getItem('payment')=='cash'){
      navigate('/cash')
    }
    else if (localStorage.getItem('payment')=='online'){
      navigate('/online')
    }
  }
  return (
    <>
    <div className="container">
    {loading ? (
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div>
          {deleteB ? (
            <div className="d-flex justify-content-center pt-5 align-content-center">
              <button className="btn btnCart" onClick={returnHome}>
                Return to shop
              </button>
            </div>
          ) : (
            <div className="row pt-5" id="boxContent">
              <div className="col-md-9">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qantity</th>
                      <th>Update</th>
                      <th>SubTotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product, index) => (
                      <tr key={index} className="align-middle">
                        <td className="align-middle">
                          <button
                            className={` btn border-0 ${styles.ihover}`}
                            onClick={() => removeItem(product.product._id)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                        <td className="w-40">
                          <img
                            src={product.product.imageCover}
                            className="w-25 me-3"
                            alt=""
                          />
                          <span>
                            {product.product.title
                              .split(" ")
                              .slice(0, 2)
                              .join(" ")}
                          </span>
                        </td>
                        <td>{product.price}</td>
                        <td>
                          <input
                            value={newMap.get(index)}
                            className="w-25 text-center"
                            id={`inp${index}`}
                            type="number"
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                          />
                        </td>

                        <td>
                          {loadingUpdate ? (
                            <button
                              className=" btn btnCart w-100 font-sm"
                              onClick={() =>
                                UpdateCountItem(
                                  myMap.get(index),
                                  product.product._id
                                )
                              }
                            >
                              <i className="fas fa-spinner fa-spin"></i>
                            </button>
                          ) : (
                            <button
                              className=" btn btnCart w-100 font-sm"
                              onClick={() =>
                                UpdateCountItem(
                                  myMap.get(index),
                                  product.product._id
                                )
                              }
                            >
                              Update Cart
                            </button>
                          )}
                        </td>
                        <td>{product.price * product.count}EGP</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={`col-md-3 ${styles.cartTotal} h-100`}>
                <div className="p-3">
                  <div
                    className={`d-flex justify-content-between ${styles.bor} pb-2 align-items-center`}
                  >
                    {" "}
                    <h6 className={`fw-bold   text-main `}>CART TOTALS</h6>
                    <div>
                      <button
                        className="btn btn-CLEAR font-sm"
                        onClick={deleteCartAllProducts}
                      >
                        Clear Cart{" "}
                        <i className="fa-solid fa-trash-can ms-1"></i>
                      </button>
                    </div>
                  </div>
                  <p className="d-flex justify-content-between  mt-4">
                    <span>Subtotal:</span>
                    <span>{data}</span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <span>Shipping:</span>
                    <span>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="shipping"
                        onChange={handleChange}
                      >
                        <option selected></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </span>
                  </p>
                  <div>
                    <div className="mb-2">
                      <input
                        type="radio"
                        value="cash"
                        name="payment"
                        checked={selectedOption == "cash"}
                        onClick={(e) => handleRadio(e)}
                      />{" "}
                      Cash Order
                    </div>
                    <div>
                      <input
                        type="radio"
                        value="online"
                        name="payment"
                        checked={selectedOption == "online"}
                        onClick={(e) => handleRadio(e)}
                      />{" "}
                      Online Payment
                    </div>
                    <div className="mt-4">
                      <button className="btn bg-main text-white w-100" onClick={handleOrder}>
                        Check Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
}
