import axios from "axios";
import React from "react";
import { useRef,useState } from "react";
import NavbarHomepage from "../navbar_homepage";
import Footer from '../Footer';

const EditProfile = () => {
    //button handler
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    

    const inputFirstName = useRef();
    const inputLastName = useRef();
    const inputDateOfBirth = useRef();

    const handlePersonal = (e) => {
        e.preventDefault();
        console.log("personal");
        if(inputFirstName.current.style.display === "none"){
            inputFirstName.current.style.display = "block";
            inputFirstName.current.style.width = "80%";
            inputLastName.current.style.display = "block";
            inputLastName.current.style.width = "80%";
            inputDateOfBirth.current.style.display = "block";
            inputDateOfBirth.current.style.width = "80%";
        }
        else{
            inputFirstName.current.style.display = "none";
            inputLastName.current.style.display = "none";
            inputDateOfBirth.current.style.display = "none";
        }

    }

    
    const inputEmail = useRef();
    const inputPhone = useRef();

    const handleContact = (e) => {
        e.preventDefault();
        if(inputEmail.current.style.display === "block"){
            inputEmail.current.style.display = "none";
        }
        else{
            inputEmail.current.style.display = "block";
            inputEmail.current.style.width = "80%";
        }
        if(inputPhone.current.style.display === "block"){
            inputPhone.current.style.display = "none";
        }
        else{
            inputPhone.current.style.display = "block";
            inputPhone.current.style.width = "80%";
        }
    }

    const inputPassword = useRef();

    const handlePassword = (e) => {
        e.preventDefault();
        if(inputPassword.current.style.display === "block"){
            inputPassword.current.style.display = "none";
        }
        else{
            inputPassword.current.style.display = "block";
            inputPassword.current.style.width = "80%";
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            user_id: localStorage.getItem("user_id"),
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            email: email,
            phoneNumber: phone,
            password: password
        }
        console.log(user);
        axios.post('http://localhost:5000/users/editprofile', user)
            .then(res => {
                window.location = '/viewprofile';
            });

    }
    
    return (
        <div class="bg-light">
            <NavbarHomepage />
            <br/>
            <h1 class="display-6" style={{textAlign:"center"}}><b>Edit Your Profile</b></h1>
            
            <br />
            
            <div class="row align-items-center">
          <div class="col-lg-3"></div>
          <div class="col-lg-5">
            <br/>

          <input
                style={{display: 'none',width:"500px",height:"30px",backgroundColor:"white"}}
                ref={inputFirstName}
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <input
                style={{display: 'none',width:"500px",height:"30px"}}
                ref={inputLastName}
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <input type="date" 
                style={{display: 'none',width:"500px",height:"30px"}}
                ref={inputDateOfBirth}
                placeholder="Enter your date of birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <br />
            </div>

            <div class="col-lg-2">    
            <button className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={handlePersonal}>Edit personal details</button>    
            <br />
            </div>

            <div class="col-lg-2"></div>
            </div>
            
            <br />

            <div class="row align-items-center">
          <div class="col-lg-3"></div>
          <div class="col-lg-5">
            <br/>
            
            <input type="text"
                style={{display: 'none',width:"500px",height:"30px"}}
                ref={inputPhone}
                value={phone}
                placeholder="Enter your phone"
                onChange={(e) => setPhone(e.target.value)} />
            <br />
            
            <input type="email"
             style={{display: 'none',width:"500px",height:"30px"}}
                ref={inputEmail}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <br />
            
            <br />
          </div>

              <div class="col-lg-2">

              <button className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={handleContact}>Edit contact details</button>
            <br />
            
            </div>
            <div class="col-lg-2"></div>
            </div>  
            <br />
            <br />



            <div class="row align-items-center">
          <div class="col-lg-3"></div>
          <div class="col-lg-5">
          <br />
         
         <input type="password"
             style={{display: 'none',width:"500px",height:"30px"}}
             ref={inputPassword}
             placeholder="Enter your password"
             value={password}
             onChange={(e) => setPassword(e.target.value)} />
         <br />
         </div>

            <br />
            <div class="col-lg-2">
            &emsp;<button className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={handlePassword}>Edit password</button>
            </div>
            <div class="col-lg-2"></div>
            </div>
            
            <br/>
            <br/>
            <br/>
            <br/>

            <div class="row align-items-center">
            <div class="col-lg-5"></div>
            <div class="col-lg-2">
            &emsp;&emsp;<button className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={handleSubmit}>Save</button>
            </div>
            <div class="col-lg-5"></div>
            </div>
           
            <br/><br/><br/>
<Footer/>  
        </div>

        )    
 
}
export default EditProfile;