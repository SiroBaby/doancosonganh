import React from "react";
import '../css/Qtri.css';
import { useNavigate } from "react-router-dom";

const Adminpage = () => {
    const navigate = useNavigate();

    return (
        <div class="container">
            <div className="header">
                <img src="" alt="logo" height="160" width="160" ></img>
                    <h1>Tên trang web</h1>
            </div>
            <div>
                <nav className="navbar navbar-expand-md bg-body-tertiary justify-content-center" id="navbar">
                    <div className="container">
                        <a className="navbar-brand " href="javascript:void(0)" onClick={() => navigate('/admin')}>Admin</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent" >
                            <ul className="navbar-nav  ">
                                <li className="nav-item">
                                    <a className="nav-link active " aria-current="page" href="trangchu.html">Trang chủ </a>
                                </li>
                                <li className="nav-item dropdown ">
                                    <a className="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">Quản lí kho sản phẩm</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" >Kho sản phẩm</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={() => navigate('/addproducts')}>Thêm sản phẩm</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Quản lí khách hàng</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="DsKhachHang.html">Danh sách khách hàng</a></li>
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
                            <th>GIÁ SP</th>
                            <th>Số lượng</th>
                            <th>Trong Lượng</th>
                            <th>Màu Sắc</th>
                            <th>Độ Tinh Khiết</th>
                            <th>Kích Thước</th>
                            <th>Hình Dạng</th>
                            <th>Hình Ảnh</th>
                            <th>Mã loại</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><img src="#" alt=""></img></td>
                            <td>
                                <a href="#" className="btn btn-primary">Sửa</a>
                                <a href="#" className="btn btn-danger">Xóa</a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><img src="#" alt=""></img></td>
                            <td>
                                <a href="#" className="btn btn-primary">Sửa</a>
                                <a href="#" className="btn btn-danger">Xóa</a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><img src="#" alt=""></img></td>
                            <td>
                                <a href="#" className="btn btn-primary">Sửa</a>
                                <a href="#" className="btn btn-danger">Xóa</a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><img src="#" alt=""></img></td>
                            <td>
                                <a href="#" className="btn btn-primary">Sửa</a>
                                <a href="#" className="btn btn-danger">Xóa</a>
                            </td>
                        </tr>
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