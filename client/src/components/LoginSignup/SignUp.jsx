import React,{useState} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import './LoginSignup.css'
import user_icon from '../assets/person.png'
import password_icon from '../assets/passw.png'
import leftArrow_icon from '../assets/leftArrow.png'
import email from '../assets/email.png'
import verification from '../assets/verification_code.png'

import userModel from '../../models/userModel'

const SignUp = (props) => {
  const [register,setRegister]=useState(new userModel({}))


  function handleChange(e){
    const {name,value}=e.target
    setRegister({...register,[name]:value})
  }

  async function handleVerify(e){
    e.preventDefault()
    const response=await fetch("http://localhost:4000/email_verify",{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({email:register.email})
    })
    toast.success('Verification email is sent!')
    console.log('verificaion email sent')
    const data=await response.json()
  }


  async function handleSubmit(e){
    // console.log('hello?')
    e.preventDefault()
    try{
      const response = await fetch('http://localhost:4000/register',{
      method:'POST',
      headers:{"content-type":"application/json"},
      body:JSON.stringify(register)
    })
    const data= await response.json()

    console.log('before the difference',response, data)
    if(response.status!==200){
     toast.error(`Sign up error: ${data.message}`)
    }else{
    toast.success(`Success: ${data.message}`)
    }


    }catch(error){
      toast.error(`Network up error: ${error.message}`)

    }
  }

  return (
    <div className='LoginSignup'>
      <ToastContainer autoClose={1000} position='top-center' />
      <div className="returnLogin" onClick={props.switchSignUp}>
        <img src={leftArrow_icon} alt="go back" />

      </div>
       <div className="companyName">OLO</div>
          <div className="inputs">
              <div className="input">
                <img src={user_icon} alt="login_username" />
            <input type="text" name='name' placeholder='username' required value={register.name}onChange={handleChange}></input>
            </div>
            <div className="input">
                <img src={password_icon}  alt="login_password" />
                <input type="password" name='password'  placeholder='password' required value={register.password} onChange={handleChange}></input>
            </div>

                <div className="input">
                <img src={email}  alt="login_email" />
                <input type="email"  name="email" placeholder='email' required value={register.email} onChange={handleChange}></input>
                <div className="send_code" onClick={handleVerify}>verfiy</div>
            </div>

            <div className="input">
                <img src={verification} alt="login_verfication_code" />
            <input type="text" name="verification_code" placeholder='verfication code' required value={register.verification_code} onChange={handleChange}></input>
            </div>

          </div>

            <div className="submit"  onClick={handleSubmit} >Sign Up</div>



          
    </div>
  )
}

export default SignUp
