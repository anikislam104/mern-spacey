import React from "react";
import axios from "axios";
import { useEffect } from "react";
import NavbarHomepage from "../navbar_homepage";
import Footer from '../Footer';

const PastHostings = () => {
    const [hostings, setHostings] = React.useState([]);
    
    useEffect(() => {
        axios.post('http://localhost:5000/renting/get_past_hostings',{user_id: localStorage.getItem("user_id")})
            .then(res => {
                setHostings(res.data);
            })
    }, []);

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

    return (
        <div class="bg-light">
            <NavbarHomepage />
            <br/>
            <h1 class="display-6" style={{textAlign:"center"}}><b>Past Hostings</b></h1>
            <br/>
            
            {hostings.map((hosting) => {
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
                <div style={style}>
                    <div class="row align-items-center ">

<div class="col-lg-1"></div>
<div class="col-lg-4">
                    <button onClick={
                                    () => {
                                        localStorage.setItem("selected_property_id", hosting[6]);
                                        //console.log(localStorage.getItem("selected_property_id"));
                                        window.location.href = "/renting/selected_property";
                                    }
                                }><h2 style={fontStyle}><b>&nbsp;Property: </b>{hosting[2]}</h2></button>
                    <h2 style={fontStyle} ><button onClick={
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
                    }><b>&nbsp;Renter: </b>{hosting[1]}</button></h2>
                    <h2 style={fontStyle}><b>&nbsp;Start date: </b>{month} {day},{year}</h2>
                    <h2 style={fontStyle}><b>&nbsp;End date: </b>{month2} {day2},{year2}</h2>
                    <h2 style={fontStyle}><b>&nbsp;Price: </b>{hosting[5]}</h2>
                    <br/>
                </div>
                <div class="col-lg-3">
    </div>

    <div class="col-lg-4">
<img src={process.env.PUBLIC_URL+"/images/"+image} alt="..." 
style={{  width: "350px" , height: "210px ", display: "flex" }} />

</div>
</div>
</div>
                
            )
                }
                )}
<br/><br/><br/>
<Footer/>  
        </div>
        )
}

export default PastHostings;