import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/themsp.css';


const Addproducts = () => {
    const navigate = useNavigate();

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

    const calculateGiaBan = () => {
        const giaBD = parseFloat(value.Gia_BD) || 0;
        const phanTramGiam = parseFloat(value.Phan_tram_giam) || 0;
        const giaBan = giaBD - (giaBD * phanTramGiam / 100);
        setValue((prevValue) => ({ ...prevValue, Gia_ban: giaBan.toFixed(2) }));
    };

    const handleFileChange = (event) => {
        setValue((prevValue) => ({ ...prevValue, Hinh_anh: event.target.files[0] }));
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', value.Hinh_anh);

            const uploadResponse = await axios.post('http://localhost:3308/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });

            const imagePath = uploadResponse.data.imagePath;

            // Gửi yêu cầu POST đến máy chủ với dữ liệu sản phẩm
            const response = await axios.post('http://localhost:3308/adding', {
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
                Hinh_anh: imagePath,
                Ma_loai: value.Ma_loai,
            });

            // Xử lý kết quả từ máy chủ
            if (response.data) {
                alert('Thêm sản phẩm thành công!');
                // Chuyển hướng hoặc thực hiện các hành động khác sau khi thêm sản phẩm thành công
            } else {
                alert('Thêm sản phẩm thất bại!');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Đã xảy ra lỗi khi thêm sản phẩm!');
        }
    };

    return (
        <div>
            <div className="header">
                <img src="" alt="logo" height="160" width="160" ></img>
                <h1>Tên trang web</h1>
            </div>
            <nav className="navbar navbar-expand-md bg-body-tertiary justify-content-center" id="navbar">
                <div className="container">
                    <a className="navbar-brand " href="javascript:void(0)" onClick={() => navigate('/admin')}>Admin</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent" >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active " aria-current="page" href="trangchu.html">Trang chủ </a>
                            </li>
                            <li className="nav-item dropdown ">
                                <a className="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">Quản lí kho sản phẩm</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="javascript:void(0)" onClick={() => navigate('/admin')} >Hiển thị kho sản phẩm</a></li>
                                    <li><a className="dropdown-item" href="">Thêm sản phẩm</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Quản lí khách hàng</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="DsKhachHang.html">Hiển thị ds khách hàng</a></li>
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
                <div className="contents">
                    <form action="" id="thongtin">
                        <legend id="legend"><p>Thêm sản phẩm</p></legend>
                        <div className="form-floating mb-3 mt-3">
                            <input 
                                type="email" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder=""
                                value={value.Ma_SP}
                                onChange={(e) => setValue((prevValue) => ({ ...prevValue, Ma_SP: e.target.value}))} />
                            <label htmlFor="floatingInput">Mã sản phẩm</label>
                        </div>
                        <div className="form-floating mb-3 mt-3">
                            <select 
                                className="form-select" 
                                id="sel1" 
                                name="sellist"
                                onChange={(e) => setValue((prevValue) => ({ ...prevValue, Ma_loai: e.target.value}))}>
                                <option 
                                    value="101">(101) Kim cương tự nhiên</option>
                                <option 
                                    value="102">(102) Kim cương nhân tạo</option>
                            </select>
                            <label htmlFor="sel1" className="form-label">Tên loại</label>
                            <div className="form-floating mb-3 mt-3">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="floatingInput" 
                                    placeholder=""
                                    value={value.Gia_BD}
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Gia_BD: e.target.value}))} 
                                    ></input>
                                <label htmlFor="floatingInput">Giá ban đầu</label>
                            </div>
                            <div className="form-floating mb-3 mt-3">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="floatingInput" 
                                    placeholder=""
                                    value={value.Phan_tram_giam}
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Phan_tram_giam: e.target.value}))} 
                                    onBlur={calculateGiaBan}
                                    ></input>
                                <label htmlFor="floatingInput">Phần trăm giảm</label>
                            </div>
                            <div className="form-floating mb-3 mt-3">
                                <input 
                                    type="giasp" 
                                    className="form-control" 
                                    id="giasp" 
                                    placeholder="giasp"
                                    value={value.Gia_ban}
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Gia_ban: e.target.value}))} 
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
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, So_luong: e.target.value}))} 
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
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Trong_luong: e.target.value}))} 
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
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Kich_thuoc: e.target.value}))} 
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
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Do_tinh_khiet: e.target.value}))} 
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
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Mau_sac: e.target.value}))} 
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
                                    onChange={(e) => setValue((prevValue) => ({ ...prevValue, Hinh_dang: e.target.value}))} 
                                    ></input>
                                <label htmlFor="hinhdang">Hình dạng</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="hinh" id="hihh"><p style={{ fontSize: '16px', marginLeft: '12px' }}>Hình ảnh </p></label><br />
                            <input 
                                type="file" 
                                id="hinhanh" 
                                name="hinh" 
                                placeholder=" Hình Ảnh"
                                onChange={handleFileChange}
                                /><br />
                        </div>
                    </form>
                </div>
                <div className="footer">
                    <div className="row-3">
                        <input type="submit" className="btn btn-outline-dark" value="Cập nhật" id="dangky" onClick={handleSubmit} />
                    </div>
                    <h1>&nbsp;</h1>
                </div>
            </div>
        </div>
    );
};

export default Addproducts;