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

import PaymentHome from "./components/Payment/paymentHome";
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
import RentRequestNotification from "./components/Renting/notification";
import AddInsurance from "./components/Insurance/addInsurance";
import ForgetPassword from "./components/Authentication/forget_password";
import ForgetPasswordOTP from "./components/Authentication/forget_password_otp";
import AdminHomepage from "./components/Admin/adminHomepage";
import EditProfile from "./components/Profile/editProfile";
import ViewProfile from "./components/Profile/viewProfile";
import ShowMyBlog from "./components/Blog/showMyBlog";
import EditBlog from "./components/Blog/editBlog";
import ChooseStayDuration from "./components/Renting/choose_facility";
import Notification from "./components/notification";
import ViewProperties from "./components/Profile/viewProperties";
import EditProperty from "./components/Profile/editProperty";
import MyBookings from "./components/Renting/myBookings";
import EditRooms from "./components/Profile/editRooms";
import EditFacilities from "./components/Profile/editFacilities";
import CurrentBookings from "./components/Renting/current_bookings";
import ChangeDuration from "./components/Renting/changeDuration";
import ExtendNotification from "./components/Renting/extendNotification";
import PastBooking from "./components/Renting/past_bookings";
import MyHostings from "./components/Renting/myHostings";
import ChatProvider from "./Context/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react";
import Chatpage from "./Pages/Chatpage";
import ShowInsurance from "./components/Insurance/showInsurance";
import CurrentHostings from "./components/Renting/currentHosting";
import PastHostings from "./components/Renting/pastHosting";
import UserProfile from "./components/Profile/clickedProfile";
import ShowComplaints from "./components/Admin/showComplaints";
import ViewComplaints from "./components/Profile/viewComplaints";
import UserSearch from "./components/Admin/userSearch";
import UserProfileAdmin from "./components/Admin/userProfileAdmin";
import ShowPropertyAdmin from "./components/Admin/showPropertyAdmin";
import SelectedPropertyAdmin from "./components/Admin/selectedPropertyAdmin";
import PaymentHistoryUser from "./components/Admin/paymentHistoryUser";
import PaymentHistoryAll from "./components/Admin/paymentHistoryAll";
import ShowBlogAdmin from "./components/Admin/ShowBlogAdmin";
import ShowBlogAd from "./components/Admin/ShowBlog";
import ShowClickedBlogs from "./components/Profile/showClickedBlogs";
import ShowClickedBlog from "./components/Profile/showClickedBlog";
import ShowClickedProperties from "./components/Profile/showClickedProperties";
import SelectedPropertyClicked from "./components/Profile/selected_property_clicked";


function App() {
  return (
    
    <BrowserRouter>
    <ChatProvider>
    
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
        <Route path="notification" element={<Notification />} />
        <Route path="viewProperties" element={<ViewProperties />} />
        <Route path="editProperty" element={<EditProperty />} />
        <Route path="editRooms" element={<EditRooms />} />
        <Route path="editFacilities" element={<EditFacilities />} />
        <Route path="user_profile" element={<UserProfile />} />
        <Route path="view_complaints" element={<ViewComplaints />} />
        <Route path="showClickedBlogs" element={<ShowClickedBlogs />} />
        <Route path="showClickedBlog" element={<ShowClickedBlog />} />
        <Route path="showClickedProperties" element={<ShowClickedProperties />} />
        <Route path="selected_property_clicked" element={<SelectedPropertyClicked />} />
        
        

        {/* Hosting */}
        <Route path="hosting" element={<HostingOpeningPage />}/>
        <Route path="add-property" element={<AddProperty />}/>
        <Route path="add-business-storage" element={<AddBusinessStorage />}/>


        {/* Insurance */}
        <Route path="add_insurance" element={<AddInsurance />}/>
        <Route path="show_insurance" element={<ShowInsurance />}/>

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
        <Route path="rent_request_notifications" element={<RentRequestNotification />} />
        <Route path="renting/choose_facility" element={<ChooseStayDuration />} />
        <Route path="renting/my_bookings" element={<MyBookings />} />
        <Route path="current_bookings" element={<CurrentBookings />} />
        <Route path="change_duration" element={<ChangeDuration />} />
        <Route path="extend_notification" element={<ExtendNotification />} />
        <Route path="past_bookings" element={<PastBooking />} />
        <Route path="my_hostings" element={<MyHostings />} />
        <Route path="current_hostings" element={<CurrentHostings />} />
        <Route path="past_hostings" element={<PastHostings />} />
        


        {/* Payment */}
        <Route path="payment/payment_home" element={<PaymentHome />} />
        <Route path="payment/mobile_banking" element={<MobileBanking />} />
        <Route path="payment/cash_payment" element={<CashPayment />} />
        <Route path="payment/payment_success" element={<PaymentSuccess />} />
        <Route path="payment/payment_failure" element={<PaymentFailure />} />
        <Route path="payment/payment_approval" element={<PaymentApproval />} />
        <Route path="payment/payment_reject" element={<PaymentReject />} />
        <Route path="payment/payment_history" element={<PaymentHistory />} />
        <Route path="payment/payment_notifications" element={<PaymentNotifications />} />
        
        {/* Notifications */}

        {/* Admin */}
        <Route path="show_complaints" element={<ShowComplaints />} />
        <Route path="user_search" element={<UserSearch />} />
        <Route path="user_profile_admin" element={<UserProfileAdmin />} />
        <Route path="show_property_admin" element={<ShowPropertyAdmin />} />
        <Route path="selected_property_admin" element={<SelectedPropertyAdmin />} />
        <Route path="payment_history_user" element={<PaymentHistoryUser />} />
        <Route path="payment_history_all" element={<PaymentHistoryAll />} />
        <Route path="show_blogs_admin" element={<ShowBlogAdmin />} />
        <Route path="show_blog_admin" element={<ShowBlogAd />} />
        
        
      </Routes>
      <ChakraProvider>
      <Routes>
        {/* Chat */}
        
        <Route path="chat" element={<Chatpage />} />
      </Routes>
      </ChakraProvider>

      </div>
      </ChatProvider>
      </BrowserRouter>
    
  );
}

export default App;