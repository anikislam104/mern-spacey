import React from "react";
import axios from "axios";
import { useEffect } from "react";
import NavbarHomepage from "../navbar_homepage";

const PastHostings = () => {
    const [hostings, setHostings] = React.useState([]);
    
    useEffect(() => {
        axios.post('http://localhost:5000/renting/get_past_hostings',{user_id: localStorage.getItem("user_id")})
            .then(res => {
                setHostings(res.data);
            })
    }, []);

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
            <h1 class="display-6" style={{textAlign:"center"}}><b>Past Hostings</b></h1>
            <br/>
            
            {hostings.map((hosting) => (
                <div style={box}>
                    <h2><b>Property title:</b>&nbsp;{hosting[2]}</h2>
                    <h2><button onClick={
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
                    }><b>Renter:</b>&nbsp;{hosting[1]}</button></h2>
                    <h2><b>Start date:</b>&nbsp;{hosting[3]}</h2>
                    <h2><b>End date:</b>&nbsp;{hosting[4]}</h2>
                    <h2><b>Price:</b>&nbsp;{hosting[5]}</h2>
                    <br/>
                </div>
                
            ))}

        </div>
        )
}

export default PastHostings;