import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import logonobr from '../logo no-background.png';

const Editpicture = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [value, setValue] = useState({
        Hinh_anh: null,
    });
    const [role, setRole] = useState("");

    useEffect(() => {
        const phonefromlocalstorage = localStorage.getItem('userRole')
        if (phonefromlocalstorage) {
            const userRole = JSON.parse(phonefromlocalstorage);
            setRole(userRole.role);
        }
    })

    const handleFileChange = (event) => {
        setValue((prevValue) => ({ ...prevValue, Hinh_anh: event.target.files[0] }));
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', value.Hinh_anh);

            const uploadResponse = await axios.post('http://localhost:3308/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });

            const imagePath = uploadResponse.data.imagePath;

            // Gửi yêu cầu POST đến máy chủ với dữ liệu sản phẩm
            const response = await axios.post('http://localhost:3308/updatepicture/'+ id, {
                Hinh_anh: imagePath,
            });

            // Xử lý kết quả từ máy chủ
            if (response.data) {
                alert('Sửa hình ảnh thành công!');
                // Chuyển hướng hoặc thực hiện các hành động khác sau khi thêm sản phẩm thành công
            } else {
                alert('Sửa hình ảnh thất bại!');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Đã xảy ra lỗi khi sửa hình ảnh!');
        }
    };
    if (role === "1") {
        return (
            <div>
                <div className="header">
                    <img src={logonobr} alt="logo" height="130" width="130" ></img>
                    <h1>Pressure Store</h1>
                </div>
                <nav className="navbar navbar-expand-md bg-body-tertiary justify-content-center" id="navbar">
                    <div className="container">
                        <a className="navbar-brand " onClick={() => navigate('/admin')}>Admin</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent" >
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active " aria-current="page" onClick={() => navigate('/')}>Trang chủ </a>
                                </li>
                                <li className="nav-item dropdown ">
                                    <a className="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">Quản lí kho sản phẩm</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" onClick={() => navigate('/admin')} >Hiển thị kho sản phẩm</a></li>
                                        <li><a className="dropdown-item" onClick={() => navigate('/addproducts')}>Thêm sản phẩm</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Quản lí khách hàng</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" onClick={() => navigate('/user')}>Hiển thị ds khách hàng</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Quản lí đơn đặt hàng</a>
                                    <ul className="dropdown-menu">
                                        <li><Link to={'/OrderManagement'} className="dropdown-item">Hiển thị đơn đặt hàng</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
    
                <div className="container">
                    <div className="mx-5 px-2 mb-4">
                        <form action="" id="thongtin">
                            <legend id="legend"><p>Sửa hình ảnh</p></legend>
                            <div >
                                <label htmlFor="hinhanh" id="hinh">Hình ảnh</label>
                                <input 
                                    className="form-control"
                                    type="file" 
                                    name="hinh" 
                                    placeholder=" Hình Ảnh"
                                    onChange={handleFileChange} 
                                    ></input>
                            </div>
                        </form>
                    </div>
                    <div className="footer">
                        <div className="row-3">
                            <input type="submit" className="btn btn-outline-dark" value="Cập nhật" id="dangky" onClick={handleSubmit} />
                        </div>
                        <h1>&nbsp;</h1>
                    </div>
                </div>
            </div>
        );
    }else{
        return <div>Bạn không có quyền truy cập!</div>
    }
}

export default Editpicture;