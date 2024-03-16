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
const App = () => {

  return (
    <Router>
      <Routes>
        {/* <Route path="/home" Component={Home} />
        <Route path="/" Component={Login} /> */}
        <Route path='/login' Component={Login} />
        <Route path='/addproducts' Component={Addproducts} />
        <Route path='/admin' Component={Adminpage} />
        <Route path='/user' Component={Userlist} />
        <Route path='/editproducts/:id' Component={Editproducts} />
        <Route path='/editpicture/:id' Component={Editpicture} />
        <Route path='/' Component={Trangchu} />
        <Route path="/product-detail/:id" Component={ProductDetail} />
        <Route path='/giohang/:id' Component={Cart}/>
        <Route path='/payment/:id' Component={Payment}/>
        <Route path='/dondh' Component={Order}/>
      </Routes>
    </Router>

  );
};

export default App;
