import axios from "axios";
import React from "react";
// import NavbarHomepage from "../navbar_homepage";
import { useEffect } from "react";
import  "./viewProfile.css";
// import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./adminNavbar";

const UserProfileAdmin = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [complaints, setComplaints] = React.useState([]);
    const [image, setImage] = React.useState("");
    // const { setHostId } = ChatState();
    const navigate = useNavigate();

    useEffect(() => {
        const user_id = {
            user_id: localStorage.getItem("clicked_user_id"),
        }
        axios.post("http://localhost:5000/users/clicked_profile", user_id)
            .then((res) => {
                console.log(res.data);
                setName(res.data.name);
                setEmail(res.data.email);
                setPhone(res.data.phoneNumber);
                setComplaints(res.data.complaints);
                setImage(res.data.image);
            })
    }, []);

    //style h2 tag 
    const style = {
        fontSize: "19px",
        color: "#0E2A53",
        fontWeight: "bold",
        textAlign: "left",
        marginTop: "10px",
    };

    return (
        <div class="bg-light">
            <AdminNavbar />
            <br/>
            <h1 class="display-6" style={{textAlign:"center"}}><b>User Profile</b></h1>
            <br/>

            <div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
<div class="col-xl-8 col-md-12">
                      <div class="card user-card-full">
                          <div class="row m-l-0 m-r-0">
                              <div class="col-sm-4 bg-c-lite-green user-profile">
                                  <div class="card-block text-center text-white">
                                      <div class="m-b-25">
                                      <img src={process.env.PUBLIC_URL+"/images/"+image}  
                                      style={{  margin:"0 auto",width: "200px" , height: "200px ", display: "flex" }} alt="..."/>
                                      </div>
                                      <h6 class="f-w-600">{name}</h6>
                                      
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
                                  
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                    </div>
                      </div>
                  </div>
           
                  <div class="row align-items-center">
          <div class="col-lg-7"></div>
          <div class="col-lg-4">
          <p style={{textAlign:"left"}}>
            <button
              className="btn btn-primary"
              
              onClick={() => {
                navigate("/show_property_admin");
              }}
            >
              Show Properties
            </button></p>
<p style={{textAlign:"right"}}>
            <button
              className="btn btn-primary"
              
              onClick={() => {
                navigate("/chat");
              }}
            >
              Chat with {name}
            </button></p>

            <p style={{textAlign:"left"}}>
            <button
              className="btn btn-primary"
              
              onClick={() => {
                navigate("/payment/payment_history");
              }}
            >
              Payment History
            </button></p>

            </div>
            </div>

<br/><br/><br/>
                  <p class="fs-4" style={{textAlign:"left"}}><b>Complaints:</b></p>
                  <br/>
                      <div className="card mb-5 box-shadow" style={{width:"1300px", height:"60px",backgroundColor:"white"}}>
                  <br/>
                    
                        
                       
                        {complaints.map((complaint) => {
                            return (
                                <div>
                                    <h2 style={style}>&emsp;&emsp;&emsp;&emsp;{complaint.complaint}</h2>
                                    <br />
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                    
</div>
            
    )

       
   
}

export default UserProfileAdmin;
