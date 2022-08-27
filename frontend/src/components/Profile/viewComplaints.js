import axios from "axios";
import React from "react";
import { useEffect } from "react";
import NavbarHomepage from "../navbar_homepage";

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
        <button className="btn btn-primary" onClick={
            () => {
                document.getElementById("my").style.display = "block";
                document.getElementById("other").style.display = "none";
            }
        }>My complaints</button>
        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
        <button className="btn btn-primary" onClick={
            () => {
                document.getElementById("my").style.display = "none";
                document.getElementById("other").style.display = "block";
            }
        }>Complaints against</button>
        <br />
        <br />
        <div id="my" style={{display:"none"}}>
            {myComplaints.map((complaint) => (
                <div>
                    <button onClick={
                        () => {
                                  localStorage.setItem("selected_property_id", complaint.property_id);
                                  window.location = "/renting/selected_property"; 
                        }
                    }><h1>Property title : {complaint.property_title}</h1></button>
                    <br />
                    <button onClick={
                        () => {
                            localStorage.setItem("clicked_user_id", complaint.complainee_id);
                            window.location = "/user_profile";
                        }
                    }><h1>Complainee : {complaint.complainee_name}</h1></button>
                    <h1>Complaint : {complaint.complaint}</h1>
                    <h1>Date : {complaint.date}</h1>
                    <br />
                    <br />
                </div>
            ))}
        </div>
        <div id="other" style={{display:"none"}}>
            {otherComplaints.map((complaint) => (
                <div>
                    <button onClick={
                        () => {
                                    localStorage.setItem("selected_property_id", complaint.property_id);
                                        window.location = "/renting/selected_property"; 
                            }
                    }><h1>Property title : {complaint.property_title}</h1></button>
                    <br />
                    <button onClick={
                        () => {
                            localStorage.setItem("clicked_user_id", complaint.complainant_id);
                            window.location = "/user_profile";
                        }
                    }><h1>Complainant : {complaint.complainant_name}</h1></button>
                    <h1>Complaint : {complaint.complaint}</h1>
                    <h1>Date : {complaint.date}</h1>
                    <br />
                    <br />
                </div>
            ))}
        </div>
        </div>
    );
    }
export default ViewComplaints;