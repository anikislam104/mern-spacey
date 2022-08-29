import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import NavbarHomepage from "../navbar_homepage";
import Footer from '../Footer';
import  "./viewProfile.css";

const ViewProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nidNumber, setNidNumber] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const user = {
      user_id: localStorage.getItem("user_id"),
    };
    axios
      .post("http://localhost:5000/users/getUserDetails", user)
      .then((res) => {
        console.log(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setDateOfBirth(res.data.dateOfBirth);
        setEmail(res.data.email);
        setPhone(res.data.phoneNumber);
        setNidNumber(res.data.nidNumber);
        setImage(res.data.image);
      });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    window.location = "/editProfile";
  };

  const showProperties = (e) => {
    e.preventDefault();
    window.location = "/viewProperties";
  };

  const handleBookings = (e) => {
    e.preventDefault();
    window.location = "/renting/my_bookings";
  };
 
  const handleHostings = (e) => {
    e.preventDefault();
    window.location = "/my_hostings";
  };

  const handleComplaints = (e) => {
    e.preventDefault();
    window.location = "/view_complaints";
  };

  const handlePaymentHistory = (e) => {
    e.preventDefault();
    window.location = "/payment/payment_history";
  };

  return (
    <div class="bg-light">
        {/* //show user profile */}
        <NavbarHomepage />
        

        <div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
<div class="col-xl-12 col-md-12">
                      <div class="card user-card-full">
                          <div class="row m-l-0 m-r-0">
                              <div class="col-sm-4 bg-c-lite-green user-profile">
                                  <div class="card-block text-center text-white">
                                      <div class="m-b-25">
                                      <img src={process.env.PUBLIC_URL+"/images/"+image}  
                                      style={{  margin:"0 auto",width: "250px" , height: "300px ", display: "flex" }} alt="..."/>
                                      </div>
                                      <h6 class="f-w-600">{firstName} {lastName}</h6>
                                      
                                      <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                  </div>
                              </div>
                              <div class="col-sm-8">
                                  <div class="card-block">
                                    <br/><br/><br/>
                                      <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                      <div class="row">
                                          <div class="col-sm-6">
                                              <p class="m-b-10 f-w-600">Email</p>
                                              <h6 class="text-muted f-w-400"> {email}</h6>
                                          </div>
                                          <div class="col-sm-6">
                                              <p class="m-b-10 f-w-600">Phone</p>
                                              <h6 class="text-muted f-w-400">{phone}</h6>
                                          </div>
                                      </div>
                                      
                                      <div class="row">
                                          <div class="col-sm-6">
                                          <br/>
                                              <p class="m-b-10 f-w-600"> Date of Birth</p>
                                              <h6 class="text-muted f-w-400">{dateOfBirth}</h6>
                                          </div>
                                          <div class="col-sm-6">
                                          <br/>
                                              <p class="m-b-10 f-w-600">Nid Number</p>
                                              <h6 class="text-muted f-w-400">{nidNumber}</h6>
                                          </div>
                                      </div>
                                  
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                    </div>
                      </div>
                  </div>

          <br />

          <div class="row align-items-center">
          <div class="col-lg-1"></div>
              <div class="col-lg-2">
          <button className="btn btn-primary" style={{backgroundColor:"#ee5a6f"}} onClick={handleBookings}>
            My Bookings
          </button>
          </div>

          <div class="col-lg-1"></div>
         
          <div class="col-lg-2">
          <button className="btn btn-primary" style={{backgroundColor:"#ee5a6f"}} onClick={handleHostings}>
            My Hostings
          </button>
          </div>

          <div class="col-lg-1"></div>

          <div class="col-lg-2">
          <button className="btn btn-primary" style={{backgroundColor:"#ee5a6f"}} onClick={handlePaymentHistory}>
            Payment History
          </button>
          </div>

          <div class="col-lg-1"></div>

          <div class="col-lg-2">
          <button className="btn btn-primary" style={{backgroundColor:"#ee5a6f"}} onClick={handleComplaints}>
            Complaints
          </button>
          </div>

          </div>
          <br />
          <br />


          <br/>
          <br/>

          <div class="row align-items-center">
          <div class="col-lg-3"></div>
              <div class="col-lg-4">

&emsp;
          <button className="btn btn-primary" style={{backgroundColor:"#ee5a6f"}} onClick={handleEdit}>
            Edit Profile
          </button>
          </div>
          <br />
          <br />
          <div class="col-lg-3">
          
          <button className="btn btn-primary" style={{backgroundColor:"#ee5a6f"}} onClick={showProperties}>
            Show my properties
          </button>
          </div>
          </div>
          <br/><br/><br/>
<Footer/> 
        </div>
      
    
  );
};

export default ViewProfile;
