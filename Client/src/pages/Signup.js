import React from 'react'
import signupImg from "../assets/signup.jpg"
import Template from '../components/Template'

const Signup = ({ setIsLoggedIn }) => {
  return (
    <Template
      title="Join the RAM API Limiter"
      image={signupImg}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup
