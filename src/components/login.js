import React, {useEffect, useState} from "react";
import {useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/login.css';

const Login = () =>{
    const Navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const gateQuenMK = () => {
      Navigate('/quenmatkhau');
    }

    const gateSignup = () => {
      Navigate('/dangky');
    }

    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById("password-input");
        const toggleButton = document.getElementById("toggle-password");
    
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          toggleButton.textContent = "Hiện";
        } else {
          passwordInput.type = "password";
          toggleButton.textContent = "Ẩn";
        }
    };

    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3308/login', { phone, password });
        
        if (response.status === 200) {
          // Đăng nhập thành công
          console.log('Login successful');
          // Chuyển hướng đến trang Dashboard hoặc trang khác tùy ý
          Navigate('/addproducts');
        } else {
          // Đăng nhập thất bại
          console.log('Login failed');
          console.error('Login failed:', response.data.error);
        }
      } catch (error) {
        console.log('Login failed');
        console.error('Error during login:', error);
      }
    }
//<----------------------------Test đổ dữ liệu từ dtb vào--------------------------------->

    // const [username, setUsername] = useState('')

    // useEffect(() => {
    //   // Fetch username data when component mounts
    //   fetch('http://localhost:3308/getUsername')
    //     .then(res => res.json())
    //     .then(data => {
    //       // Assuming data is an array and the first user's username is needed
    //       if (data.length > 0) {
    //         setUsername(data[0].Username);
    //       }
    //     })
    //     .catch(error => console.error('Error fetching username: ', error));
    // }, []);

//<----------------------------Test đổ dữ liệu từ dtb vào--------------------------------->

    return (
        <div>
          <div className="row-header py-4">
            <div className="col1">
              <img src="images/" alt="LOGO" />
            </div>
          </div>
    
          <div className="container py-5 d-flex justify-content-center">
            <div className="wrapper">
              <div className="row">
                <div className="col-12 text-center">
                  <h2 className="mt-4">Đăng nhập</h2>
                </div>
              </div>
    
              <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                  <form id="login-form" className="my-4" onSubmit={handleLoginSubmit}>
                    <div className="box-input mb-3 ">
                      <label htmlFor="phone-input" className="form-label">Số điện thoại:</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        id="phone-input" 
                        placeholder="Nhập số điện thoại" 
                        pattern="[0-9]{10}" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} />
                    </div>
    
                    <div className="box-input mb-3">
                      <label htmlFor="password-input" className="form-label">Mật khẩu:</label>
                      <div className="input-group">
                        <input 
                          type="password" 
                          className="form-control" 
                          id="password-input" 
                          placeholder="Nhập mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} />
                        <button className="btn btn-outline-secondary" type="button" id="toggle-password" onClick={togglePasswordVisibility}>Ẩn</button>
                      </div>
                    </div>
    
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="remember-me" />
                      <label className="form-check-label" htmlFor="remember-me">Nhớ đăng nhập</label>
                    </div>
    
                    <div className="dangnhap">
                      <button className="btn btn-primary" type="submit">Đăng nhập</button>
                    </div>
    
                    <p className="remember-forgot text-center mt-3">
                      <a href="#" onClick={gateQuenMK}>Quên mật khẩu?</a>
                    </p>
                    <div className="register-link">
                      <p>Không có tài khoản? <a href="#" onClick={gateSignup}>Đăng ký</a></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default Login;