import axios from "axios";
import React, { useEffect } from "react";
import NavbarHomepage from "../navbar_homepage";
import Footer from '../Footer';

const CurrentHostings = () => {
    const [hostings, setHostings] = React.useState([]);
    const [total, setTotal] = React.useState();
    const [complaint, setComplaint] = React.useState();
    
    useEffect(() => {
        axios.post('http://localhost:5000/renting/get_current_hostings',{user_id: localStorage.getItem("user_id")})
            .then(res => {
                setHostings(res.data);
                setTotal(res.data.length);
            })
    }, []);

    const inputArray = new Array(total);
    for (let i = 0; i < total; i++) {
        inputArray[i] = i;
    }
    const btn_array = new Array(total);
    for (let i = 0; i < total; i++) {
        btn_array[i] = i+total;
    }

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

    const fontStyle={
        //font color blue and bold
        color: "black",
        fontWeight: "normal",
        fontSize:"18px",
    }

    return (
        <div class="bg-light">
            <NavbarHomepage />
            <br/>
            <h1 class="display-6" style={{textAlign:"center"}}><b>Current Hostings</b></h1>
            <br/>
            
            {hostings.map((hosting,idx) => {

            var image=hosting[7];
            let db = new Date(hosting[3]);
            const year=db.getFullYear();
            const day=db.getDate();
            const name = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const month=name[db.getMonth()];
            db=new Date(hosting[4]);
            const year2=db.getFullYear();
            const day2=db.getDate();
            const month2=name[db.getMonth()];

            return(

                <div style={box}>
                    <button onClick={
                                    () => {
                                        localStorage.setItem("selected_property_id", hosting[6]);
                                        //console.log(localStorage.getItem("selected_property_id"));
                                        window.location.href = "/renting/selected_property";
                                    }
                                }><h2 style={fontStyle}><b>&nbsp;Property: </b>{hosting[2]}</h2></button>
                    <h2 style={fontStyle}><button onClick={
                        () => {
                            const data = {
                                booking_id: hosting[0],
                            }
                            axios.post('http://localhost:5000/renting/get_renter_host_id', data)
                                .then(res => {
                                    const renter_id = res.data.renter_id;
                                    console.log(renter_id);
                                    localStorage.setItem("clicked_user_id", renter_id);
                                    window.location = "/user_profile";
                                })
                        }
                    }><b>Renter: </b>{hosting[1]}</button></h2>
                    <h2 style={fontStyle}><b>&nbsp;Start date: </b>{month} {day},{year}</h2>
                    <h2 style={fontStyle}><b>&nbsp;End date: </b>{month2} {day2},{year2}</h2>
                    <h2 style={fontStyle}><b>&nbsp;Price: </b>{hosting[5]}</h2>
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

                                <div class="row align-items-center">

                  
                                    <div class="col-lg-1">
                                        </div>

                                        <div class="col-lg-6">
                                <textarea type="text" id={inputArray[idx]} style={{width:"500px",height:"200px",backgroundColor:"#e0ffff",display:"none"}} placeholder="Enter complain" onChange={
                                    (e) => {
                                        setComplaint(e.target.value);
                                    }
                                } />
                                <br />
                                <div class="col-lg-2">
                                        </div>
                             

                                <button className="btn btn-primary" id={btn_array[idx]} style={{float:"right",display:"none"}} onClick={
                                    () => {
                                        console.log(complaint);
                                        const complain={
                                            booking_id:hosting[0],
                                            complaint:complaint
                                        }

                                        axios.post("http://localhost:5000/renting/set_host_complaint",complain)
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
            )}
            )}
<br/><br/><br/>
<Footer/>  
        </div>
        )
}

export default CurrentHostings;