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
const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/home" Component={Home} />
        <Route path="/" Component={Login} /> 
        <Route path="/giohang" Component={GH} /> */}
        <Route path='/' Component={Login} />
        <Route path='/addproducts' Component={Addproducts} />
        <Route path='/admin' Component={Adminpage} />
        <Route path='/user' Component={Userlist} />
        <Route path='/editproducts/:id' Component={Editproducts} />
        <Route path='/editpicture/:id' Component={Editpicture} />
        <Route path='/trangchu' Component={Trangchu} />
        <Route path="/product-detail/:id" Component={ProductDetail} />
      </Routes>
    </Router>

  );
};

export default App;
