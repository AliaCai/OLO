import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login_Signup from "./components/LoginSignup/Login_Signup";
import Events from "./components/Events/Events";
import Header from "./components/Header/Header";
import SidebBar from "./components/SideBar/SidebBar";
function Layout() {
  const location = useLocation().pathname;

  return (
    <>
      {location !== "/" && <Header />}
      <div className="innerPage_row">
        {location !== "/" && <SidebBar />}
        <Routes>
          <Route path="/" element={<Login_Signup />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
