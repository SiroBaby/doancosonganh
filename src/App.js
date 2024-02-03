// src/App.js
import React from 'react';
import GH from './GH';
import Login from './components/Login';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" Component={Home} />
        <Route path="/" Component={Login} /> 
        <Route path="/giohang" Component={GH} />
      </Routes>
    </Router>

  );
};

export default App;
