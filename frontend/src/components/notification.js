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

    /*const btn = {
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
    }*/

    return (
        <div class="bg-light">
            <NavbarHomepage />
            <br/>
            <div className="container">
                <div className="notification">

            {notification.map((notification) => {
                
                return (

                    <div>
                        <div className="col-md-12" style={{textAlign:"center"}}>
                        <div className="card mb-4 box-shadow">
                            <div className="card-body">
                        <button class="hover" onClick={
                            () => {
                                if(notification.type==="notification"){
                                    window.location.reload();
                                }
                                else if(notification.type==="rental_request"){
                                    window.location.href = "/rent_request_notifications";
                                }
                                else if(notification.type==="booking"){
                                    window.location.href = "/current_bookings";
                                }
                                else if(notification.type==="hosting"){
                                    window.location.href = "/current_hostings";
                                }
                                else if(notification.type==="review"){
                                    window.location.href = "/viewProperties";
                                }
                                else if(notification.type==="extend"){
                                    window.location.href = "/extend_notification";
                                }
                            }
                        }>
                        <button class="btn btn-hover" style={{width:"1200px"}} >{notification.message}</button>
                        </button>
                        </div>
                        </div>
                        </div>
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