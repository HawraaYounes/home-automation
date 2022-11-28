import React from 'react';
import  RegisterForm from '../components/register/register';
import '../components/register/register.css'

function Register() {
    return (
      <>
      <div className='register-page'>
      <div>
        <RegisterForm/>
      </div>
      </div>
      </>
    );
  }

export default Register;