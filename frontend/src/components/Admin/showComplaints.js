import axios from "axios";
import React, { useEffect } from "react";
import AdminNavbar from "./adminNavbar";

const arr=[];
const name = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const getArrayElements=()=>{
    let first=-3;
    let second=-2;
    let third=-1;
    
    return arr.map((item)=>{
        first=first+3;
        second=second+3;
        third=third+3;

        return(
            <div class="row align-items-center">

            <div class="col-lg-2">
                {arr[first]}  
            </div>
            <div class="col-lg-2">

                </div>
            <div class="col-lg-2">
                {arr[second]}  
            </div>
            <div class="col-lg-2">

                </div>
            <div class="col-lg-2">
                {arr[third]}  
            </div>
            </div>
        );
    })
        
    
}

const clearArrayElements=()=>{
    arr.splice(0, arr.length)
  }  

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
            <br/>
            <h1 class="display-6" style={{textAlign:"center"}}><b>Complaints</b></h1>
            <br />
            {/* //loop through complaints */}

            {complaints.map((complaint) => (
                
                arr.push(
                    <div className="card mb-4 box-shadow" style={{width:"330px", height:"300px",backgroundColor:"#e0ffff",textAlign:"center"}}>
                    <br/>
                    <button onClick={
                        () => {
                            localStorage.setItem("selected_property_id", complaint.property_id);
                            window.location = "/renting/selected_property"; 
                        }
                    }><h2><b>Property title :</b> {complaint.property_title}</h2></button>
                    <br />
                    <button onClick={
                        () => {
                            localStorage.setItem("clicked_user_id", complaint.complainant_id);
                            window.location = "/user_profile";
                        }
                    }><h2><b>Complaint from:</b> {complaint.complainant_name}</h2></button>
                    <br />
                    <button onClick={
                        () => {
                            localStorage.setItem("clicked_user_id", complaint.complainee_id);
                            window.location = "/user_profile";
                        }
                    }><h2><b>Complain about:</b> {complaint.complainee_name}</h2></button>
                    <br />
                    <h2><b>Complaint:</b> {complaint.complaint}</h2>
                    <br/>
                    <h2><b>Date:</b>&nbsp;{name[new Date(complaint.date).getMonth()]},{new Date(complaint.date).getDate()} {new Date(complaint.date).getFullYear()}</h2>
                    <br />
                    <div style={{textAlign:"center"}}>
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
                    }>Delete complaint</button></div>
                    <br />
                    <br />
                </div>
                )
                // <div>
                //     <button onClick={
                //         () => {
                //             localStorage.setItem("selected_property_id", complaint.property_id);
                //             window.location = "/renting/selected_property"; 
                //         }
                //     }><h2>Property title : {complaint.property_title}</h2></button>
                //     <br />
                //     <button onClick={
                //         () => {
                //             localStorage.setItem("clicked_user_id", complaint.complainant_id);
                //             window.location = "/user_profile";
                //         }
                //     }><h2>Complaint from: {complaint.complainant_name}</h2></button>
                //     <br />
                //     <button onClick={
                //         () => {
                //             localStorage.setItem("clicked_user_id", complaint.complainee_id);
                //             window.location = "/user_profile";
                //         }
                //     }><h2>Complain about: {complaint.complainee_name}</h2></button>
                //     <br />
                //     <h2>Complaint: {complaint.complaint}</h2>
                //     <h2>Date: {complaint.date}</h2>
                //     <br />
                //     <button className="btn btn-primary" onClick={
                //         () => {
                //             const data = {
                //                 complaint_id: complaint.complaint_id,
                //             }
                //             axios.post('http://localhost:5000/users/delete_complaint', data)
                //                 .then(res => {
                //                     console.log(res.data);
                //                     alert("Complaint deleted");
                //                     window.location.reload();
                //                 })
                //         }
                //     }>Delete complaint</button>
                //     <br />
                //     <br />
                // </div>
            ))}
            {getArrayElements()}
            {clearArrayElements()}
        </div>

        )

}   

export default ShowComplaints;