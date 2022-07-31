import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter,Route,Routes} from "react-router-dom";

// import Navbar from "./components/Authentication/navbar"
import CreateUser from "./components/Authentication/create-user";
import Login from "./components/Authentication/login";
import SignUpOTP from "./components/Authentication/signup_otp";
import LogInOTP from "./components/Authentication/login_otp";
import SignUpConfirmation from "./components/Authentication/signUp_conf";
import Homepage from "./components/homepage";
import OpeningPage from "./components/Authentication/opening_page";
import InvalidAuth from "./components/Authentication/invalidAuth";
import BlogHome from "./components/Blog/blogHome";
import AddProperty from "./components/Hosting/addProperty";
import HostingOpeningPage from "./components/Hosting/hostingOpeningPage";
import WriteBlog from "./components/Blog/writeBlog";
import ReadBlogs from "./components/Blog/readBlogs";
import MyBlogs from "./components/Blog/myBlogs";
import AllBlogs from "./components/Blog/allBlogs";
import ShowBlog from "./components/Blog/showBlog";
import Logout from "./components/logout";
import MobileBanking from "./components/Payment/mobileBanking";
import CashPayment from "./components/Payment/cashPayment";
import PaymentSuccess from "./components/Payment/paymentSuccess";
import PaymentFailure from "./components/Payment/paymentFailure";
import RentingHome from "./components/Renting/rentingHome";
import SelectedProperty from "./components/Renting/selectedProperty";
import Notification from "./components/Renting/notification";
import ForgetPassword from "./components/Authentication/forget_password";


function App() {
  return (
    <BrowserRouter>
      <div className="container">
      {/* <Navbar /> */}
      {/* <br/> */}
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<OpeningPage />} />
        <Route path="create-user" element={<CreateUser />} />
        <Route path="login" element={<Login />} />
        <Route path="signup_otp" element={<SignUpOTP />} />
        <Route path="login_otp" element={<LogInOTP />} />
        <Route path="signupconf" element={<SignUpConfirmation />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="invalidAuth" element={<InvalidAuth />} />
        <Route path="forget_password" element={<ForgetPassword />} />
        
        

        {/* Hosting */}
        <Route path="hosting" element={<HostingOpeningPage />}/>
        <Route path="add-property" element={<AddProperty />}/>


        {/* Blog */}
        <Route path="blog" element={<BlogHome />} />
        <Route path="writeBlog" element={<WriteBlog />} />
        <Route path="readBlogs" element={<ReadBlogs />} />
        <Route path="readBlogs/myBlogs" element={<MyBlogs />} />
        <Route path="readBlogs/allBlogs" element={<AllBlogs />} />
        <Route path="readBlogs/showBlog" element={<ShowBlog />} />
        <Route path="logout" element={<Logout />} />


        {/* Renting  */}
        <Route path="renting" element={<RentingHome />} />
        <Route path="renting/selected_property" element={<SelectedProperty />} />
        <Route path="rent_request_notifications" element={<Notification />} />


        {/* Payment */}
        <Route path="payment/mobile_banking" element={<MobileBanking />} />
        <Route path="payment/cash_payment" element={<CashPayment />} />
        <Route path="payment/payment_success" element={<PaymentSuccess />} />
        <Route path="payment/payment_failure" element={<PaymentFailure />} />

      </Routes>

      </div>
      
    </BrowserRouter>
    
    
  );
}

export default App;
