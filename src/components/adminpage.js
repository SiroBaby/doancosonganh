import React, { useEffect, useState } from "react";
import '../css/Qtri.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import logonobr from '../logo no-background.png';

const Adminpage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [role, setRole] = useState("");

    const formatPrice = (price) => {
        return (price || 0).toLocaleString("vi-VN");
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3308/getproducts')
            setProducts(response.data);
        }
        catch (error) {
            console.error('Error fetching data', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const phonefromlocalstorage = localStorage.getItem('userRole')
        if (phonefromlocalstorage) {
            const userRole = JSON.parse(phonefromlocalstorage);
            setRole(userRole.role);
        }
    })
    
    const handleDelete = async (id) => {
        axios.delete(`http://localhost:3308/deleteproducts/${id}`)
            .then(res => {
                console.log(res.data);
                fetchData(); // Gọi lại fetchData để làm mới danh sách sản phẩm
            })
            .catch(err => console.log(err));
    }


    if (role === "1") {
        return (
            <div className="container">
                <div className="header">
                    <img src={logonobr} alt="logo" height="130" width="130"></img>
                    <h1>Pressure Store</h1>
                </div>
                <div>
                    <nav className="navbar navbar-expand-md bg-body-tertiary justify-content-center" id="navbar">
                        <div className="container">
                            <a className="navbar-brand " onClick={() => navigate('/admin')}>Admin</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent" >
                                <ul className="navbar-nav  ">
                                    <li className="nav-item">
                                        <a className="nav-link active " aria-current="page" onClick={() => navigate('/')}>Trang chủ </a>
                                    </li>
                                    <li className="nav-item dropdown ">
                                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Quản lí kho sản phẩm</a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" >Kho sản phẩm</a></li>
                                            <li><a className="dropdown-item" onClick={() => navigate('/addproducts')}>Thêm sản phẩm</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Quản lí khách hàng</a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" onClick={() => navigate('/user')}>Danh sách khách hàng</a></li>
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
                </div>
                <div>
                    <h2 style={{ textAlign: "center" }}>Kho sản phẩm</h2>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Mã SP</th>
                                <th>Giá Ban Đầu</th>
                                <th>Phần trăm giảm</th>
                                <th>Giá bán</th>
                                <th>Số lượng</th>
                                <th>Trong Lượng</th>
                                <th>Kích Thước</th>
                                <th>Hình Dạng</th>
                                <th>Màu Sắc</th>
                                <th>Độ Tinh Khiết</th>
                                <th>Hình Ảnh</th>
                                <th>Mã loại</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.Ma_SP}>
                                    <td>{product.Ma_SP}</td>
                                    <td>{formatPrice(product.Gia_BD)}</td>
                                    <td>{product.Phan_tram_giam}%</td>
                                    <td>{formatPrice(product.Gia_ban)}</td>
                                    <td>{product.So_luong}</td>
                                    <td>{product.Trong_luong}</td>
                                    <td>{product.Kich_thuoc}</td>
                                    <td>{product.Hinh_dang}</td>
                                    <td>{product.Mau_sac}</td>
                                    <td>{product.Do_tinh_khiet}</td>
                                    <td>
                                        <img src={`http://localhost:3308/images/` + product.Hinh_anh} alt={'Hình ảnh ${product.Ma_SP}'}></img>
                                    </td>
                                    <td>{product.Ma_loai}</td>
                                    <td>
                                        <Link to={`/editproducts/${product.Ma_SP}`} className="btn btn-primary" >Sửa</Link>
                                        <btn onClick={() => handleDelete(product.Ma_SP)} className="btn btn-danger">Xóa</btn>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="footer">
                    <h1>&nbsp;</h1>
                </div>
            </div>
        );
    } else {
        return <div>Bạn không có quyền truy cập!</div>;
    }


};
export default Adminpage;