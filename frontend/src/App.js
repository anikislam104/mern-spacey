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
import AddBusinessStorage  from "./components/Hosting/addBusinessStorage";
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
import PaymentNotifications from "./components/Payment/paymentNotifications";
import PaymentApproval from "./components/Payment/paymentApproval";
import PaymentReject from "./components/Payment/paymentReject";
import PaymentHistory from "./components/Payment/paymentHistory";

import RentingHome from "./components/Renting/rentingHome";
import SelectedProperty from "./components/Renting/selectedProperty";
import Notification from "./components/Renting/notification";
import AddInsurance from "./components/Insurance/addInsurance";
import ForgetPassword from "./components/Authentication/forget_password";
import ForgetPasswordOTP from "./components/Authentication/forget_password_otp";
import AdminHomepage from "./components/adminHomepage";
import EditProfile from "./components/Profile/editProfile";
import ViewProfile from "./components/Profile/viewProfile";
import ShowMyBlog from "./components/Blog/showMyBlog";
import EditBlog from "./components/Blog/editBlog";
import ChooseStayDuration from "./components/Renting/choose_facility";



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
        <Route path="forget_password_otp" element={<ForgetPasswordOTP />} />
        <Route path="adminHomepage" element={<AdminHomepage />} />
        <Route path="logout" element={<Logout />} />


        {/* Profile */}
        <Route path="editProfile" element={<EditProfile />} />
        <Route path="viewProfile" element={<ViewProfile />} />
        
        

        {/* Hosting */}
        <Route path="hosting" element={<HostingOpeningPage />}/>
        <Route path="add-property" element={<AddProperty />}/>
        <Route path="add-business-storage" element={<AddBusinessStorage />}/>

        {/* Insurance */}
        <Route path="add-insurance" element={<AddInsurance />}/>

        {/* Blog */}
        <Route path="blog" element={<BlogHome />} />
        <Route path="writeBlog" element={<WriteBlog />} />
        <Route path="readBlogs" element={<ReadBlogs />} />
        <Route path="readBlogs/myBlogs" element={<MyBlogs />} />
        <Route path="readBlogs/allBlogs" element={<AllBlogs />} />
        <Route path="blog/showBlog" element={<ShowBlog />} />
        <Route path="blog/showMyBlog" element={<ShowMyBlog />} />
        <Route path="blog/editBlog" element={<EditBlog />} />
        


        {/* Renting  */}
        <Route path="renting" element={<RentingHome />} />
        <Route path="renting/selected_property" element={<SelectedProperty />} />
        <Route path="rent_request_notifications" element={<Notification />} />
        <Route path="renting/choose_facility" element={<ChooseStayDuration />} />


        {/* Payment */}
        <Route path="payment/mobile_banking" element={<MobileBanking />} />
        <Route path="payment/cash_payment" element={<CashPayment />} />
        <Route path="payment/payment_success" element={<PaymentSuccess />} />
        <Route path="payment/payment_failure" element={<PaymentFailure />} />
        <Route path="payment/payment_approval" element={<PaymentApproval />} />
        <Route path="payment/payment_reject" element={<PaymentReject />} />
        <Route path="payment/payment_history" element={<PaymentHistory />} />
        <Route path="payment/payment_notifications" element={<PaymentNotifications />} />
        
        {/* Notifications */}
        
      </Routes>

      </div>
      
    </BrowserRouter>
    
    
  );
}

export default App;