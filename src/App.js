// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/login';
import Addproducts from './components/addproducts';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/home" Component={Home} />
        <Route path="/" Component={Login} /> 
        <Route path="/giohang" Component={GH} /> */}
        <Route path='/' Component={Login}/>
        <Route path='/addproducts' Component={Addproducts}/>
      </Routes>
    </Router>

  );
};

export default App;
