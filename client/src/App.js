import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login_Signup from "./components/LoginSignup/Login_Signup";
import Events from "./components/Events/Events";
import Header from "./components/Header/Header";
import SidebBar from "./components/SideBar/SidebBar";
function App() {
  return (
    <Router>
      <Header />
      <div className="innerPage_row">
        <SidebBar />
        <Routes>
          <Route path="/" element={<Login_Signup />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
