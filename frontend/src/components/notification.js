import axios from "axios";
import React, { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import NavbarHomepage from "./navbar_homepage";
import Footer from './Footer';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";
var socket;
const Notification = () => {
    const [socketConnected, setSocketConnected] = React.useState(false);
    const {user, selectedChat, setSelectedChat, notification1, setNotification1} = ChatState();
    

    useEffect(() => {
        
        // console.log(user);
        if(user){
            socket = io(ENDPOINT);
            socket.emit("setup", user);
            socket.on("connected", () => setSocketConnected(true));
        }
        // eslint-disable-next-line
      },[user]);

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
                setNotification1(res.data);
            });
    }, []);

    useEffect(() => {
        if(socketConnected){
            socket.on("rental request recieved", (rent_request) => {
            // setNotification([newMessageRecieved, ...notification]);
            // setRentRequest([rent_request, ...rentRequest]);
            const noti={
                message: "You have a new rental request",
                type: "rental_request",
            }
            setNotification1([noti, ...notification1]);
            });
    }
      });

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

            {notification1.map((notification) => {
                
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
                                else if(notification.type==="complaint"){
                                    window.location.href = "/view_complaints";
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
            <br/><br/><br/>
<Footer/>  
        </div>
    );
}

export default Notification;