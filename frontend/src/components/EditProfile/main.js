import React from "react";
import { useRef,useState } from "react";

const EditProfile = () => {
    //button handler
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    // const [password, setPassword] = useState("");
    

    const inputFirstName = useRef();
    const inputLastName = useRef();
    const inputDateOfBirth = useRef();

    const handlePersonal = (e) => {
        e.preventDefault();
        console.log("personal");
        inputFirstName.current.style.display = "block";
        inputFirstName.current.style.width = "80%";
        inputLastName.current.style.display = "block";
        inputLastName.current.style.width = "80%";
        inputDateOfBirth.current.style.display = "block";
        inputDateOfBirth.current.style.width = "80%";

    }

    
    const inputEmail = useRef();
    const inputPhone = useRef();
    const handleContact = (e) => {
        e.preventDefault();
        inputEmail.current.style.display = "block";
        inputEmail.current.style.width = "80%";
        inputPhone.current.style.display = "block";
        inputPhone.current.style.width = "80%";
    }


    return (
        <div>
            <h1>Edit Profile</h1>
            
            <br />
            <button className="btn btn-primary" onClick={handlePersonal}>Edit personal details</button>    
            <input
                style={{display: 'none'}}
                ref={inputFirstName}
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <input
                style={{display: 'none'}}
                ref={inputLastName}
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <input type="date" 
                style={{display: 'none'}}
                ref={inputDateOfBirth}
                placeholder="Enter your date of birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <br />
            <br />
            <button className="btn btn-primary" onClick={handleContact}>Edit contact details</button>
            <input type="email"
             style={{display: 'none'}}
                ref={inputEmail}
                placeholder="Enter your email" />
            <br />
            <br />
            <button className="btn btn-primary">Edit password</button>
        </div>
        )    
 
}
export default EditProfile;