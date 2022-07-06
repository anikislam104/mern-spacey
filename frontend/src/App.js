import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter,Route,Routes} from "react-router-dom";

import Navbar from "./components/navbar"
import CreateUser from "./components/create-user";
import Login from "./components/login";
import OTP from "./components/otp";

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
      </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
