import axios from "axios";
import React from "react";
import NavbarHomepage from "../navbar_homepage";
import { useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [complaints, setComplaints] = React.useState([]);
  const { setHostId } = ChatState();
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = {
      user_id: localStorage.getItem("clicked_user_id"),
    };
    setHostId(user_id.user_id);
    axios
      .post("http://localhost:5000/users/clicked_profile", user_id)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phoneNumber);
        setComplaints(res.data.complaints);
      });
  }, []);

  //style h2 tag
  const style = {
    fontSize: "20px",
    color: "#0E2A53",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "10px",
  };

  //style h1 tag
  const style1 = {
    fontSize: "30px",
    color: "#0E2A53",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "10px",
  };

  return (
    <div>
      <NavbarHomepage />
      <div className="container">
        <div className="notification">
          <h1 style={style1}>User Profile</h1>
          <div className="menu">
            <h2 style={style}>Name: {name}</h2>
            <br />
            <h2 style={style}>Email: {email}</h2>
            <br />
            <h2 style={style}>Phone: {phone}</h2>
            <br />
            <h2 style={style}>Complaints:</h2>
            <br />
            {complaints.map((complaint) => {
              return (
                <div className="menu">
                  <h2 style={style}>{complaint.complaint}</h2>
                  <br />
                  <br />
                </div>
              );
            })}
            <br />
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/chat");
              }}
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
