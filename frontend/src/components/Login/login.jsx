import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
const baseURL = "http://127.0.0.1:8000/auth/login";

const LoginFrom = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({email:"", password:""});

    const submit = async (e) => {
        e.preventDefault();  
        await axios.post(baseURL, input)
        .then( response => {
            localStorage.setItem("id", response.data.user._id);
            localStorage.setItem("token", "Bearer " + response.data.token);
            localStorage.setItem("type", response.data.user.user_type_id);
            naviagteToLanding();
        })
        .catch((error) =>{
           console.log(error)
        });
    }

    const navigateToResgisteration = () => {
        navigate('/register');
    };

    const naviagteToLanding = () => {
        navigate('/');
        window.location.reload();
    };

    return(
        <div className="login_container" >           
            <div className="login_form">
                <div className="login_form_content">
                    <div className="login_content">
                        <h1>Sign in</h1>
                        <input type="text" placeholder="Email" className="textfield" onChange={(e) =>setInput({...input, email: e.target.value})}></input>
                        <input type="password" placeholder="Password" className="textfield" onChange={(e) =>setInput({...input, password: e.target.value})}></input>

                        <button className="blue_btn" onClick={submit}>Sign in</button> 
                    </div>
                    <p className="create_account">Don't have an account? <button onClick={navigateToResgisteration} className="transparent_btn"><span className="blueText">Sign up</span></button></p>
                </div>
            </div>
        </div>
    )
}

export default LoginFrom;