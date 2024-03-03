import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [Soluong, setSoluong] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0)

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3308/getcart');
            setProducts(response.data);
            const soluongInit = {};
            response.data.forEach(product => {
                soluongInit[product.Ma_SP] = 1;
            });
            setSoluong(soluongInit);
            setProducts(response.data);
        }
        catch (error) {
            console.error('Error fetching data', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const CalculateSum = (product) => {
        const giaBan = parseFloat(product.Gia_ban) || 0;
        const soluong = parseFloat(Soluong[product.Ma_SP]) || 0;
        return (giaBan * soluong);
    };

    const handleBlur = (product) => {
        const newProducts = [...products];
        const updatedProduct = { ...product, Thanhtien: CalculateSum(product) };
        const index = newProducts.findIndex(p => p.Ma_SP === product.Ma_SP);
        newProducts[index] = updatedProduct;
        setProducts(newProducts);
        
        const newSoluong = { ...Soluong, [product.Ma_SP]: Soluong[product.Ma_SP] };
        setSoluong(newSoluong);
        updateTotalPrice();
    };

    const updateTotalPrice = () => {
        const total = products.reduce((acc, product) => {
            return acc + CalculateSum(product);
        }, 0);
        setTotalPrice(total);
    };

    return (
        <div>
            <header>
                <section class="header">
                    <div class="container-md py-4">
                        <div class="row align-items-center">
                            <div class="col-md-4">
                                <img src="" height="100" width="100" alt="logo"></img>
                            </div>
                            <div class="col-md-4 py-4">
                                <form class="d-flex text-white" role="search">
                                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                                    <button class="btn btn-outline-success bg-black" type="submit">
                                        <i class="fas fa-search text-white"></i>
                                    </button>
                                </form>
                            </div>
                            <div class="col-md-4">
                                <div class="row justify-content-end">
                                    <div class="col-auto">
                                        <div class="fs-4">
                                            <a href="dangnhap.html" class="text-black">
                                                <i class="fa-solid fa-user"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <a href="giohang.html" class="position-relative text-black">
                                            <span class="fs-4"><i class="fa-solid fa-cart-shopping"></i></span>
                                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                0
                                                <span class="visually-hidden">unread messages</span>
                                            </span>
                                        </a>
                                    </div>
                                    <div class="col-auto"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
            <section class="chuyentrang">
                <div class="container">
                    <div class="row">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="trangchu.html" class="trangchu text-black">Trang chủ</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Giỏ hàng</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
            <main>
                <div class="container my-5">
                    <h1>Giỏ hàng của bạn</h1>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.Ma_SP}>
                                    <td><img src={`http://localhost:3308/images/` + product.Hinh_anh} alt="Hình ảnh sản phẩm"></img></td>
                                    <td>{product.Ma_SP}</td>
                                    <td>{product.Gia_ban} VND</td>
                                    <td>
                                        <input 
                                            type="number" 
                                            id={`quantity-${product.Ma_SP}`} 
                                            value={Soluong[product.Ma_SP]}
                                            name="quantity" 
                                            min="1" 
                                            max="50"
                                            onChange={(e) => setSoluong({ ...Soluong, [product.Ma_SP]: e.target.value })}
                                            onBlur={() => handleBlur(product)}></input>
                                    </td>
                                    <td>{CalculateSum(product)} VND</td>
                                    <td><button class="btn btn-sm btn-danger">Xóa</button></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="5" style={{ textAlign: "right" }}>Tổng tiền:</td>
                                <td id="total-price">{totalPrice.toFixed(2)} VND</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div class="d-flex justify-content-end">
                        <a href="#" class="btn btn-primary me-2">Tiếp tục mua sắm</a>
                        <a href="ThanhToan.html" class="btn btn-success">Thanh toán</a>
                    </div>
                </div>
            </main>
            <footer class="footer bg-dark text-light py-4">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 py-4">
                            <img src="" width="100" alt="logo"></img>
                        </div>
                        <div class="col-md-4">
                            <h4>PRESSURE STORE</h4>
                            <ul class="list-unstyled footer-links">
                                <li><a class="text-light text-decoration-none" href="tatcasanpham.html">Tất cả sản phẩm</a></li>
                                <li><a class="text-light  text-decoration-none" href="kimcuongtunhien.html">Kim cương nhân tạo</a></li>
                                <li><a class="text-light  text-decoration-none" href="kimcuongnhantao.html">Kim cương tự nhiên</a></li>
                            </ul>
                        </div>
                        <div class="col-md-4">
                            <h4>Liên hệ</h4>
                            <ul class="list-unstyled footer-links">
                                <li><i class="bi bi-telephone-fill me-2"></i>SĐT: 0000000000</li>
                                <li><i class="bi bi-envelope-fill me-2"></i>Email: Kimcuong@gmail.com</li>
                                <li><i class="me-2"></i><a class="text-light  text-decoration-none"
                                    href="https://www.google.com/maps/place/18+A+%C4%90.+C%E1%BB%99ng+H%C3%B2a,+Ph%C6%B0%E1%BB%9Dng+4,+T%C3%A2n+B%C3%ACnh,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh+700000,+Vi%E1%BB%87t+Nam/@10.7992818,106.6519312,17z/data=!3m1!4b1!4m6!3m5!1s0x3175293648cb8add:0xea39c12b34ea0dc5!8m2!3d10.7992818!4d106.6545061!16s%2Fg%2F11thr8yl86?hl=vi-VN&entry=ttu">Địa
                                    chỉ: 18A/1 Cộng hòa, phường 4, Q.Tân bình, TP.HCM</a></li>
                            </ul>
                        </div>
                    </div>
                    <hr></hr>
                    <div class="row mt-3">
                        <div class="col text-center">
                            <p>Đồ án cơ sở ngành-HK5-2024</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Cart;