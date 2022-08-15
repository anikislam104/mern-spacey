import axios from "axios";
import React, { useEffect } from "react";

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
    return (
        <div>
            <h1>Notifications</h1>
            <div className="container">
                <div className="notification">

            {notification.map((notification) => {
                
                return (

                    <div>

                        <p>{notification.message}</p>
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