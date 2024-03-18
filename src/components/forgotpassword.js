import React, { useState } from "react";
import axios from "axios";
import logonobr from "../logo no-background.png";
import logo from "../Logo.png";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Gửi yêu cầu quên mật khẩu đến server
            const response = await axios.post('http://localhost:3308/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to send email');
        }
    };

    return (
        <div>
            <div className="header">
                <img src={logonobr} height="160" width="160" alt="logo" />
                <h1>Pressure Store</h1>
            </div>

            <div className="container">
                <div className="row mt-5 mb-5">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Quên mật khẩu</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" name="email"
                                            placeholder="Nhập email của bạn" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Gửi</button>  
                                    <Link to={"/"} className="btn btn-primary">Quay lại</Link>   
                                </form>
                                {message && <p>{message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <h1>&nbsp;</h1>
            </div>
        </div>
    )
}

export default ForgotPassword;
