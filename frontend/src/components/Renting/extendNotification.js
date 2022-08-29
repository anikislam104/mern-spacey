import React, { useEffect } from "react";
import axios from "axios";
import NavbarHomepage from "../navbar_homepage";
import io from 'socket.io-client';
import { ChatState } from "../../Context/ChatProvider";

const ENDPOINT = "http://localhost:5000";
var socket;

const ExtendNotification = () => {
    const [extendRequest, setExtendRequest] = React.useState([]);
    const [socketConnected, setSocketConnected] = React.useState(false);
    const {user, selectedChat, setSelectedChat, notification1, setNotification1} = ChatState();

    useEffect(() => {
        const id=localStorage.getItem("user_id");
        const user={
            user_id:id
        }
        // console.log(localStorage.getItem('user_id'));
        // console.log(id);
        axios.post("http://localhost:5000/renting/get_extend_booking_requests",user)
            .then(res => {
                console.log(res.data);
                setExtendRequest(res.data);
            });
    }, []);

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
        if(socketConnected){
            socket.on("extend request recieved", (rent_request) => {
            // setNotification([newMessageRecieved, ...notification]);
            //setExtendRequest([rent_request, ...rentRequest]);
            console.log(rent_request);
            alert("You have a new extend booking request");
            // const noti={
            //     message: "You have a new rental request",
            //     type: "rental_request",
            // }
            // setNotification1([noti, ...notification1]);
            });
    }
      });


    //css styling for request info

    //css styling for buttons small and beauitful
    const styleForButtons = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "10%",
        height: "30%",
        borderBottom: "1px solid black",
        paddingBottom: "10px",
        marginBottom: "10px",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",

        border: "1px solid #ddd",
        borderRadius: "4px",
        justifyContent: "center"
    };

    //handle accept button
    const handleAccept = (rid) => {
        console.log(rid);
        const id={
            request_id:rid
        }
        axios.post("http://localhost:5000/renting/accept_extend_booking_request",id)
        .then(res => {
            console.log(res.data);
            window.location.reload();
        })
        
    }

    //handle decline button
    const handleDecline = (rid) => {
        console.log(rid);
        const id={
            request_id:rid
        }
        axios.post("http://localhost:5000/renting/decline_extend_booking_request",id)
        .then(res => {
            console.log(res.data);
            window.location.reload();
        })
        
    }

    const fontStyle={
        //font color blue and bold
        color: "black",
        fontWeight: "normal",
        fontSize:"18px",
    }

    const box={
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        padding: "20px",
        marginBottom: "20px",
        //align in center
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

    }

    return (
        <div class="bg-light">
        <NavbarHomepage />
        <br/>
        {/* <h1 class="display-6" style={{textAlign:"center"}}><b>Extend Bookings Requests</b></h1> */}
        <br/>
                <div className="container">
                    <div className="extendRequest">
                        {extendRequest.map((extendRequest) => {
                           
                            let db = new Date(extendRequest[3]);
                const year=db.getFullYear();
                const day=db.getDate();
                const name = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                const month=name[db.getMonth()];
                db=new Date(extendRequest[4]);
                const year2=db.getFullYear();
                const day2=db.getDate();
                const month2=name[db.getMonth()];
                db=new Date(extendRequest[5]);
                const year3=db.getFullYear();
                const day3=db.getDate();
                const month3=name[db.getMonth()];
                            return (
                                <div style={box}>
                                    <h2 style={fontStyle}><b>Property title: </b>{extendRequest[2]}</h2>
                                    <h2 style={fontStyle}><b>Renter: </b>{extendRequest[1]}</h2>
                                    <h2 style={fontStyle}><b>&nbsp;Start date: </b>{month} {day},{year}</h2>
                                <h2 style={fontStyle}><b>&nbsp;End date: </b>{month2} {day2},{year2}</h2>
                                    <h2 style={fontStyle}><b>Requested end date: </b>{month3} {day3},{year3}</h2>
                                    <br />

                                    

                                    
                                    <button className="btn btn-primary" style={styleForButtons} onClick={
                                        () => {
                                            handleAccept(extendRequest[0]);
                                        }
                                    }>Accept</button>
                                    <br />
                                    <button className="btn btn-primary" style={styleForButtons} onClick={
                                        () => {
                                            handleDecline(extendRequest[0]);
                                        }
                                    }>Decline</button>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>

              </div>    
    )
    
}

export default ExtendNotification;