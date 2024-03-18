

import "../css/natural.css";
import { useEffect, useState } from "react";
import logonobr from "../logo no-background.png";
import logo from "../Logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AllProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [eproducts, seteProducts] = useState([]);
    const [Phone, setPhone] = useState('');
    const [shownProducts, setShownProducts] = useState(6);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchWeight, setSearchWeight] = useState();
    useEffect(() => {
        fetchProducts();
        const phoneFromLocalStorage = localStorage.getItem('userRole');
        if (phoneFromLocalStorage) {
            const userInfo = JSON.parse(phoneFromLocalStorage);
            setPhone(userInfo.phone);
            fetchData(userInfo.phone);
        }
    }, []);
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:3308/getproducts`);
            const filteredProducts = response.data.filter(product => product.Ma_loai === 102); // Lọc sản phẩm theo mã loại 102
            setProducts(filteredProducts);
            setTotalProducts(filteredProducts.length);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const fetchData = async (phone) => {
        try {
            const response = await axios.get(`http://localhost:3308/getcart/${phone}`);
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

    const formatPrice = (price) => {
        return (price || 0).toLocaleString("vi-VN");
    };

    const loadMoreProducts = () => {
        setShownProducts(prev => prev + 6);
    };

    const sortByNewest = () => {
        const sortedProducts = [...products].sort((a, b) => b.Ma_SP - a.Ma_SP);
        setProducts(sortedProducts);
    };
    const sortByBestSelling = () => {
        const sortedProducts = [...products].sort((a, b) => parseInt(b.Luot_ban) - parseInt(a.Luot_ban));
        setProducts(sortedProducts);
    };
    const handleSearch = () => {
        navigate(`/FindProducts/${searchWeight}`)
    }

    return (
        <div className="tcsp">
            <section className="header">
                <div className="container-md pt-4">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <img src={logonobr} height="130" width="130" alt="logo" onClick={() => navigate("/")}></img>
                        </div>
                        <div className="col-md-4 py-4">
                            <form className="d-flex text-white" role="search">
                                <input className="form-control me-2 mt-2" type="search" placeholder="Search" aria-label="Search" value={searchWeight}
                                    onChange={(e) => setSearchWeight(e.target.value)} />
                                <button className="btn btn-outline-success bg-black mt-2" onClick={handleSearch}>
                                    <i className="fas fa-search text-white"></i>
                                </button>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <div className="row justify-content-end">
                                <div className="col-auto">
                                    <div className="fs-4">
                                        <a onClick={() => navigate("/login")} className="text-black">
                                            <i className="fa-solid fa-user"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <a onClick={() => navigate(`/giohang/${Phone}`)} className="position-relative text-black">
                                        <span className="fs-4">
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </span>
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {getTotalQuantity()}
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </a>
                                </div>
                                <div className="col-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="menu-md text-bg-dark">
                <div className="container">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <a className="navbar-brand d-none" href="#">Navbar</a>
                            <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon bg-white"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                                <div className="fs-4">
                                    <ul className="navbar-nav custom-menu justify-content-around">
                                        <li className="nav-item px-5">
                                            <a className="nav-link active text-light" aria-current="page" onClick={() => navigate("/AllProducts")}>Tất cả sản phẩm</a>
                                        </li>
                                        <li className="nav-item px-5">
                                            <a className="nav-link text-light" onClick={() => navigate("/Natural")}>Kim cương tự nhiên</a>
                                        </li>
                                        <li className="nav-item px-5">
                                            <a className="nav-link text-light" onClick={() => navigate("/Artificial")}>Kim cương nhân tạo</a>
                                        </li>
                                        <li className="nav-item px-5">
                                            <a className="nav-link text-light" onClick={() => navigate(`/dondh/${Phone}`)}>Đơn đặt hàng</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </section>

            <section className="chuyentrang">
                <div className="container pt-2">
                    <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a className="trangchu text-black" onClick={() => navigate("/")}>Trang chủ</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Kim cương nhân tạo</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <div className="row">
                            <div className="col-md-3">
                                <h3>Danh mục</h3>
                                <ul className="category-nav">
                                    <li><a onClick={() => navigate("/AllProducts")}>Tất cả sản phẩm</a></li>
                                    <li><a onClick={() => navigate("/Natural")}>Kim cương tự nhiên</a></li>
                                    <li><a onClick={() => navigate("/Artificial")}>Kim cương nhân tạo</a></li>
                                </ul>
                            </div>
                            <div className="col-md-9">
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <div className="btn-group" role="group" aria-label="Sort options">
                                            <button type="button" className="btn" onClick={sortByNewest}>Mới nhất</button>
                                            <button type="button" className="btn" onClick={sortByBestSelling}>Bán chạy nhất</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {products.slice(0, shownProducts).map(product => (
                                        <div key={product.Ma_SP} className="col-md-4">
                                            <Link to={`/product-detail/${product.Ma_SP}`}>
                                                <div className="product-card">
                                                    <img
                                                        src={"http://localhost:3308/public/images/" + product.Hinh_anh}
                                                        alt="ảnh"
                                                        className="card-img-top"
                                                        style={{ width: 300, height: 300 }}
                                                    />
                                                    <h4>Sản phẩm : {product.Ma_SP}</h4>
                                                    <p className="gia">Giá: {formatPrice(product.Gia_ban)} VNĐ</p>
                                                    <h4 className="luotban">Lượt bán: {product.Luot_ban}</h4>
                                                    <button className="btn text-light bg-black" onClick={() => navigate("/cart")}>
                                                        Thêm vào giỏ hàng
                                                    </button>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                                {shownProducts < totalProducts && (
                                    <div className="row mt-4">
                                        <div className="col-md-12 text-center">
                                            <button className="btn btn-primary" onClick={loadMoreProducts}>Xem thêm</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
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
                                    <a className="text-light text-decoration-none" onClick={() => navigate("/AllProducts")}>Tất cả sản phẩm</a>
                                </li>
                                <li>
                                    <a className="text-light  text-decoration-none" onClick={() => navigate("/Natural")}>Kim cương nhân tạo</a>
                                </li>
                                <li>
                                    <a className="text-light  text-decoration-none" onClick={() => navigate("/Artificial")}>Kim cương tự nhiên</a>
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
                                    <i className="bi bi-envelope-fill me-2"></i>Email: Kimcuong@gmail.com
                                </li>
                                <li>
                                    <i className="me-2"></i>
                                    <a className="text-light  text-decoration-none" href="https://www.google.com/maps/place/18+A+%C4%90.+C%E1%BB%99ng+H%C3%B2a,+Ph%C6%B0%E1%BB%9Dng+4,+T%C3%A2n+B%C3%ACnh,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh+700000,+Vi%E1%BB%87t+Nam/@10.7992818,106.6519312,17z/data=!3m1!4b1!4m6!3m5!1s0x3175293648cb8add:0xea39c12b34ea0dc5!8m2!3d10.7992818!4d106.6545061!16s%2Fg%2F11thr8yl86?hl=vi-VN&entry=ttu">
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
    );
};

export default AllProducts;
