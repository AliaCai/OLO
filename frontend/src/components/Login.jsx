import React from 'react'
import SignUp from "./SignUp";
import {toast, ToastContainer} from 'react-toastify'
import * as Yup from "yup"
import '../styles/LoginSignup.css'
import user_icon from '../assets/person.png'
import password_icon from '../assets/passw.png'
import google from '../assets/google.png'
import github from '../assets/github.png'
import discord from '../assets/discord.png'
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
  
  const validateLogin=Yup.object().shape({
    name:Yup.string().required('user name is required').min(3, "user name length is incorrect").max(30,"user name length is incorrect"),
    password:Yup.string().required('password is required').min(6, "user password length is incorrect").max(15, "user password length is incorrect")
  })
  const [login, setLogin]=useState({name:'',password:''})
  const [errMsgs,setErrMsgs]=useState({name:'',password:''})
    const navigate=useNavigate()

  let accessToken='';
  let refreshToken='';
  function handelChange(e){
    const {name, value}=e.target
    setLogin({...login,[name]:value})


     validateLogin.validateAt(name, {[name]:value}, {abortEarly:false}).then(()=>{setErrMsgs({... errMsgs,[name]:""})}).catch((error)=>{
      setErrMsgs({... errMsgs,[name]:error.errors[0]})
    })
    // console.log(login)
  }

  async function handelSubmit(e){
    // console.log('submit----', login)
    e.preventDefault()
    try{
    const user=await validateLogin.validate(login, {abortEarly:false})
    // console.log('nexttttt')
      try{
        const response=await fetch('http://localhost:4000/api/login',{
        method:'POST',
        credentials:'include', //credentials for cookies -> remove for pord &&&
        headers:{'content-type':"application/json"},
        body:JSON.stringify(user)
      })
      const data=await response.json()

      if(response.status!==200){
        throw new Error(data.message)
      }else{
      accessToken=data.accessToken
      refreshToken=data.refreshToken
      // console.log("finish",accessToken, refreshToken)
      toast.success(`${login.name} login Successfully`)
      navigate('/events')
      }

      }catch(error){
      toast.error(`${error.message}`)
      }
    }catch(errors){
      const textError={name:'',password:''}
      errors.inner.forEach((e)=>textError[e.path]=e.message)
      setErrMsgs(textError)
    }
  }


  return (
    <div className='LoginSignup'>
      <ToastContainer position='top-center' autoClose={1000} />
       <div className="companyName">OLO</div>
          <div className="inputs">
            <div className="input">
                <img src={user_icon} alt="login_username" />
            <div className="input_err">
            <input type="text" name='name' value={login.name} onChange={handelChange} placeholder='username'></input>
            <div className="errMsg">{errMsgs.name}</div>
            </div>
            </div>
            <div className="input">
                <img src={password_icon}  alt="login_password" />
                <div className="input_err">
                <input type="password" name='password' value={login.password} onChange={handelChange} placeholder='password'></input>
                    <div className="errMsg">{errMsgs.password}</div>
            </div>
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
