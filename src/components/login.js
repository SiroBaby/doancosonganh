import React, {useState} from "react";

const Login = () =>{
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handlePhoneChange = (e) =>{
        setPhone(e.taget.value);
    };

    const handlePasswordChange = (e) =>{
        setPassword(e.taget.value);
    };
}