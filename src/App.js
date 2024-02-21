// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/login';
import Addproducts from './components/addproducts';
import Adminpage from './components/adminpage';
import User from './components/userlist';
import Userlist from './components/userlist';
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
      </Routes>
    </Router>

  );
};

export default App;
