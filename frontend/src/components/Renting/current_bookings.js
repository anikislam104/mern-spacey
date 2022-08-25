import React from "react";
import { useEffect } from "react";
import axios from "axios";
import NavbarHomepage from "../navbar_homepage";


const CurrentBookings = () => {
    const [bookings, setBookings] = React.useState([]);
    const [total, setTotal] = React.useState();
    const [complaint, setComplaint] = React.useState();


    useEffect(() => {
        const id=localStorage.getItem("user_id");
        const user={
            user_id:id
        }
        // console.log(localStorage.getItem('user_id'));
        // console.log(id);
        axios.post("http://localhost:5000/renting/get_current_bookings",user)
            .then(res => {
                console.log(res.data);
                setBookings(res.data);
                setTotal(res.data.length);
                console.log(res.data.length);
            });
    }, []);

    const inputArray = new Array(total);
    for (let i = 0; i < total; i++) {
        inputArray[i] = i;
    }
    const btn_array = new Array(total);
    for (let i = 0; i < total; i++) {
        btn_array[i] = i+total;
    }
    console.log(inputArray);
    const style = {
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "10px",
        marginBottom: "10px",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"
    };

    const inputStyle={
        display: "none",
        //design input box
        width: "50%",
        height: "50px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
    }


    return(
        <div>
            <NavbarHomepage />
            <h1>Current Bookings</h1>
            <div className="container">
                <div className="bookings">
                    {bookings.map((booking,idx) => {
                        return (
                            <div style={style}>
                                <h2>Property title: {booking[2]}</h2>
                                <p><button onClick={
                                    () => {
                                        const data={
                                            booking_id:booking[0],
                                        }
                                        axios.post('http://localhost:5000/renting/get_renter_host_id', data)
                                            .then(res => {
                                                const host_id=res.data.host_id;
                                                // console.log(renter_id);
                                                localStorage.setItem("clicked_user_id", host_id);
                                                window.location = "/user_profile";
                                })
                                    }
                                }>Host name: {booking[1]}</button></p>
                                <p>Start date: {booking[3]}</p>
                                <p>End date: {booking[4]}</p>
                                <p>Price: {booking[5]}</p>
                                <br />
                                
                                <button className="btn btn-primary" onClick={
                                    () => {
                                        localStorage.setItem('change_duration_property_id',booking[6] );
                                        localStorage.setItem("change_booking_id", booking[0]);
                                        window.location.href = "/change_duration";
                                    }
                                }>Extend Duration</button>
                                <br />
                                <br />
                                <button className="btn btn-primary" onClick={
                                    () => {
                                        const id={
                                            booking_id:booking[0]
                                        }
                                        axios.post("http://localhost:5000/renting/cancel_booking",id)
                                        .then(res => {
                                            console.log(res.data);
                                            if(res.data === "pre"){
                                                window.location="/current_bookings";
                                                alert("Booking cancelled");
                                            }
                                            else if(res.data === "curr"){
                                                alert("Booking cannot be cancelled");
                                            }

                                        })
                                    }
                                }>Cancel Booking</button>
                                <br />
                                <br />
                                <button className="btn btn-primary" onClick={
                                    () => {
                                        axios.post("http://localhost:5000/renting/get_time",{booking_id:booking[0]})
                                        .then(res => {
                                            if(res.data === "ok"){
                                                localStorage.setItem('payment_booking_id',booking[0]);
                                                window.location.href = "payment/payment_home";
                                            }
                                            else{
                                                // will have to uncomment this
                                                // alert("Booking period has not ended yet");
                                                localStorage.setItem('payment_booking_id',booking[0]);
                                                window.location.href = "payment/payment_home";
                                            }
                                        })
                                        
                                    }
                                }>Payment</button>
                                <br />
                                <br />
                                <button className="btn btn-primary" onClick={
                                    () => {
                                        //show input box if hidden and vice versa
                                        if(document.getElementById(inputArray[idx]).style.display === "none"){
                                            document.getElementById(inputArray[idx]).style.display = "block";
                                        }
                                        else{
                                            document.getElementById(inputArray[idx]).style.display = "none";
                                        }

                                        //show submit button if hidden and vice versa
                                        if(document.getElementById(btn_array[idx]).style.display === "none"){
                                            document.getElementById(btn_array[idx]).style.display = "block";
                                        }
                                        else{
                                            document.getElementById(btn_array[idx]).style.display = "none";
                                        }
                                    }
                                }>Complain</button>
                                <br />
                                <input type="text" id={inputArray[idx]} style={inputStyle} placeholder="Enter complain" onChange={
                                    (e) => {
                                        setComplaint(e.target.value);
                                    }
                                } />
                                <br />
                                <button className="btn btn-primary" id={btn_array[idx]} style={{display:"none"}} onClick={
                                    () => {
                                        console.log(complaint);
                                        const complain={
                                            booking_id:booking[0],
                                            complaint:complaint
                                        }

                                        axios.post("http://localhost:5000/renting/set_renter_complaint",complain)
                                        .then(res => {
                                            console.log(res.data);
                                            if(res.data === "ok"){
                                                alert("Complaint submitted");
                                            }
                                            else{
                                                alert("Something went wrong");
                                            }
                                        })
                                    }
                                } >Send</button>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default CurrentBookings;