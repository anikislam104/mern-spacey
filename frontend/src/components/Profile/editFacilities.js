import React, { useEffect } from "react";
import NavbarHomepage from "../navbar_homepage";
import Footer from '../Footer';
import axios from "axios";

const EditFacilities = () => {
    const [facility_name, setFacility_name] = React.useState("");

    const [currentFacility, setCurrentFacility] = React.useState([]);

    useEffect(() => {
        const property_id = {
            property_id: localStorage.getItem("edit_property_id"),
        }

        axios.post("http://localhost:5000/renting/get_facilities", property_id)
        .then((res) => {
            console.log(res.data);
            setCurrentFacility(res.data);
        }).catch((err) => {
            console.log(err);
        }
        );
    }, []);

    const myStyle = {
        inputSection2: {
          width: "50px",
          height: "40px",
        },
        buttonSection3: {
          backgroundColor: "#b9f2ff",
          padding: "5px 15px",
          fontSize: "25px",
          color: "black",
        },
      }

    return(
        <div>
            <NavbarHomepage />
            <div className="container">
                <div className="notification">
                    <br/>
                <h1 class="display-6" style={{textAlign:"center"}}><b>Current Facilities</b></h1>
                    <div className="menu">

                    <div class="row align-items-center">
                    <div class="col-lg-1"></div>
          <div class="col-lg-4">
                        {currentFacility.map((facility) => {
                            return (
                                <div className="card mb-4 box-shadow" style={{width:"250px", height:"200px",backgroundColor:"#e0ffff",textAlign:"center"}}>
                                    <br/><br/>
                                    <h2><b>{facility.facilityType}</b></h2>
                                    <br />
                
                                     <div style={{textAlign:"center"}}><button className="btn btn-primary" onClick={
                                        () => {
                                            const facility_id = {
                                                facility_id: facility._id,
                                            }
                                            axios.post("http://localhost:5000/property/delete_facility", facility_id)
                                                .then((res) => {
                                                    console.log(res.data);
                                                    window.location.reload();
                                                })
                                        }
                                    }>Remove</button></div>
                                    <br />
                                    <br />
                                </div>
                            )
                        }
                        )}
                        </div>
                    
                    <br />
                    <br />
                    <div class="col-lg-2"></div>
                    
                    <div class="col-lg-5">
                    <h1><b>Add New Facility</b></h1>
                    <br />
                    <br />
                    <div>
                        <input type="text" placeholder="Facility " style={{backgroundColor:"#e0ffff"}} onChange={(e) => setFacility_name(e.target.value)} />
                        <br />
                        <br />
                        <button className="btn btn-primary" onClick={
                            () => {
                                const prop={
                                    property_id: localStorage.getItem("edit_property_id"),
                                    facility_type: facility_name,
                                }
                                axios.post("http://localhost:5000/property/add_facility", prop)
                                    .then((res) => {
                                        console.log(res.data);
                                        window.location.reload();
                                    })
                            }
                        }>Add</button>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
                <br />
                <br />

            </div>
            <br/><br/><br/>
<br/><br/><br/>
<br/><br/><br/>
<Footer/>  
        </div>
    )
}

export default EditFacilities;