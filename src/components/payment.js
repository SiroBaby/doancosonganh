import React, { useEffect, useState } from "react";
import logonobr from '../logo no-background.png';
import { Link } from "react-router-dom";
import axios from "axios";

const Payment = () => {
    const [Phone, setPhone] = useState();
    const [Products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [value, setValue] = useState({
        Ma_GH: '',
        UserName: '',
        UserPhone: '',
        Tinh_trang: '',
        Phuong_thuc_TT: '',
        Ma_SP: '',
        Gia_SP: '',
        So_luong: '',
        Hinh_anh: '',
        Email: '',
        Diachi: '',
    });

    const formatPrice = (price) => {
        return (price || 0).toLocaleString("vi-VN");
    };

    useEffect(() => {
        const fetchData = async (Phone) => {
            try {
                const response = await axios.get(`http://localhost:3308/getcart/${Phone}`,);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        const phoneformlocalstorage = localStorage.getItem('userInfo');
        if (phoneformlocalstorage) {
            const userInfo = JSON.parse(phoneformlocalstorage);
            setPhone(userInfo.phone);
            fetchData(userInfo.phone);
        }
    }, []);

    useEffect(() => {
        const calculateTotalPrice = () => {
            let totalPrice = 0;
            Products.forEach(product => {
                totalPrice += product.Tong_tien;
            });
            setTotalPrice(totalPrice);
        };

        calculateTotalPrice();
    }, [Products]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const product of Products) {
            try {
                const response = await axios.get(`http://localhost:3308/product/${product.Ma_SP}`);
                const remainingQuantity = response.data.So_luong;
                if (product.So_luong > remainingQuantity) {
                    alert('Sản phẩm ' + product.Ma_SP + ' không đủ số lượng trong kho');
                    return;
                }

                let updatedQuantity = 0; 
                updatedQuantity += remainingQuantity - product.So_luong;
                await axios.put(`http://localhost:3308/updatequantity/${product.Ma_SP}`, {
                    So_luong: updatedQuantity,
                    Luot_ban: product.So_luong,
                });

                const responsee = await axios.post('http://localhost:3308/addpayment', {
                    Ma_GH: product.Ma_GH,
                    Phone: value.UserPhone,
                    Phuong_thuc_TT: value.Phuong_thuc_TT,
                    Ma_SP: product.Ma_SP,
                    Gia_SP: product.Gia_ban,
                    So_luong: product.So_luong,
                    Hinh_anh: product.Hinh_anh,
                    Email: value.Email,
                });

                const responseee = await axios.post(`http://localhost:3308/addorder`, {
                    Ma_GH: product.Ma_GH,
                    UserName: value.UserName,
                    Phone: value.UserPhone,
                    Diachi: value.Diachi,
                    Phuong_thuc_TT: value.Phuong_thuc_TT,
                    Email: value.Email,
                });
                if (responsee.data || responseee.data) {
                    alert('Thêm đơn đặt hàng thành công!');
                } else {
                    alert('Thêm đơn đặt hàng thất bại!');
                }

            } catch (error) {
                console.error('Error add payment for product ' + product.Ma_SP + ':', error);
                // Xử lý khi có lỗi xảy ra cho sản phẩm cụ thể
            }
        }

        alert('Quá trình thanh toán đã hoàn tất!');
    }

    return (
        <div className="container">
            <header>
                <div className="header">
                    <img src={logonobr} height="100" width="100" alt="" ></img>
                    <h1 className="pt-2">Tên trang web</h1>
                </div>
            </header>
            <section className="chuyentrang">
                <div className="container">
                    <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={'/'} className="trangchu text-black">Trang chủ</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Thanh toán</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <main>
                <h2 style={{ paddingLeft: 30 }}>Giỏ hàng của bạn</h2>
                <table className="table table-hover" style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Products.map(products => (
                            <tr key={products.Ma_SP}>
                                <td><img src={`http://localhost:3308/images/` + products.Hinh_anh} alt="Hình ảnh sản phẩm"></img></td>
                                <td>{products.Ma_SP}</td>
                                <td>{formatPrice(products.Gia_ban)} VND</td>
                                <td>{products.So_luong}</td>
                                <td>{formatPrice(products.Tong_tien)} VND</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Tổng tiền:</td>
                            <td id="total-price">{formatPrice(totalPrice)}VND</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="container my-5">
                    <h1>Thông tin thanh toán</h1>
                    <form action="#">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Họ và tên:</label>
                                    <input type="text" className="form-control" id="name" required
                                        onChange={(e) => setValue((prevValue) => ({ ...prevValue, UserName: e.target.value }))}></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input type="email" className="form-control" id="email" required
                                        onChange={(e) => setValue((prevValue) => ({ ...prevValue, Email: e.target.value }))}></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Số điện thoại:</label>
                                    <input type="tel" className="form-control" id="phone" required
                                        onChange={(e) => setValue((prevValue) => ({ ...prevValue, UserPhone: e.target.value }))}></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Nơi nhận:</label>
                                    <input type="add" className="form-control" id="address" required
                                        onChange={(e) => setValue((prevValue) => ({ ...prevValue, Diachi: e.target.value }))}></input>
                                </div>
                            </div>
                            <h2>Phương thức thanh toán</h2>
                            <div className="form-check" >
                                <input type="radio" className="form-check-input" name="payment_method" id="cod" value="cod"
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Phuong_thuc_TT: e.target.value }))}></input>
                                <label className="form-check-label" htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" name="payment_method" id="online" value="online"
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Phuong_thuc_TT: e.target.value }))}></input>
                                <label className="form-check-label" htmlFor="online">Thanh toán trực tuyến (momo)</label>
                            </div>
                            <hr></hr>
                            <div className="d-flex justify-content-end">
                                <Link to={'/'} className="btn btn-success" onClick={handleSubmit}>Thanh toán</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <hr></hr>
        </div>
    )
}

export default Payment;