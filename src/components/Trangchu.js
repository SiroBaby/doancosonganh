
import "../css/login.css";
import { useEffect, useState } from "react";
import logonobr from "../logo no-background.png";
import logo from "../Logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Trangchu = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [eproducts, seteProducts] = useState([]);
    const [Phone, setPhone] = useState('');
    const [coutcart, setCountCart] = useState(0);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch("http://localhost:3308/getproducts")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
        const phoneformlocalstorage = localStorage.getItem('userInfo');
        if (phoneformlocalstorage) {
            const userInfo = JSON.parse(phoneformlocalstorage);
            setPhone(userInfo.phone);
            fetchData(userInfo.phone);
        }

    }, []);

    const fetchData = async (Phone) => {
        try {
            const response = await axios.get(`http://localhost:3308/getcart/${Phone}`,);
            seteProducts(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const getTotalQuantity = () => {
        let totalQuantity = 0;
        eproducts.forEach(product => {
            totalQuantity += parseInt(product.So_luong);
        });
        return totalQuantity;
    };

    console.log(products);
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

            <div className="row">
                <main className="maincontent py-4">
                    <div className="container justify-content-center">
                        <div className="row">
                            <div className="text-center">
                                <h2>Sản phẩm mới</h2>
                                <nav
                                    aria-label="breadcrumb"
                                    className="d-flex justify-content-center"
                                >
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a
                                                className="text-black"
                                                onClick={() => navigate("/kctn")}
                                            >
                                                Kim cương tự nhiên
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a
                                                className="text-black"
                                                onClick={() => navigate("/kcnt")}
                                            >
                                                Kim cương nhân tạo
                                            </a>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div>
                                <div className="row">
                                    {products.map((product) => (
                                        <div key={product.Ma_SP} className="col-md-4">
                                            <Link to={`/product-detail/${product.Ma_SP}`}>
                                                <div className="product-card card border-secondary mb-3 text-center p-3">
                                                    <h4>
                                                        <img
                                                            src={
                                                                "http://localhost:3308/public/images/" +
                                                                product.Hinh_anh
                                                            }
                                                            alt="Product"
                                                            className="card-img-top"
                                                            style={{ width: 250, height: 300 }}
                                                        ></img>
                                                        <div className="card-body">
                                                            Sản phẩm: {product.Ma_SP}
                                                            <br></br>
                                                            Giá: {formatPrice(product.Gia_ban)} VND
                                                        </div>
                                                    </h4>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center">
                                <button
                                    className="bg-black btn text-white"
                                    onClick={() => navigate("/allproducts")}
                                >
                                    Xem thêm
                                </button>
                            </div>
                        </div>
                        <div className="row py-4 ">
                            <div className="text-center">
                                <h2>Sản phẩm bán chạy</h2>
                                <nav
                                    aria-label="breadcrumb"
                                    className="d-flex justify-content-center"
                                >
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a
                                                className="text-black"
                                                onClick={() => navigate("/kctn")}
                                            >
                                                Kim cương tự nhiên
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a
                                                className="text-black"
                                                onClick={() => navigate("/kcnt")}
                                            >
                                                Kim cương nhân tạo
                                            </a>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div>
                                <div className="row">
                                    {products.map((product) => (
                                        <div key={product.Ma_SP} className="col-md-4">
                                            <Link to={`/product-detail/${product.Ma_SP}`}>
                                                <div className="product-card card border-secondary mb-3 text-center p-3">
                                                    <h4>
                                                        <img
                                                            src={
                                                                "http://localhost:3308/public/images/" +
                                                                product.Hinh_anh
                                                            }
                                                            alt="Product"
                                                            className="card-img-top"
                                                            style={{ width: 250, height: 300 }}
                                                        ></img>
                                                        <div className="card-body">
                                                            Sản phẩm: {product.Ma_SP}
                                                            <br></br>
                                                            Giá: {formatPrice(product.Gia_ban)} VND
                                                        </div>
                                                    </h4>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center ">
                                <button
                                    className="bg-black btn text-white"
                                    onClick={() => navigate("/allproducts")}
                                >
                                    Xem thêm
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

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
    );
};
const formatPrice = (price) => {
    return price.toLocaleString("vi-VN");
};
export default Trangchu;
