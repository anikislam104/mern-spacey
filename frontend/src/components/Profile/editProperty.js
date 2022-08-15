import React from "react";
import axios from "axios";
import NavbarHomepage from "../navbar_homepage";

const EditProperty = () => {
    const [property_title, setProperty_title] = React.useState("");
    const [property_description, setProperty_description] = React.useState("");
    const [property_location, setProperty_location] = React.useState("");
    const [property_size, setProperty_size] = React.useState("");
    const [property_price, setProperty_price] = React.useState("");

    

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(property_title, property_description, property_location, property_size, property_price);
        const property = {
            property_id: localStorage.getItem("edit_property_id"),
            property_title: property_title,
            property_description: property_description,
            property_location: property_location,
            property_size: property_size,
            property_price: property_price,
        };
        axios.post("http://localhost:5000/property/edit_property", property).then((res) => {
            console.log(res.data);
            window.location = "/viewProperties";
        })
    }

    return (
        <div>
            <NavbarHomepage />
            <h1>Edit Property</h1>
            <div className="container">
                <div className="notification">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="form-group">
                            <label>Title: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={property_title}
                                onChange={(e) => setProperty_title(e.target.value)}
                            />
                        </div>
                        <br />
                        <br />
                        <div className="form-group">
                            <label>Description: </label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={property_description}
                                onChange={(e) => setProperty_description(e.target.value)}
                            />
                        </div>
                        <br />
                        <br />
                        <div className="form-group">
                            <label>Location: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={property_location}
                                onChange={(e) => setProperty_location(e.target.value)}
                            />
                        </div>
                        <br />
                        <br />
                        <div className="form-group">
                            <label>Size: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={property_size}
                                onChange={(e) => setProperty_size(e.target.value)}
                            />
                        </div>
                        <br />
                        <br />
                        <div className="form-group">
                            <label>Price per day: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={property_price}
                                onChange={(e) => setProperty_price(e.target.value)}
                            />
                        </div>
                        <br />
                        <br />
                        <div className="form-group">
                            <input type="submit" value="Update Property" className="btn btn-primary" /> 
                        </div>
                    </form>
                    <br />
                    <br />
                    <div>
                        <button className="btn btn-primary" onClick={
                            () => {
                                window.location = "/editRooms";
                            }
                        }>Edit room info</button>
                    </div>
                    <br />
                    <br />
                    <div>
                        <button className="btn btn-primary" onClick={
                            () => {
                                window.location = "/editFacilities";
                            }
                        }>Edit facilities</button>
                    </div>
                </div>
            </div>
        </div>
    );

                            

}

export default EditProperty;