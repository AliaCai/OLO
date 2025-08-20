import React from 'react'
import SignUp from "./SignUp";
import {toast, ToastContainer} from 'react-toastify'
import './LoginSignup.css'
import user_icon from '../assets/person.png'
import password_icon from '../assets/passw.png'
import google from '../assets/google.png'
import github from '../assets/github.png'
import discord from '../assets/discord.png'
import { useEffect, useState } from "react";

const Login = (props) => {

  const [login, setLogin]=useState({name:'',password:''})
  let accessToken='';
  let refreshToken='';

  function handelChange(e){
    const {name, value}=e.target
    setLogin({...login,[name]:value})
    // console.log(login)
  }

  async function handelSubmit(e){
    // console.log('submit----', login)
    e.preventDefault()

    try{
          const response=await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{'content-type':"application/json"},
      body:JSON.stringify(login)
    })
    const data=await response.json()

    if(response.status!==200){
      throw new Error(data.message)
    }else{

    accessToken=data.accessToken
    refreshToken=data.refreshToken
    // console.log("finish",accessToken, refreshToken)
    toast.success(`${login.name} login Successfully`)
    }

    }catch(error){
     toast.error(`${error.message}`)
    }

  }


  return (
    <div className='LoginSignup'>
      <ToastContainer position='top-center' autoClose={1000} />
       <div className="companyName">OLO</div>
          <div className="inputs">
            <div className="input">
                <img src={user_icon} alt="login_username" />
            <input type="text" name='name' value={login.name} onChange={handelChange} placeholder='username'></input>
            </div>
            <div className="input">
                <img src={password_icon}  alt="login_password" />
                <input type="password" name='password' value={login.password} onChange={handelChange} placeholder='password'></input>
            </div>

          </div>
          <div className="forgotPass-signUp">
                    <div className="forgotPassword">Forgot Password</div>
             <div className="signup" onClick={props.switchSignUp}>Sign Up</div>
          </div>

        <div className="submit" onClick={handelSubmit}>Log In</div>

            {/* <div className="Page1_signUpMethods">
              <div className="google">
                <img src={google} alt="google icon" />
              </div>
              <div className="github">
                              <img src={github} alt="github icon" />

              </div>
              <div className="discord">
                <img src={discord} alt="discord icon" />

              </div>
            </div> */}


          
    </div>
  )
}

export default Login
