import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
const baseURL = "http://192.168.0.108:8000/api/login";
let authentication = {
    myBool: true
    }
const LoginFrom = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const data=new FormData();
    data.append('email', email);
    data.append('password', password);
    const submit = async () => {
        await axios.post(baseURL, data)
        .then( response => {
            localStorage.setItem("userID", response.data.user.id);
            localStorage.setItem("authenticated", JSON. stringify(true));
            console.log(localStorage.getItem("hiiii"+"authenticated"))
            localStorage.setItem("token", "Bearer " + response.data.token);
            localStorage.setItem("type", response.data.user.user_type_id);
            console.log(localStorage.getItem("userID"))
            navigate("/home");  
        })
        .catch((error) =>{
           console.log(error)
        });
    }

    const navigateToResgisteration = () => {
        navigate('/register');
    };

    const naviagteToHome = () => {
        navigate('/home');
        window.location.reload();
    };

    return(
        <div className="login_container" >           
            <div className="login_form">
                <div className="login_form_content">
                    <div className="login_content">
                        <h1>Sign in</h1>
                        <input type="text" placeholder="Email" className="textfield" value={email} onChange={(e) =>setEmail( e.target.value)}></input>
                        <input type="password" placeholder="Password" className="textfield" value={password} onChange={(e) =>setPassword( e.target.value)}></input>

                        <button className="blue_btn" onClick={submit}>Sign in</button> 
                    </div>
                    <p className="create_account">Don't have an account? <button className="transparent_btn"><span className="blueText">Sign up</span></button></p>
                </div>
            </div>
        </div>
    )
}

export default LoginFrom;