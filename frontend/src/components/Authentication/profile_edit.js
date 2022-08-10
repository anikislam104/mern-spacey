import { useState } from "react";
// import { useHistory } from "react-router";

const ProfileEdit = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nidNumber, setNidNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [image, setImage] = useState("");


    return (
        <div>
            <h1>Profile Edit</h1>
            <form>
                <div className="form-group">
                    <label>First Name: </label>
                    <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Last Name: </label>
                    <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="text" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Nid Number: </label>
                    <input type="text" className="form-control" value={nidNumber} onChange={(e) => setNidNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Phone Number: </label>
                    <input type="text" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Date Of Birth: </label>
                    <input type="text" className="form-control" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Image: </label>
                    <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Update Profile" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );

                         
        
}

export default ProfileEdit;