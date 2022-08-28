import axios from "axios";
import React, { useEffect } from "react";
import AdminNavbar from "./adminNavbar";

const ShowComplaints = () => {
    const [complaints, setComplaints] = React.useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/users/get_all_complaints')
            .then(res => {
                console.log(res.data);
                setComplaints(res.data);
            })
    }, []);

    return (
        <div>
            <AdminNavbar />
            <h1>Complaints</h1>
            <br />
            {/* //loop through complaints */}
            {complaints.map((complaint) => (
                <div>
                    <button onClick={
                        () => {
                            localStorage.setItem("selected_property_id", complaint.property_id);
                            window.location = "/renting/selected_property"; 
                        }
                    }><h2>Property title : {complaint.property_title}</h2></button>
                    <br />
                    <button onClick={
                        () => {
                            localStorage.setItem("clicked_user_id", complaint.complainant_id);
                            window.location = "/user_profile";
                        }
                    }><h2>Complaint from: {complaint.complainant_name}</h2></button>
                    <br />
                    <button onClick={
                        () => {
                            localStorage.setItem("clicked_user_id", complaint.complainee_id);
                            window.location = "/user_profile";
                        }
                    }><h2>Complain about: {complaint.complainee_name}</h2></button>
                    <br />
                    <h2>Complaint: {complaint.complaint}</h2>
                    <h2>Date: {complaint.date}</h2>
                    <br />
                    <button className="btn btn-primary" onClick={
                        () => {
                            const data = {
                                complaint_id: complaint.complaint_id,
                            }
                            axios.post('http://localhost:5000/users/delete_complaint', data)
                                .then(res => {
                                    console.log(res.data);
                                    alert("Complaint deleted");
                                    window.location.reload();
                                })
                        }
                    }>Delete complaint</button>
                    <br />
                    <br />
                </div>
            ))}
        </div>

        )

}   

export default ShowComplaints;