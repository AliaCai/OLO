import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/LoginSignup/Login";
import SignUp from "./components/LoginSignup/SignUp";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(true);
  function flipLogin(login) {
    setLogin(!login);
  }

  return (
    <div className="Page1">
      <div className="Page1_Layer1">
        {login ? (
          <Login switchSignUp={flipLogin} />
        ) : (
          <SignUp swithcLogin={flipLogin} />
        )}
      </div>
    </div>
  );
}

export default App;
