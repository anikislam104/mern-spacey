import axios from "axios";
import React, { useState,useEffect } from "react";

const Notification = () => {
    const [notification, setNotification] = useState([]);
    const [user_id, setUser_id] = useState();

    useEffect(() => {
        setUser_id(localStorage.getItem('user_id'));

        axios.post("http://localhost:5000/users/get_notifications",{user_id:user_id})
            .then(res => {
                console.log(res.data);
                setNotification(res.data);
            });
    }, []);
    return (
        <div>
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
    );
}

export default Notification;