import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logonobr from "../logo no-background.png";
import logo from "../Logo.png";

const Order = () => {
    const navigate = useNavigate();
    const [Phone, setPhone] = useState('');
    const [products, setProducts] = useState([]);
    const [order, setOrder]= useState([]);

    const formatPrice = (price) => {
        return price.toLocaleString("vi-VN");
    };

    const getTotalQuantity = () => {
        let totalQuantity = 0;
        products.forEach(product => {
            totalQuantity += parseInt(product.So_luong);
        });
        return totalQuantity;
    };

    useEffect(() => {
        const fetchCartData = async (Phone) => {
            try {
                const response = await axios.get(`http://localhost:3308/getcart/${Phone}`,);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        const fetchOrderData = async (Phone) => {
            try {
                const response = await axios.get(`http://localhost:3308/getorder/${Phone}`,);
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        const phoneformlocalstorage = localStorage.getItem('userInfo');
        if (phoneformlocalstorage) {
            const userInfo = JSON.parse(phoneformlocalstorage);
            setPhone(userInfo.phone);
            fetchCartData(userInfo.phone);
            fetchOrderData(userInfo.phone);
        }
    }, []);

    return (
        <div>
            <div className="row">
                <section className="header">
                    <div className="container-md py-4">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <img src={logonobr} height="130" width="130" alt="logo"></img>
                            </div>
                            <div className="col-md-4 py-4 ">
                                <form
                                    className="d-flex text-white align-items-center"
                                    role="search"
                                >
                                    <input
                                        className="form-control me-2 mb-3"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                    ></input>
                                    <button
                                        className="btn btn-outline-success bg-black mb-1"
                                        type="submit"
                                    >
                                        <i className="fas fa-search text-white"></i>
                                    </button>
                                </form>
                            </div>
                            <div className="col-md-4">
                                <div className="row justify-content-end">
                                    <div className="col-auto">
                                        <div className="fs-4">
                                            <a
                                                onClick={() => navigate("/login")}
                                                className="text-black"
                                            >
                                                <i className="fa-solid fa-user"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <a
                                            onClick={() => navigate(`/giohang/${Phone}`)}
                                            className="position-relative text-black"
                                        >
                                            <span className="fs-4">
                                                <i className="fa-solid fa-cart-shopping"></i>
                                            </span>
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {getTotalQuantity()}
                                                <span className="visually-hidden">unread messages</span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="row">
                <section className="menu-md text-bg-dark">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid">
                                <a className="navbar-brand d-none " href="#">
                                    Navbar
                                </a>
                                <button
                                    className="navbar-toggler bg-white"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon bg-white"></span>
                                </button>
                                <div
                                    className="collapse navbar-collapse justify-content-center"
                                    id="navbarSupportedContent"
                                >
                                    <div className="fs-4">
                                        <ul className="navbar-nav custom-menu justify-content-around">
                                            <li className="nav-item px-5">
                                                <a
                                                    className="nav-link active text-light"
                                                    aria-current="page"
                                                    onClick={() => navigate("/allproducts")}
                                                >
                                                    Tất cả sản phẩm
                                                </a>
                                            </li>
                                            <li className="nav-item px-5">
                                                <a
                                                    className="nav-link text-light"
                                                    onClick={() => navigate("/kctn")}
                                                >
                                                    Kim cương tự nhiên
                                                </a>
                                            </li>
                                            <li className="nav-item px-5">
                                                <a
                                                    className="nav-link text-light"
                                                    onClick={() => navigate("/kcnt")}
                                                >
                                                    Kim cương nhân tạo
                                                </a>
                                            </li>
                                            <li className="nav-item px-5">
                                                <a
                                                    className="nav-link text-light"
                                                    onClick={() => navigate("/dondh")}
                                                >
                                                    Đơn đặt hàng
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>
            </div>
            <section className="chuyentrang">
                <div className="container pt-2">
                    <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={'/'} className="trangchu text-black">Trang chủ</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Đơn đặt hàng</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <main className="main-content">
                <div className="container pt-4">
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="order-item card">
                                    {order.map(Order => (
                                        <div className="order-details" key={Order.Ma_van_don}>
                                            <div className="row">
                                                <div className="col-md-4 text-center">
                                                    <img src={"http://localhost:3308/public/images/" + Order.Hinh_anh} style={{width: 100}} alt="ảnh"></img>
                                                </div>
                                                <div className="col-md-8"> 
                                                    <h5>Mã đơn hàng: {Order.Ma_van_don}</h5>
                                                    <p>Ngày lập: {Order.Ngay_lap}</p>
                                                    <p>Tổng thanh toán: {formatPrice(Order.Tong_thanh_toan)} VND</p>
                                                    <p className="order-status">Trạng thái:  {Order.Tinh_trang === "dagiao" ? "Đã giao" : (Order.Tinh_trang === "xuly" ? "Đang xử lý" : "Đang giao")}
                                                    </p>
                                                    <Link to={`/orderdetail/${Phone}/${Order.Ma_van_don}`} style={{ marginBottom: 20 }} className="bg-black btn text-white" >Chi tiết</Link>
                                                    <hr></hr>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            
            <div className="row">
                <footer className="bg-dark text-light py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 py-4">
                                <img src={logo} height="100" width="100" alt="logo"></img>
                            </div>
                            <div className="col-md-4">
                                <h4>PRESSURE STORE</h4>
                                <ul className="list-unstyled footer-links">
                                    <li>
                                        <a
                                            className="text-light text-decoration-none"
                                            onClick={() => navigate("/allproducts")}
                                        >
                                            Tất cả sản phẩm
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="text-light  text-decoration-none"
                                            onClick={() => navigate("/kctn")}
                                        >
                                            Kim cương nhân tạo
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="text-light  text-decoration-none"
                                            onClick={() => navigate("/kcnt")}
                                        >
                                            Kim cương tự nhiên
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h4>Liên hệ</h4>
                                <ul className="list-unstyled footer-links">
                                    <li>
                                        <i className="bi bi-telephone-fill me-2"></i>SĐT: 0000000000
                                    </li>
                                    <li>
                                        <i className="bi bi-envelope-fill me-2"></i>Email:
                                        Kimcuong@gmail.com
                                    </li>
                                    <li>
                                        <i className="me-2"></i>
                                        <a
                                            className="text-light  text-decoration-none"
                                            href="https://www.google.com/maps/place/18+A+%C4%90.+C%E1%BB%99ng+H%C3%B2a,+Ph%C6%B0%E1%BB%9Dng+4,+T%C3%A2n+B%C3%ACnh,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh+700000,+Vi%E1%BB%87t+Nam/@10.7992818,106.6519312,17z/data=!3m1!4b1!4m6!3m5!1s0x3175293648cb8add:0xea39c12b34ea0dc5!8m2!3d10.7992818!4d106.6545061!16s%2Fg%2F11thr8yl86?hl=vi-VN&entry=ttu"
                                        >
                                            Địa chỉ: 18A/1 Cộng hòa, phường 4, Q.Tân bình, TP.HCM
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row mt-3">
                            <div className="col text-center">
                                <p>Đồ án cơ sở ngành-HK5-2024</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Order