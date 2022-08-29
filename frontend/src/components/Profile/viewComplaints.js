import axios from "axios";
import React from "react";
import { useEffect } from "react";
import NavbarHomepage from "../navbar_homepage";

const name = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const ViewComplaints = () => {
    const [myComplaints, setMyComplaints] = React.useState([]);
    const [otherComplaints, setOtherComplaints] = React.useState([]);

    useEffect(() => {
        const id={
            user_id: localStorage.getItem('user_id'),
        }
        axios.post('http://localhost:5000/renting/get_my_complaints',id)
            .then(res => {
                console.log(res.data);
                setMyComplaints(res.data);

                axios.post('http://localhost:5000/renting/get_my_complaints_received',id)
                .then(res => {
                    console.log(res.data);
                    setOtherComplaints(res.data);   
                })
            })
    }, []);


    return (
        <div>
        <NavbarHomepage />

        <br/><br/><br/>
        <div class="row no-gutter bg-light">
        <div class="col-lg-2">
                                
        </div>
        <div class="col-lg-3"  style={{textAlign:"center",}}>
            
        <button className="btn btn-primary" onClick={
            () => {
                document.getElementById("my").style.display = "block";
                document.getElementById("other").style.display = "none";
            }
        }>My complaints</button>
        <br/><br/>
        <div id="my" style={{display:"none"}}>
            {myComplaints.map((complaint) => (
                <div className="card mb-4 box-shadow" id="my" style={{width:"330px", height:"200px",backgroundColor:"#e0ffff",textAlign:"center"}}>
                    <br/>
                    <button onClick={
                        () => {
                                  localStorage.setItem("selected_property_id", complaint.property_id);
                                  window.location = "/renting/selected_property"; 
                        }
                    }><h1><b>Property title : </b>{complaint.property_title}</h1></button>
                    <button onClick={
                        () => {
                            localStorage.setItem("clicked_user_id", complaint.complainee_id);
                            window.location = "/user_profile";
                        }
                    }><h1><b>Complainee : </b>{complaint.complainee_name}</h1></button>
                    <h1><b>Complaint : </b>{complaint.complaint}</h1>
                    <h1><b>Date : </b>&nbsp;{name[new Date(complaint.date).getMonth()]},{new Date(complaint.date).getDate()} {new Date(complaint.date).getFullYear()}</h1>
                    <br />
                    <br />
                </div>
            ))}
        </div>
        </div>

        <div class="col-lg-1">
                                
        </div>

        <div class="col-lg-3" style={{textAlign:"center",}}>
        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
        <button className="btn btn-primary" onClick={
            () => {
                document.getElementById("my").style.display = "none";
                document.getElementById("other").style.display = "block";
            }
        }>Complaints against</button>
        <br />
        <br />

        <div id="other" style={{display:"none"}}>
            {otherComplaints.map((complaint) => (
                <div className="card mb-4 box-shadow" id="other" style={{width:"330px", height:"200px",backgroundColor:"#e0ffff",textAlign:"center"}}>
                    <br/>
                    <button onClick={
                        () => {
                                    localStorage.setItem("selected_property_id", complaint.property_id);
                                        window.location = "/renting/selected_property"; 
                            }
                    }><h1><b>Property title : </b>{complaint.property_title}</h1></button>
                    <button onClick={
                        () => {
                            localStorage.setItem("clicked_user_id", complaint.complainant_id);
                            window.location = "/user_profile";
                        }
                    }><h1><b>Complainant : </b>{complaint.complainant_name}</h1></button>
                    <h1><b>Complaint : </b>{complaint.complaint}</h1>
                    <h1><b>Date :</b>&nbsp;{name[new Date(complaint.date).getMonth()]},{new Date(complaint.date).getDate()} {new Date(complaint.date).getFullYear()}</h1>
                    <br />
                    <br />
                </div>
            ))}
            </div>
        </div>
        </div>
        </div>
    );
    }

export default ViewComplaints;