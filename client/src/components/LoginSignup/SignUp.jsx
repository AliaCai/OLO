import React from 'react'
import './LoginSignup.css'
import user_icon from '../assets/person.png'
import password_icon from '../assets/passw.png'
import leftArrow_icon from '../assets/leftArrow.png'
import email from '../assets/email.png'
import verification from '../assets/verification_code.png'

const SignUp = (props) => {
  return (
    <div className='LoginSignup'>
      <div className="returnLogin" onClick={props.switchSignUp}>
        <img src={leftArrow_icon} alt="go back" />

      </div>
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

                <div className="input">
                <img src={email}  alt="login_email" />
                <input type="email" placeholder='email'></input>
                <div className="send_code">verfiy</div>
            </div>

            <div className="input">
                <img src={verification} alt="login_verfication_code" />
            <input type="verification_code" placeholder='verfication code'></input>
            </div>

          </div>

            <div className="submit">Sign Up</div>




          
    </div>
  )
}

export default SignUp
