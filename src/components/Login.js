import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handlelogin = () => {
        if (username === 'tranlamnhu' && password === 'khung') {
            navigate('/home');
        }
        else {
            alert('Đăng nhập không thành công!. Kiểm tra lại cái coi đcm');
        }
    };

    return (
        <div class="container mt-5 pt-5">
            <div class="row">
                <div class="col-12 col-sm-6 col-md-5 m-auto">
                    <div class="card border-0 shadow p-5 mt-5">
                        <div class="text-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16 ">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>
                        </div>
                        <div class="card-body">
                            <h2 class="text-center">Đăng nhập</h2>
                            <form>
                                <div class="mb-3 mt-3">
                                    <input placeholder="Tên đăng nhập" class="form-control my-4 py-3" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div class="mb-3">
                                    <input placeholder="Mật khẩu" class="form-control my-4 py-3" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div class="text-center mt-3">
                                    <button type="submit" class="btn btn-primary" onClick={handlelogin}>Đăng nhập</button>
                                    <a href="https://www.w3schools.com/bootstrap5/bootstrap_grid_xsmall.php" class="nav-link">Đã có mật khẩu?</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;