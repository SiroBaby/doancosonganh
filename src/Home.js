// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    
    const navigate = useNavigate();
    const Btngiohang = () =>{
        navigate('/giohang');
    }
  return (
    <div>
      <h2>Trang chủ</h2>
      <p>Chào mừng bạn đến với trang chủ!</p>
      <button onClick={Btngiohang}>Giỏ hàng</button>
    </div>
  );
};

export default Home;
