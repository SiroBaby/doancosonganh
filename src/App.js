// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/login';
import Addproducts from './components/addproducts';
import Adminpage from './components/adminpage';
import User from './components/userlist';
import Userlist from './components/userlist';
import Editproducts from './components/Editproducts';
import Editpicture from './components/Editpicture';
import Trangchu from './components/Trangchu';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/home" Component={Home} />
        <Route path="/" Component={Login} /> 
        <Route path="/giohang" Component={GH} /> */}
        <Route path='/' Component={Login}/>
        <Route path='/addproducts' Component={Addproducts}/>
        <Route path='/admin' Component={Adminpage}/>
        <Route path='/user' Component={Userlist}/>
        <Route path='/editproducts/:id' Component={Editproducts}/>
        <Route path='/editpicture/:id' Component={Editpicture}/>
        <Route path='/trangchu' Component={Trangchu}/>
      </Routes>
    </Router>

  );
};

export default App;
