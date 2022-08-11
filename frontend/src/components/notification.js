import React, { useState,useEffect } from "react";

const Notification = () => {
    const [notification, setNotification] = useState([]);
    const [notification_count, setNotification_count] = useState(0);
    const [notification_count_unread, setNotification_count_unread] = useState(0);
    const [notification_count_read, setNotification_count_read] = useState(0);
    const [user_id, setUser_id] = useState();

    useEffect(() => {
        setUser_id(localStorage.getItem('user_id'));
    }, []);
    return (
        <div>
            <h1>Notification</h1>
        </div>
    );
}

export default Notification;