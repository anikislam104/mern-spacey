import axios from "axios";
import React, { useEffect } from "react";
import NavbarHomepage from "./navbar_homepage";

const Notification = () => {
    const [notification, setNotification] = React.useState([]);

    useEffect(() => {
        const id=localStorage.getItem("user_id");
        const user={
            user_id:id
        }
        // console.log(localStorage.getItem('user_id'));
        // console.log(id);
        axios.post("http://localhost:5000/users/get_notifications",user)
            .then(res => {
                console.log(res.data);
                setNotification(res.data);
            });
    }, []);

    const btn = {
        //design white button with full width for notification
        width: "100%",
        height: "50px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"
    }
    return (
        <div>
            <NavbarHomepage />
            <h1>Notifications</h1>
            
            <div className="container">
                <div className="notification">

            {notification.map((notification) => {
                
                return (

                    <div>
                        <button style={btn}>
                        <p>{notification.message}</p>
                        </button>
                        <br />
                        <br />
                    </div>
                )
            })}
            </div>
            </div>

        </div>
    );
}

export default Notification;