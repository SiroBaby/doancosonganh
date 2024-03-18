import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();
    const {token} = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Thực hiện kiểm tra mật khẩu và gửi yêu cầu đặt lại mật khẩu đến server
            const response = await axios.post('http://localhost:3308/reset-password', { password, confirmPassword, token });
            setMessage(response.data.message);
            alert('Khôi phục mật khẩu thành công')
            navigate('/')
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to reset password');
        }
    };

    return (
        <div>
            <div className="header">
                <img src="https://i.pinimg.com/564x/77/ef/75/77ef756d65375e2bed903092c592f063.jpg" height="160" width="160" alt="logo" />
                <h1>Pressure Store</h1>
            </div>

            <div className="container">
                <div className="row mt-5 mb-5">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Đặt lại mật khẩu</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Mật khẩu mới</label>
                                        <input type="password" className="form-control" id="password" name="password"
                                            placeholder="Nhập mật khẩu mới" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword"
                                            placeholder="Xác nhận mật khẩu mới" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Đặt lại mật khẩu</button>   
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

export default ResetPassword;
