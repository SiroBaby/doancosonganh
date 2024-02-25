import React, { useEffect, useState } from "react";
import '../css/Qtri.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logonobr from '../logo no-background.png';

const Adminpage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3308/getproducts')
                setProducts(response.data);
            }
            catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="header">
                <img src={logonobr} alt="logo" height="130" width="130"></img>
                <h1>Tên trang web</h1>
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
                                    <a className="nav-link active " aria-current="page" href="trangchu.html">Trang chủ </a>
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
                                        <li><a className="dropdown-item" href="DsDonHang.html">Hiển thị đơn đặt hàng</a></li>

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
                                <td>{product.Gia_BD}</td>
                                <td>{product.Phan_tram_giam}</td>
                                <td>{product.Gia_ban}</td>
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
                                    <a href="#" className="btn btn-danger">Xóa</a>
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
};
export default Adminpage;