import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { cloneElement } from "react";
import logonobr from "../logo no-background.png";
import logo from "../Logo.png";
import { useParams } from "react-router-dom";

const Orderdetail = () => {
    const [orderInfo, setOrderInfo] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [Phone, setPhone] = useState('');
    const [total, setTotal] = useState(0);
    const params = useParams();
    console.log(params);
    const ma_van_don = params.ma_van_don;

    const formatPrice = (price) => {
        return price ? price.toLocaleString("vi-VN") : '';
    };

    useEffect(() => {

        const fetchOrderInfo = async (Phone, ma_van_don) => {
            try {
                const response = await axios.get(`http://localhost:3308/getorderinfo/${Phone}/${ma_van_don}`,);
                setOrderInfo(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        const fetchOrderDetail = async (Phone, ma_van_don) => {
            try {
                const response = await axios.get(`http://localhost:3308/getorderdetail/${Phone}/${ma_van_don}`,);
                setOrderDetail(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        const phoneformlocalstorage = localStorage.getItem('userInfo');
        if (phoneformlocalstorage) {
            const userInfo = JSON.parse(phoneformlocalstorage);
            setPhone(userInfo.phone);
            fetchOrderInfo(userInfo.phone, ma_van_don);
            fetchOrderDetail(userInfo.phone, ma_van_don);
        }
    }, []);

    useEffect(() => {
        const calculateTotal = () => {
            const totalPrice = orderDetail.reduce((acc, item) => {
                return acc + item.Gia_SP * item.So_luong;
            }, 0);
            setTotal(totalPrice);
        };
        calculateTotal();
    }, [orderDetail]);


    return (
        <body>
            <div class="container">
                <div className="header" style={{ textAlign: "center", borderBottom: "2px solid #000" }} >
                    <img src={logonobr} alt="logo" height="130" width="130" style={{ textAlign: "center" }}></img>
                </div>

                <section className="chuyentrang">
                    <div className="container pt-3">
                        <div className="row">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={'/'} className="trangchu text-black">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Chi tiết đơn đặt hàng</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </section>

                {orderInfo.map(Order => (
                    <div key={Order.Ma_DH}>
                        <hr className="container mt-4" ></hr>
                        <div className="row">
                            <div className="col-md-6">
                                <strong>Thông tin khách hàng</strong>
                                <p>Họ và tên: {Order.Username}</p>
                                <p>Email: {Order.Email}</p>
                                <p>Số điện thoại: {Order.Phone}</p>
                            </div>
                            <div className="col-md-6">
                                <strong>Thông tin đơn hàng</strong>
                                <p>Mã đơn hàng: {Order.Ma_van_don}</p>
                                <p>Ngày đặt hàng: {Order.Ngay_lap}</p>
                                <p>Nơi nhận: {Order.Dia_chi}</p>
                                <p>Trạng thái: {Order.Tinh_trang}</p>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                ))}
                {orderDetail.map(Order => (
                    <div key={Order.Ma_DH}>
                        <table className="table table-bordered" style={{ textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img
                                        src={
                                            "http://localhost:3308/public/images/" +
                                            Order.Hinh_anh
                                        }
                                        alt="Product"
                                        className="card-img-top"
                                        style={{ width: 70 }}
                                    ></img></td>
                                    <td>{Order.Ma_SP}</td>
                                    <td>{Order.So_luong}</td>
                                    <td>{formatPrice(Order.Gia_SP)} VND</td>
                                    <td>{formatPrice(Order.Gia_SP * Order.So_luong)} VND</td>
                                </tr>
                            </tbody>
                        </table>
                        <hr></hr>

                    </div>
                ))}
                <div className="row">
                    <div className="col-md-6">
                        <strong>Tổng tiền: {formatPrice(total)} VND</strong>
                    </div>
                    <div className="col-md-6">
                        <a href="javascript:history.back()" className="btn btn-dark mt-2">Quay lại</a>
                    </div>
                </div>
                <hr></hr>
            </div>
        </body>
    );
}

export default Orderdetail;