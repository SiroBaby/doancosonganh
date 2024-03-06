import React, { useEffect, useState } from "react";
import '../css/DsKhachHang.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logonobr from '../logo no-background.png';

const Userlist = () => {
    const navigate = useNavigate();
    const [User, setUser] = useState([]);
    const [editID, setEditID] = useState(-1);
    const [Username, setUsername] = useState('');
    const [Phone, setPhone] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3308/getuser');
            setUser(response.data);
        }
        catch (error) {
            console.error('Error fetching data', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const HandleEdit = (id) => {
        setEditID(id);
        axios.get(`http://localhost:3308/getuser/${id}`)
        .then(res => {
            const user = res.data; // Lưu ý rằng res.data là một mảng
            setUsername(user.Username);
            setPhone(user.Phone);
            setPassword(user.Password);
            setEmail(user.Email);
        })
        .catch(err => console.log(err));
    }

    const handleDelete = async (id) => {
        axios.delete(`http://localhost:3308/deleteuser/${id}`)
            .then(res => {
                console.log(res.data);
                alert('Xóa người dùng thành công!')
                fetchData(); // Gọi lại fetchData để làm mới danh sách sản phẩm
            })
            .catch(err => {
                console.log(err)
                alert('Xóa người dùng thất bại!');
            });
    }

    const HandleUpdate = async (id) => {
        axios.put(`http://localhost:3308/edituser/${id}`, { Username, Phone, Password, Email })
            .then(res => {
                console.log(res.data);
                alert('Cập nhật người dùng thành công!')
                fetchData();
                setEditID(-1);
                setUsername('');
                setPhone('');
                setPassword('');
                setEmail('');
            })
            .catch(err => {
                alert('Cập nhật người dùng thất bại!')
                console.log(err)
            });

    }

    return (
        <div className="container">
            <div className="header">
                <img src={logonobr} height="130" width="130" alt="logo"></img>
                <h1>Pressure Store</h1>
            </div>
            <div>
                <nav className="navbar navbar-expand-md bg-body-tertiary justify-content-center" id="navbar">
                    <div className="container">
                        <a className="navbar-brand " onClick={() => navigate('/admin')}>Admin</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent" >
                            <ul className="navbar-nav  ">
                                <li className="nav-item">
                                    <a className="nav-link active " aria-current="page" onClick={() => navigate('/')}>Trang chủ </a>
                                </li>
                                <li className="nav-item dropdown ">
                                    <a className="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">Quản lí kho sản phẩm</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" onClick={() => navigate('/admin')}>Kho sản phẩm</a></li>
                                        <li><a className="dropdown-item" onClick={() => navigate('/addproducts')}>Thêm sản phẩm</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Quản lí khách hàng</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" onClick={() => navigate('/user')}>Danh sách khách hàng</a></li>
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
            </div>
            <div>
                <h2 style={{ textAlign: "center" }}>Danh sách khách hàng</h2>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Tên khách hàng</th>
                            <th>SĐT</th>
                            <th>Mật khẩu</th>
                            <th>Email</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {User.map(user => (
                            user.Phone === editID ?
                                <tr key={user.Phone}>
                                    <td><input 
                                            className="form-control" 
                                            id="floatingInput" 
                                            type="text" 
                                            value={Username} 
                                            placeholder="Enter Username" 
                                            onChange={e => setUsername(e.target.value)}>
                                    </input></td>
                                    <td>{user.Phone}</td>
                                    <td><input 
                                            className="form-control" 
                                            id="floatingInput" 
                                            type="text"     
                                            value={Password} 
                                            placeholder="Enter Password" 
                                            onChange={e => setPassword(e.target.value)}>
                                    </input></td>
                                    <td><input 
                                            className="form-control" 
                                            id="floatingInput" 
                                            type="text" value={Email} 
                                            placeholder="Enter Email" 
                                            onChange={e => setEmail(e.target.value)}>
                                    </input></td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => setEditID(-1)}>Hủy</button>
                                        <button className="btn btn-danger" onClick={() => HandleUpdate(user.Phone)}>Update</button>
                                    </td>

                                </tr>
                                :
                                <tr key={user.Phone}>
                                    <td>{user.Username}</td>
                                    <td>{user.Phone}</td>
                                    <td>{user.Password}</td>
                                    <td>{user.Email}</td>
                                    <td>
                                        <button onClick={() => HandleEdit(user.Phone)} className="btn btn-primary">Sửa</button>
                                        <button onClick={() => handleDelete(user.Phone)}  className="btn btn-danger">Xóa</button>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="footer">
                <h1>&nbsp;</h1>
            </div>
        </div>
    )
}

export default Userlist;