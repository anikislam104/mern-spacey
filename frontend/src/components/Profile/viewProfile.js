import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import NavbarHomepage from "../navbar_homepage";

const ViewProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nidNumber, setNidNumber] = useState("");

    
    useEffect(() => {  
        const user ={
            user_id: localStorage.getItem('user_id'),
        }
        axios.post("http://localhost:5000/users/getUserDetails",user )
        .then(res => {
        console.log(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setDateOfBirth(res.data.dateOfBirth);
        setEmail(res.data.email);
        setPhone(res.data.phoneNumber);
        setNidNumber(res.data.nidNumber);
    }); 
    }, [])

    const handleEdit = (e) => {
        e.preventDefault();
        window.location = "/editProfile";
    }

    const showProperties = (e) => {
        e.preventDefault();
        window.location = "/viewProperties";
    }

    
    return (
        <div>
            {/* //show user profile */}
            <NavbarHomepage />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Name: {firstName} {lastName}</h1>
                        <h3> Date of Birth: {dateOfBirth}</h3>
                        <h3>Email: {email}</h3>
                        <h3>Phone: {phone}</h3>
                        <h3>Nid Number: {nidNumber}</h3>
                    </div>
                </div>
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleEdit}>Edit Profile</button>
                <br />
                <br />
                <button className="btn btn-primary" onClick={showProperties}>Show my properties</button>
            </div>
        </div>
    );
}

export default ViewProfile;