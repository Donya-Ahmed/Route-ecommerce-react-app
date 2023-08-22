import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Favorites from './components/Favorites/Favorites';
import Categories from './components/Categories/Categories';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import DetailProduct from './components/DetailProduct/DetailProduct'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CartContextProvider } from './context/cartContext';
import { WishListContextProvider } from './context/wishListContext';
import CashOrder from './components/CashOrder/CashOrder';
import OnlineOrder from './components/OnlineOrder/OnlineOrder';

function App() {
   useEffect(()=>{
    if(localStorage.getItem('userToken')){
      saveUserData()
    }
   },[])
  let [userData,setUserData]=useState(null)
  function saveUserData() {
    const encodeToken=localStorage.getItem('userToken')
    const decodeToken=jwtDecode(encodeToken)
    setUserData(decodeToken)

  }
  let routes=createBrowserRouter([
    {path:"",element:<Layout userData={userData} setUserData={setUserData}></Layout>,children:[
      {index:true,element:<Home></Home>},
      {path:'cart',element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'favorites',element:<ProtectedRoute><Favorites></Favorites></ProtectedRoute>},
      {path:'brands',element:<ProtectedRoute><Brands></Brands></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories></Categories></ProtectedRoute>},
      {path:'login',element:<Login saveUserData={saveUserData}></Login>},
      {path:'register',element:<Register></Register>},
      {path:'/products/:id',element:<DetailProduct></DetailProduct>},
      {path:'/cash',element:<ProtectedRoute><CashOrder></CashOrder></ProtectedRoute>},
      {path:'/online',element:<ProtectedRoute><OnlineOrder></OnlineOrder></ProtectedRoute>}
      

    ]}
  ])
 return <>

<CartContextProvider>
<WishListContextProvider>
<RouterProvider router={routes}></RouterProvider>
<Toaster />
</WishListContextProvider>
</CartContextProvider>

 </>
}

export default App;
