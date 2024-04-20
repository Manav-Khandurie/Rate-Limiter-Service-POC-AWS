import React from 'react'
import loginImg from "../assets/login.png"
import Template from '../components/Template'

const Login = ({ setIsLoggedIn }) => {
  return (
    <Template
      title="Welcome Back"
      image={loginImg}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login
