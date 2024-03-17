// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Addproducts from './components/addproducts';
import Adminpage from './components/adminpage';
import Userlist from './components/userlist';
import Editproducts from './components/Editproducts';
import Editpicture from './components/Editpicture';
import Trangchu from './components/Trangchu';
import ProductDetail from './components/ProductDetail';
import Cart from './components/cart';
import Payment from './components/payment';
import Order from './components/order';
import Orderdetail from './components/orderdetail';
import AllProducts from './components/AllProducts';
import Natural from './components/Natural';
import Artificial from './components/Artificial'
import OrderManagement from './components/ordermanagement';
const App = () => {

  return (
    <Router>
      <Routes>
        {/* <Route path="/home" Component={Home} />
        <Route path="/" Component={Login} /> */}
        <Route path='/login' element={<Login/>} />
        <Route path='/addproducts' element={<Addproducts/>} />
        <Route path='/admin' element={<Adminpage/>} />
        <Route path='/user' element={<Userlist/>} />
        <Route path='/editproducts/:id' element={<Editproducts/>} />
        <Route path='/editpicture/:id' element={<Editpicture/>} />
        <Route path='/' element={<Trangchu/>} />
        <Route path="/product-detail/:id" element={<ProductDetail/>} />
        <Route path='/giohang/:id' element={<Cart/>}/>
        <Route path='/payment/:id' element={<Payment/>}/>
        <Route path='/dondh/:id' element={<Order/>}/>
        <Route path='/orderdetail/:id/:ma_van_don' element={<Orderdetail/>}/>
        <Route path='/AllProducts' element={<AllProducts/>} />
        <Route path='/Natural' element={<Natural/>} />
        <Route path='/Artificial' element={<Artificial/>} />
        <Route path='/OrderManagement' element={<OrderManagement/>} />
      </Routes>
    </Router>

  );
};

export default App;
