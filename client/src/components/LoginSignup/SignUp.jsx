import React,{useState} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import * as Yup from 'yup'
import './LoginSignup.css'
import user_icon from '../assets/person.png'
import password_icon from '../assets/passw.png'
import leftArrow_icon from '../assets/leftArrow.png'
import email from '../assets/email.png'
import verification from '../assets/verification_code.png'

// import userModel from '../../models/userModel'
const validateUser=Yup.object().shape({
  name:Yup.string().min(3, 'user name must contain at least 3 characters.').max(30,'user name must not exceed 30 characters').matches('[aA-zZ]','user name must containe at least 1 alphabetic character').required('user name is required'),
  email:Yup.string().email("Invalid email").required('user email is required'),
  password:Yup.string().min(6, 'user password must contain at least 7 characters.').max(15,'user password must not exceed 15 characters').matches('[a-z]','user password must containe at least 1 lowercase character').matches('[A-Z]','user password must containe at least 1 uppercase character').matches('[0-9]','user password must containe at least 1 number').required('user password is required'),
  verification_code:Yup.number().typeError('verification code can only be a number').required('verification code is required')

})

const SignUp = (props) => {
  console.log('-------')
  const [register,setRegister]=useState({name:'',email:'',password:'',verification_code:null})
  const [errMsgs, setErrMsgs]=useState({name:'',email:'',password:'',verification_code:null})

  function handleChange(e){
    const {name,value}=e.target
    setRegister({...register,[name]:value})
    // console.log('before',name,value,validateUser.validateAt(name, {name:value}).then(()=>{}).catch(()=>{}))
  
      validateUser.validateAt(name, {[name]:value}).then(()=>setErrMsgs({...errMsgs,[name]:''})).catch((err)=>{
      setErrMsgs({...errMsgs,[name]:err.errors[0]});
      // console.log('still errors',err.errors,name, errMsgs)

    })

    console.log("errorMessges",errMsgs)
  }

  async function handleVerify(e){
    e.preventDefault()
    const response=await fetch("http://localhost:4000/email_verify",{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({email:register.email})
    })
    const data=await response.json()

    if(!response.ok){
        toast.error(`Verification email Error: ${data.message}`)

    }else{

      toast.success('Verification email is sent!')
    }
  }


  async function handleSubmit(e){
    e.preventDefault()

    console.log('hello?')
     try{
    const user = await validateUser.validate(register,{abortEarly:false})

    try{
      setErrMsgs({name:'',email:'',password:''})
      const response = await fetch('http://localhost:4000/register',{
      method:'POST',
      headers:{"content-type":"application/json"},
      body:JSON.stringify(user)
    })
    const data= await response.json()

    console.log('before the difference',response, data)
    if(response.status!==200){
     toast.error(`${data.message}`)
    }else{
    toast.success(`Success: ${data.message}`)
    setTimeout(()=>{      props.switchSignUp()

    },1500)
    }
  }catch(error){
      toast.error(`Network up error: ${error.message}`)

    }

    }catch(error){
        const errorMsgs = {name:'',email:'',password:'',verification_code:null}
      error.inner.forEach((e)=>errorMsgs[e.path]=e.message)
      console.log('errMsgs,',errorMsgs, error.errors)
      setErrMsgs(errorMsgs)

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

            <div className='input_err'>
            <input type="text" name='name' placeholder='username' required value={register.name}onChange={handleChange}></input>
            <div className='errMsg'>{errMsgs.name}</div>
            </div>

            </div>
            <div className="input">
                <img src={password_icon}  alt="login_password" />

                 <div className='input_err'>
                <input type="password" name='password'  placeholder='password' required value={register.password} onChange={handleChange}></input>
                   <div className='errMsg'>{errMsgs.password}</div>
            </div>
            </div>

                <div className="input">
                <img src={email}  alt="login_email" />
                 <div className='input_err'>
                <div className= 'input_err_verify'>
                <input type="email"  name="email" placeholder='email' required value={register.email} onChange={handleChange}></input>
                <div className="send_code" onClick={handleVerify}>verfiy</div>
                </div>
                <div className='errMsg'>{errMsgs.email}</div>
            </div>
            </div>

            <div className="input">
                <img src={verification} alt="login_verfication_code" />
                <div className='input_err'>
                  <input type="text" name="verification_code" placeholder='verfication code' required value={register.verification_code} onChange={handleChange}></input>
                  <div className='errMsg'>{errMsgs.verification_code}</div>
                </div>
            </div>

          </div>

            <div className="submit"  onClick={handleSubmit} >Sign Up</div>



          
    </div>
  )
}

export default SignUp
