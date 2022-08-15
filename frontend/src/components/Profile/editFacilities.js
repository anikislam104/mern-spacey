import React, { useEffect } from "react";
import NavbarHomepage from "../navbar_homepage";
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

    return(
        <div>
            <NavbarHomepage />
            <div className="container">
                <div className="notification">
                    <h1>Current Facilities</h1>
                    <div className="menu">
                        {currentFacility.map((facility) => {
                            return (
                                <div className="menu">
                                    <h2>{facility.facilityType}</h2>
                                    <br />
                
                                    <button className="btn btn-primary" onClick={
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
                                    }>Remove</button>
                                    <br />
                                    <br />
                                </div>
                            )
                        }
                        )}
                    </div>
                    <br />
                    <br />
                    <h1>Add New Facility</h1>
                    <br />
                    <br />
                    <div>
                        <input type="text" placeholder="Facility " onChange={(e) => setFacility_name(e.target.value)} />
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
                <br />
                <br />

            </div>
        </div>
    )
}

export default EditFacilities;