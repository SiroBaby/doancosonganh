import React, { useEffect, useState } from "react";
import '../css/Qtri.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import logonobr from '../logo no-background.png';
const Editproducts = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [value, setValue] = useState({
        Ma_SP: '',
        Gia_BD: '',
        Phan_tram_giam: '',
        Gia_ban: '',
        So_luong: '',
        Trong_luong: '',
        Kich_thuoc: '',
        Hinh_dang: '',
        Mau_sac: '',
        Do_tinh_khiet: '',
        Hinh_anh: null,
        Ma_loai: '',
    });

    useEffect(() => {
        axios.get('http://localhost:3308/editproducts/'+id)
            .then(res => {
                console.log("API response:", res);
                setValue(prevValue => ({
                    ...prevValue,
                    Ma_SP: res.data.Ma_SP,
                    Gia_BD: res.data.Gia_BD,
                    Phan_tram_giam: res.data.Phan_tram_giam,
                    Gia_ban: res.data.Gia_ban,
                    So_luong: res.data.So_luong,
                    Trong_luong: res.data.Trong_luong,
                    Kich_thuoc: res.data.Kich_thuoc,
                    Hinh_dang: res.data.Hinh_dang,
                    Mau_sac: res.data.Mau_sac,
                    Do_tinh_khiet: res.data.Do_tinh_khiet,
                    Hinh_anh: prevValue && prevValue.Hinh_anh ? prevValue.Hinh_anh : res.data.Hinh_anh,
                    Ma_loai: res.data.Ma_loai,
                }));
            })
            .catch(err => console.log(err));
    }, [id]);

    const calculateGiaBan = () => {
        const giaBD = parseFloat(value.Gia_BD) || 0;
        const phanTramGiam = parseFloat(value.Phan_tram_giam) || 0;
        const giaBan = giaBD - (giaBD * phanTramGiam / 100);
        setValue((prevValue) => ({ ...prevValue, Gia_ban: giaBan.toFixed(2) }));
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.post(`http://localhost:3308/updateproduct/${id}`, {
                Ma_SP: value.Ma_SP,
                Gia_BD: value.Gia_BD,
                Phan_tram_giam: value.Phan_tram_giam,
                Gia_ban: value.Gia_ban,
                So_luong: value.So_luong,
                Trong_luong: value.Trong_luong,
                Kich_thuoc: value.Kich_thuoc,
                Hinh_dang: value.Hinh_dang,
                Mau_sac: value.Mau_sac,
                Do_tinh_khiet: value.Do_tinh_khiet,
                Ma_loai: value.Ma_loai,
            });
            console.log(response.data);
          // Xử lý dữ liệu sau khi cập nhật thành công, ví dụ: hiển thị thông báo, chuyển hướng trang, vv.
        } catch (error) {
          console.error('Error updating product:', error);
          // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
        }
      };


    return (
        <div>
            <div className="header">
                <img src={logonobr} alt="logo" height="130" width="130" ></img>
                <h1>Pressure Store</h1>
            </div>
            <nav className="navbar navbar-expand-md bg-body-tertiary justify-content-center" id="navbar">
                <div className="container">
                    <a className="navbar-brand " onClick={() => navigate('/admin')}>Admin</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent" >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active " aria-current="page" onClick={() => navigate('/')}>Trang chủ </a>
                            </li>
                            <li className="nav-item dropdown ">
                                <a className="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">Quản lí kho sản phẩm</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={() => navigate('/admin')} >Hiển thị kho sản phẩm</a></li>
                                    <li><a className="dropdown-item" onClick={() => navigate('/addproducts')}>Thêm sản phẩm</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Quản lí khách hàng</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={() => navigate('/user')}>Hiển thị ds khách hàng</a></li>
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

            <div className="container">
                <div className="mx-5 px-5">
                    <form action="" id="thongtin">
                        <legend id="legend"><p>Sửa sản phẩm</p></legend>
                        <div className="form-floating mb-3 mt-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInputmasp"
                                placeholder=""
                                value={value.Ma_SP}
                                onChange={(e) => setValue((prevValue) => ({ ...prevValue, Ma_SP: e.target.value }))} />
                            <label htmlFor="floatingInputmasp">Mã sản phẩm</label>
                        </div>
                        <div className="form-floating mb-3 mt-3">
                            <select
                                className="form-select"
                                id="sel1"
                                name="sellist"
                                onChange={(e) => setValue((prevValue) => ({ ...prevValue, Ma_loai: e.target.value }))}>
                                <option
                                    value="101">(101) Kim cương tự nhiên</option>
                                <option
                                    value="102">(102) Kim cương nhân tạo</option>
                            </select>
                            <label htmlFor="sel1" className="form-label">Tên loại</label>
                            <div className="form-floating mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder=""
                                    value={value.Gia_BD}
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Gia_BD: e.target.value }))}
                                ></input>
                                <label htmlFor="floatingInput">Giá ban đầu</label>
                            </div>
                            <div className="form-floating mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder=""
                                    value={value.Phan_tram_giam}
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Phan_tram_giam: e.target.value }))}
                                    onBlur={calculateGiaBan}
                                ></input>
                                <label htmlFor="floatingInput">Phần trăm giảm</label>
                            </div>
                            <div className="form-floating mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="giasp"
                                    placeholder="giasp"
                                    value={value.Gia_ban}
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Gia_ban: e.target.value }))}
                                ></input>
                                <label htmlFor="giasp">Giá sản phẩm</label>
                            </div>
                            <div className="form-floating mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="sl"
                                    placeholder="sl"
                                    value={value.So_luong}
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, So_luong: e.target.value }))}
                                ></input>
                                <label htmlFor="sl">Số lượng</label>
                            </div>
                            <div className="form-floating mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    value={value.Trong_luong}
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Trong_luong: e.target.value }))}
                                ></input>
                                <label htmlFor="floatingPassword">Trọng lượng</label>
                            </div>
                            <div className="form-floating mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    value={value.Kich_thuoc}
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Kich_thuoc: e.target.value }))}
                                ></input>
                                <label htmlFor="floatingPassword">Kích thước</label>
                            </div>
                            <div className="form-floating mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    value={value.Do_tinh_khiet}
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Do_tinh_khiet: e.target.value }))}
                                ></input>
                                <label htmlFor="floatingPassword">Độ tinh khiết</label>
                            </div>
                            <div className="form-floating mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="color"
                                    placeholder="color"
                                    value={value.Mau_sac}
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Mau_sac: e.target.value }))}
                                ></input>
                                <label htmlFor="color">Màu sắc</label>
                            </div>
                            <div className="form-floating mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="hinhdang"
                                    placeholder="hinhdang"
                                    value={value.Hinh_dang}
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Hinh_dang: e.target.value }))}
                                ></input>
                                <label htmlFor="hinhdang">Hình dạng</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="footer">
                    <div className="row-3" style={{marginTop: 10}}>
                        <Link to={`/editpicture/${value.Ma_SP}`} className="btn btn-primary" >Sửa Hình Ảnh</Link>
                    </div>
                    <div className="row-3">
                        <input type="submit" className="btn btn-outline-dark" value="Cập nhật" id="dangky" onClick={handleUpdate} />
                    </div>
                    <h1>&nbsp;</h1>
                </div>
            </div>
        </div>
    )
}
export default Editproducts