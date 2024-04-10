import React, { useEffect, useState } from "react";
import logonobr from '../logo no-background.png';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Payment = () => {
    const [Phone, setPhone] = useState();
    const [Products, setProducts] = useState([]);
    const [payment, setPayment] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [user, setUser] = useState([]);
    const [value, setValue] = useState({
        Ma_GH: '',
        Ma_TT: '',
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

    const navigate = useNavigate();

    const { v4: uuidv4 } = require('uuid');

    const generateUUID = () => {
        return uuidv4();
      }

    const formatPrice = (price) => {
        return (price || 0).toLocaleString("vi-VN");
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3308/getuser/${Phone}`);
            setUser(response.data);
        }
        catch (error) {
            console.error('Error fetching data', error);
        }
    };
    useEffect(() => {
        fetchData();
    });


    useEffect(() => {
        const fetchData = async (Phone) => {
            try {
                const response = await axios.get(`http://localhost:3308/getcart/${Phone}`,);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        const phoneformlocalstorage = localStorage.getItem('userRole');
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

        try {
            const randomUUID = generateUUID();
            const productRequests = Products.map(async (product) => {
                const response = await axios.get(`http://localhost:3308/product/${product.Ma_SP}`);
                const remainingQuantity = response.data.So_luong;
                if (product.So_luong > remainingQuantity) {
                    alert('Sản phẩm ' + product.Ma_SP + ' không đủ số lượng trong kho');
                    return false;
                }

                let updatedQuantity = 0;
                updatedQuantity += remainingQuantity - product.So_luong;
                await axios.put(`http://localhost:3308/updatequantity/${product.Ma_SP}`, {
                    So_luong: updatedQuantity,
                    Luot_ban: product.So_luong,
                });

                const responsee = await axios.post('http://localhost:3308/addpayment', {
                    UserName: value.UserName,
                    Phone: Phone,
                    Diachi: value.Diachi,
                    Phuong_thuc_TT: value.Phuong_thuc_TT,
                    Ma_SP: product.Ma_SP,
                    Gia_SP: product.Gia_ban,
                    So_luong: product.So_luong,
                    Hinh_anh: product.Hinh_anh,
                    Email: user.Email,
                    Ma_van_don: randomUUID,
                });

                if (!responsee.data) {
                    alert('Thêm thanh toán thất bại!');
                    return false;
                }


                return true;
            });

            const results = await Promise.all(productRequests);
            if (results.includes(false)) {
                return;
            }

            alert('Quá trình thanh toán đã hoàn tất!');
            navigate('/')

        } catch (error) {
            console.error('Error:', error);
            // Xử lý khi có lỗi xảy ra cho sản phẩm cụ thể
        }
    }



    return (
        <div className="container">
            <header>
                <div className="header">
                    <img src={logonobr} height="100" width="100" alt="" ></img>
                    <h1 className="pt-2">Pressure Store</h1>
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
                                    <input type="email" className="form-control" id="email" required value={user.Email}></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Số điện thoại:</label>
                                    <input type="tel" className="form-control" id="phone" required value={Phone}></input>
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