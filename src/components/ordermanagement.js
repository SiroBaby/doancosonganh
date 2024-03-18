import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logonobr from '../logo no-background.png';

const OrderManagement = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const formatPrice = (price) => {
        return price ? price.toLocaleString("vi-VN") : '';
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:3308/getorder`,);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchOrder();
    }, []);

    const handleChange = async (newStatus, Data) => {
        try {
            // Cập nhật trạng thái trong state
            const updatedData = data.map(item => {
                if (item.Ma_van_don === Data.Ma_van_don) {
                    return { ...item, Tinh_trang: newStatus };
                }
                return item;
            });
            setData(updatedData);
    
            // Gửi yêu cầu cập nhật trạng thái đơn hàng lên server
            await axios.put(`http://localhost:3308/updatestatus/${Data.Ma_van_don}`, { Tinh_trang: newStatus });
        } catch (error) {
            console.error('Error updating status', error);
        }
    };

    return (
        <body className="body">
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
                                            <li><a className="dropdown-item" href="DsDonHang.html">Hiển thị đơn đặt hàng</a></li>

                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div>
                    <h2 style={{ textAlign: "center" }}>Danh sách đơn đặt hàng</h2>
                    <table className="table table-bordered table-striped" style={{ textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Tên khách hàng</th>
                                <th>Số điện thoại</th>
                                <th>Nơi nhận hàng</th>
                                <th>Thời gian đặt</th>
                                <th>Tình trạng đơn hàng</th>
                                <th>Tổng giá</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody >
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map(Data => (
                                <tr key={Data.Don_DH}>
                                    <td>{Data.Ma_van_don}</td>
                                    <td>{Data.Username}</td>
                                    <td>{Data.Phone}</td>
                                    <td>{Data.Dia_chi}</td>
                                    <td>{Data.Ngay_lap}</td>
                                    <td>
                                        <form action="#" method="post" style={{ margin: "10px" }}>
                                            <select name="lang" id="lang-select" value={`${Data.Tinh_trang}`} onChange={(e) => handleChange(e.target.value, Data)}>
                                                <option value="xuly">Đang xử lý</option>
                                                <option value="danggiao">Đang giao</option>
                                                <option value="dagiao">Đã giao</option>
                                                <option value="dahuy">Đã hủy</option>
                                            </select>
                                        </form>
                                    </td>
                                    <td>{formatPrice(Data.Tong_thanh_toan)} VND</td>
                                    <td>
                                        <Link to={`/orderdetail/${Data.Phone}/${Data.Ma_van_don}`} className="btn btn-primary mb-1 ">Chi tiết</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan="8">Không có dữ liệu đơn đặt hàng.</td>
                          </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="footer">
                    <h1>&nbsp;</h1>
                </div>
            </div>
        </body>
    );
}

export default OrderManagement;