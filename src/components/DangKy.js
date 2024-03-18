import React, { useState } from "react";
import "../css/dangky.css";
import logonobr from "../logo no-background.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const DangKy = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        Username: '',
        Password: '',
        ConfirmPassword: '',
        Email: '',
        Phone: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const response = await axios.post('http://localhost:3308/addmember', {
                Username: value.Username,
                Password: value.Password,
                ConfirmPassword: value.ConfirmPassword, // Sử dụng giá trị ConfirmPassword
                Email: value.Email,
                Phone: value.Phone,
            });

            if (value.Password !== value.ConfirmPassword) {
                alert("Mật khẩu nhập lại không khớp với mật khẩu đã nhập. Vui lòng kiểm tra lại!");
                return;
            }


            if (response.data.status === 'success') {
                alert('Thêm thành viên thành công!');
                navigate("/login");
            } else {
                alert('Thêm thành viên thất bại!');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Đã xảy ra lỗi khi thêm thành viên !');
        }
    };

    return (
        <div className="container-fluid">
            <div className="row1">
                <div className="col">
                    <Link to="/"><img src={logonobr} height="130" width="130" alt="logo" onClick={() => navigate("/")} /></Link>
                </div>
            </div>
            <form className="dangky" method="POST" action="">
                <div className="row2">
                    <div className="col2">
                        <h2 className="">Đăng ký tài khoản</h2>
                    </div>
                </div>
                <div className="thongtin">
                    <div className="row3">
                        <input type="text" id="tendangnhap"
                            name="tendangnhap"
                            placeholder="Tên Đăng Nhập"
                            size="33"
                            value={value.Username}
                            onChange={(e) => setValue((prevValue) => ({ ...prevValue, Username: e.target.value }))} required />
                    </div>
                    <div className="row3">
                        <input type="password"
                            id="matkhau"
                            name="matkhau"
                            placeholder="Mật Khẩu"
                            size="33"
                            required
                            value={value.Password}
                            onChange={(e) => setValue((prevValue) => ({ ...prevValue, Password: e.target.value }))} />
                    </div>
                    <div className="row3">
                        <input type="password"
                            id="nhaplai"
                            name="nhaplai"
                            placeholder="Nhập Lại Mật Khẩu"
                            size="33"
                            value={value.ConfirmPassword}
                            onChange={(e) => setValue((prevValue) => ({ ...prevValue, ConfirmPassword: e.target.value }))}
                            required />
                    </div>
                    <div className="row3">
                        <input type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            size="33"
                            value={value.Email}
                            onChange={(e) => setValue((prevValue) => ({ ...prevValue, Email: e.target.value }))}
                            required />
                    </div>
                    <div className="row3">
                        <input type="text"
                            id="sodienthoai"
                            name="sodienthoai"
                            placeholder="Số Điện Thoại"
                            size="33"
                            value={value.Phone}
                            onChange={(e) => setValue((prevValue) => ({ ...prevValue, Phone: e.target.value }))}
                            required />
                    </div>
                    <div className="row3">
                        <input type="submit" className="btn btn-outline-dark" value="Đăng ký" id="dangky" onClick={handleSubmit} />
                    </div>
                    <div className="row3">
                        <Link to="/login" id="dacotaikhoan">Đã có tài khoản</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DangKy;
