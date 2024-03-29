import React from "react";
import { useEffect } from "react";
import axios from "axios";
import NavbarHomepage from "../navbar_homepage";
import Footer from '../Footer';

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
    const fontStyle={
        //font color blue and bold
        color: "black",
        fontWeight: "normal",
        fontSize:"18px",
    }
    const style = {
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "12px",
        marginBottom: "10px",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    };

    /*const inputStyle={
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
    }*/

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

    
    return(
        <div class="bg-light">
            <NavbarHomepage />
            <br/>
            <h1 class="display-6" style={{textAlign:"center"}}><b>Current Bookings</b></h1>
            <br/>
        
                <div>
                    {bookings.map((booking,idx) => {
                        var image=booking[7];
                        let db = new Date(booking[3]);
            const year=db.getFullYear();
            const day=db.getDate();
            const name = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const month=name[db.getMonth()];
            db=new Date(booking[4]);
            const year2=db.getFullYear();
            const day2=db.getDate();
            const month2=name[db.getMonth()];

                        return (
                            <div style={style}>
                                <br/>
                            <div class="row align-items-center ">

                            <div class="col-lg-1"></div>
                            <div class="col-lg-3">
                                <button onClick={
                                    () => {
                                        localStorage.setItem("selected_property_id", booking[6]);
                                        //console.log(localStorage.getItem("selected_property_id"));
                                        window.location.href = "/renting/selected_property";
                                    }
                                }><h2 style={fontStyle}><b>&nbsp;Property: </b>{booking[2]}</h2></button>
                                <h2 style={fontStyle}><button onClick={
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
                                }><b>&nbsp;Host: </b>{booking[1]}</button></h2>
                                <h2 style={fontStyle}><b>&nbsp;Start date: </b>{month} {day},{year}</h2>
                                <h2 style={fontStyle}><b>&nbsp;End date: </b>{month2} {day2},{year2}</h2>
                                <h2 style={fontStyle}><b>&nbsp;Price: </b>{booking[5]}</h2>
                                <br />
                                </div>

                                <div class="col-lg-3">
                                    </div>

                                    <div class="col-lg-5">
                                <img src={process.env.PUBLIC_URL+"/images/"+image} alt="..." 
                style={{  width: "350px" , height: "230px ", display: "flex" }} />

                                </div>
                                </div>

                                <br/>
                                <br/>
                                
                                <div class="row align-items-center ">
                                <div class="col-lg-1"></div>
                  
                                    <div class="col-lg-3">
                                
                                <button className="btn btn-primary" onClick={
                                    () => {
                                        localStorage.setItem('change_duration_property_id',booking[6] );
                                        localStorage.setItem("change_booking_id", booking[0]);
                                        window.location.href = "/change_duration";
                                    }
                                }>Extend Duration</button>
                                </div>
                                <br />
                                <br />
                                <div class="col-lg-3">
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
                                </div>
                                <br />
                                <br />
                                <div class="col-lg-2">
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
                                                alert("Booking period has not ended yet");
                                                // localStorage.setItem('payment_booking_id',booking[0]);
                                                // window.location.href = "payment/payment_home";
                                            }
                                        })
                                        
                                    }
                                }>Payment</button>
                                </div>
                                <br />
                                <br />
                                <div class="col-lg-2" style={{textAlign:"center"}}>
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
                                </div>
                                </div>

                                <br />
                                <br/>

                                
                                <div class="row align-items-center">

                  
                                    <div class="col-lg-3">
                                        </div>

                                        <div class="col-lg-6">
                                <textarea type="text" id={inputArray[idx]} style={{width:"500px",height:"200px",backgroundColor:"#e0ffff",display:"none"}}  placeholder="Enter complain" onChange={
                                    (e) => {
                                        setComplaint(e.target.value);
                                    }
                                } />
                                <br />
                                <br />
                                <div class="col-lg-3">
                                        </div>
                                </div>
                                </div>

                                <div class="row align-items-center">

                  
<div class="col-lg-5">
    </div>

    <div class="col-lg-6">
                                <button className="btn btn-primary"  id={btn_array[idx]} style={{display:"none"}} onClick={
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

                                    <div class="col-lg-3">
                                        </div>
                                </div>
                                
                            </div>
                        )
                    }
                    )}
                </div>
                <br/><br/><br/>
<Footer/>
        </div>
    )
}

export default CurrentBookings;