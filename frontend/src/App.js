import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter,Route,Routes} from "react-router-dom";

import Navbar from "./components/navbar"
import CreateUser from "./components/create-user";
import Login from "./components/login";
import OTP from "./components/otp";
import SignUpConfirmation from "./components/signUp_conf";
import Homepage from "./components/homepage";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
      <Navbar />
      <br/>
      <Routes>
        <Route path="user" element={<CreateUser />} />
        <Route path="login" element={<Login />} />
        <Route path="otp" element={<OTP />} />
        <Route path="signupconf" element={<SignUpConfirmation />} />
        <Route path="homepage" element={<Homepage />} />
      </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
