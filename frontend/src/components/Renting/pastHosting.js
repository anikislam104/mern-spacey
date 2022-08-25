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
        <div>
            <NavbarHomepage />
            <h1>Past Hostings</h1>
            
            {hostings.map((hosting) => (
                <div style={box}>
                    <h2>Property title:{hosting[2]}</h2>
                    <h2>Renter name:{hosting[1]}</h2>
                    <h2>Start date:{hosting[3]}</h2>
                    <h2>End date:{hosting[4]}</h2>
                    <h2>Price:{hosting[5]}</h2>
                </div>
            ))}

        </div>
        )
}

export default PastHostings;