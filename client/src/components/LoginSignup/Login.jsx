import React from 'react'
import SignUp from "./SignUp";

import './LoginSignup.css'
import user_icon from '../assets/person.png'
import password_icon from '../assets/passw.png'
import google from '../assets/google.png'
import github from '../assets/github.png'
import discord from '../assets/discord.png'

const Login = (props) => {
  return (
    <div className='LoginSignup'>

       <div className="companyName">OLO</div>
          <div className="inputs">
            <div className="input">
                <img src={user_icon} alt="login_username" />
            <input type="name" placeholder='username'></input>
            </div>
            <div className="input">
                <img src={password_icon}  alt="login_password" />
                <input type="password" placeholder='password'></input>
            </div>

          </div>
          <div className="forgotPass-signUp">
                    <div className="forgotPassword">Forgot Password</div>
             <div className="signup" onClick={props.switchSignUp}>Sign Up</div>
          </div>

            <div className="submit">Log In</div>

            <div className="Page1_signUpMethods">
              <div className="google">
                <img src={google} alt="google icon" />
              </div>
              <div className="github">
                              <img src={github} alt="github icon" />

              </div>
              <div className="discord">
                <img src={discord} alt="discord icon" />

              </div>
            </div>


          
    </div>
  )
}

export default Login
