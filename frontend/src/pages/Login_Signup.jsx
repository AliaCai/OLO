import "../styles/Login_Signup.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login.jsx";
import SignUp from "../components/SignUp.jsx";
import { useState } from "react";

function Login_Signup() {
  const [login, setLogin] = useState(() => true);
  function flipLogin(login) {
    setLogin((preval) => !preval);
  }

  return (
    <div className="Login_Signup">
      <div className="Login_Signup_Layer1">
        {login ? (
          <Login switchSignUp={flipLogin} />
        ) : (
          <SignUp switchSignUp={flipLogin} />
        )}
      </div>
    </div>
  );
}

export default Login_Signup;
