import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Image from "../assets/logo.png";
import Second from "../assets/smart.jpg";
import { FaPhone } from 'react-icons/fa';
import { MdEmail} from 'react-icons/md';

const baseURL = "http://192.168.0.108:8000/api/register";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const data=new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('name', fullname);
    data.append('phone', phone);
    const submit = async () => {
        await axios.post(baseURL, data)
        .then( response => {
            console.log(response.data)
            navigate("/home");  
        })
        .catch((error) =>{
           console.log(error)
        });
    }

    return( 
    <>
    <div className="hero-div">
    <div className="hero-text">
        <img src={Image} className="img-logo"/>
        <h2>Being both Safe and Smart</h2>
    </div>
    <div className="login-form">
        <div className="login-form-content">
         <h1>Register</h1>
            <div className="register-content">
            <div>
                    <label className="input-label">Email</label><br></br>
                    <input type="email" placeholder="Email" className="textfield" value={email} onChange={(e) =>setEmail( e.target.value)}></input>
                </div>
                <div>
                    <label className="input-label">Password</label><br></br>
                    <input type="password" placeholder="Password" className="textfield" value={password} onChange={(e) =>setPassword( e.target.value)}></input>
                </div>
                <div className="register-inputs">
               
                <div>
                    <label className="input-label">Full Name</label><br></br>
                    <input type="text" placeholder="Full Name" className="textfield" value={fullname} onChange={(e) =>setFullName( e.target.value)}></input>
                </div>
                <div>
                    <label className="input-label">Phone</label><br></br>
                    <input type="text" placeholder="Phone" className="textfield" value={phone} onChange={(e) =>setPhone( e.target.value)}></input>
                </div>
                </div>
                <button className="register-btn" onClick={submit}>REGISTER</button> 
            </div>
            
            
            <p className="create_account">Already have an account?<span className="blueText" onClick={(e) =>navigate("/")}>Login</span></p>
        </div>
    </div>
    </div>
    <div className="second-section">
        <div className="second-section-image"><img src={Second}/></div>
        <div className="quotes">
            <h2>Live in Comfort</h2>
            <p>We connect smart devices to work in unison, delivering a truly intelligent smart home experience that makes life more convenient, safe, and enjoyable.</p>
        </div>
    </div>
    <div className="third-section">
        <p>“Finally, an interface that you can depend on and operate with ease! Way beyond my wildest expectations. Simple, user-friendly, and reliable.”</p>
    </div>
    <div className="footer">
        <div className="footer-info">
            <div className="solutions">
                <p>Products & Solutions</p>
                <ul>
                    <li>Smart Home</li>
                    <li>Home Security</li>
                    <li>Home Control</li>
                    <li>Home History</li>
                    <li>Home Statistics</li>
                    <li>Smart Lightning</li>
                </ul>
            </div>
            <div className="contact">
                <p>Contact</p>
                <ul>
                    <li><FaPhone className="footer-icon"/><span>Phone: (+961) 81805133</span></li>
                    <li><MdEmail className="footer-icon"/><span>Email: hawraayounes0@gmail.com</span></li>
                </ul>
            </div>
        </div>
        <p>@2022 Hawraa Younes</p>
    </div>
    </>
    )
}

export default RegisterForm;