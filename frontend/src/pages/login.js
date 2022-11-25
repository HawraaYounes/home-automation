import React from 'react';
import  LoginForm from '../components/Login/login';
import '../components/Login/login.css'

function Login() {
    return (
      <>
      <div className='login-page'>
      <div>
        <LoginForm/>
      </div>
      </div>
      </>
    );
  }

export default Login;