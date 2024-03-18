import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logonobr from "../logo no-background.png";
import logo from "../Logo.png";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [Phone, setPhone] = useState('');

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
    
        const phoneformlocalstorage = localStorage.getItem('userRole');
        if (phoneformlocalstorage) {
            const userInfo = JSON.parse(phoneformlocalstorage);
            setPhone(userInfo.phone);
            fetchData(userInfo.phone);
        }
    }, []);

    const CalculateSum = (product) => {
        const giaBan = parseFloat(product.Gia_ban) || 0;
        const soluong = parseFloat(product.So_luong) || 0;
        return giaBan * soluong;
    };

   const handleQuantityChange = async (newQuantity, product) => {
    const updatedProducts = products.map(p => {
        if (p.Ma_SP === product.Ma_SP) {
            return { ...p, So_luong: newQuantity, Tong_tien: newQuantity * p.Gia_ban };
        }
        return p;
    });

        setProducts(updatedProducts);

        // Tính tổng tiền sau khi cập nhật số lượng
        updateTotalPrice(updatedProducts);

        // Gửi dữ liệu cập nhật lên server
        try {
            await axios.post(`http://localhost:3308/updatecart/${Phone}`, { products: updatedProducts });
        } catch (error) {
            console.error('Error updating cart', error);
        }
    };

    const updateTotalPrice = (products) => {
        const totalPrice = products.reduce((acc, cur) => acc + (cur.Tong_tien || 0), 0);
        setTotalPrice(totalPrice);
    };

    const handleDeleteProduct = async (phone, maSP) => {
        try {
          // Gửi yêu cầu xóa sản phẩm lên server
          await axios.delete(`http://localhost:3308/deleteproduct/${phone}/${maSP}`);
      
          // Lấy lại danh sách sản phẩm trong giỏ hàng sau khi xóa
          const response = await axios.get(`http://localhost:3308/getcart/${phone}`);
          setProducts(response.data);
      
          // Cập nhật lại tổng tiền sau khi xóa sản phẩm
          updateTotalPrice(response.data);
      
          // Thông báo xóa thành công
          console.log('Product deleted successfully');
        } catch (error) {
          console.error('Error deleting product', error);
        }
      };


    return (
        <div>
            <header>
                <section className="header">
                    <div className="container-md py-4">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <img src={logonobr} height="130" width="130" alt="logo"></img>
                            </div>
                            <div className="col-md-4 py-4">
                                <form className="d-flex text-white" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                                    <button className="btn btn-outline-success bg-black" type="submit">
                                        <i className="fas fa-search text-white"></i>
                                    </button>
                                </form>
                            </div>
                            <div className="col-md-4">
                                <div className="row justify-content-end">
                                    <div className="col-auto">
                                        <div className="fs-4">
                                            <Link to={`/login`} className="text-black">
                                                <i className="fa-solid fa-user"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-auto"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
            <section className="chuyentrang">
                <div className="container">
                    <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={'/'} className="trangchu text-black">Trang chủ</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Giỏ hàng</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
            <main>
                <div className="container my-5">
                    <h1>Giỏ hàng của bạn</h1>
                    <table className="table table-hover">
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
                                    <td>{formatPrice(product.Gia_ban)} VND</td>
                                    <td>
                                        <input 
                                            type="number" 
                                            id={`quantity-${product.Ma_SP}`} 
                                            value={product.So_luong}
                                            name="quantity" 
                                            min="1" 
                                            max="50"
                                            onChange={(e) => handleQuantityChange(e.target.value, product)}
                                        />
                                    </td>
                                    <td>{formatPrice(CalculateSum(product))} VND</td>
                                    <td><button className="btn btn-sm btn-danger" onClick={() => handleDeleteProduct(Phone, product.Ma_SP)}>Xóa</button></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="5" style={{ textAlign: "right" }}>Tổng tiền:</td>
                                <td id="total-price">{formatPrice(totalPrice)} VND</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="d-flex justify-content-end">
                        <Link to={'/'} className="btn btn-primary me-2">Tiếp tục mua sắm</Link>
                        <Link to={'/payment/' + Phone } className="btn btn-success">Thanh toán</Link>
                    </div>
                </div>
            </main>
            <footer className="footer bg-dark text-light py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 py-4">
                            <img src={logo} width="100" alt="logo"></img>
                        </div>
                        <div className="col-md-4">
                            <h4>PRESSURE STORE</h4>
                            <ul className="list-unstyled footer-links">
                                <li><Link to={'/AllProducts'} className="text-light text-decoration-none" href="tatcasanpham.html">Tất cả sản phẩm</Link></li>
                                <li><Link to={'/Natural'}  className="text-light text-decoration-none" href="kimcuongtunhien.html">Kim cương nhân tạo</Link></li>
                                <li><Link to={'/Artificial'} className="text-light  text-decoration-none" href="kimcuongnhantao.html">Kim cương tự nhiên</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h4>Liên hệ</h4>
                            <ul className="list-unstyled footer-links">
                                <li><i className="bi bi-telephone-fill me-2"></i>SĐT: 0000000000</li>
                                <li><i className="bi bi-envelope-fill me-2"></i>Email: Kimcuong@gmail.com</li>
                                <li><i className="me-2"></i><a className="text-light  text-decoration-none"
                                    href="https://www.google.com/maps/place/18+A+%C4%90.+C%E1%BB%99ng+H%C3%B2a,+Ph%C6%B0%E1%BB%9Dng+4,+T%C3%A2n+B%C3%ACnh,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh+700000,+Vi%E1%BB%87t+Nam/@10.7992818,106.6519312,17z/data=!3m1!4b1!4m6!3m5!1s0x3175293648cb8add:0xea39c12b34ea0dc5!8m2!3d10.7992818!4d106.6545061!16s%2Fg%2F11thr8yl86?hl=vi-VN&entry=ttu">Địa
                                    chỉ: 18A/1 Cộng hòa, phường 4, Q.Tân bình, TP.HCM</a></li>
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
    )
}

export default Cart;

