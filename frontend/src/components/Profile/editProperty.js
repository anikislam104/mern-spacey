import React from "react";
import axios from "axios";
import NavbarHomepage from "../navbar_homepage";
import Footer from '../Footer';

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
        <div class="bg-light">
            <NavbarHomepage />
            <br/>
            <h1 class="display-6" style={{textAlign:"center"}}><b>Edit Property</b></h1>
            <br/>
            <div className="container">
                <div className="notification">

                <div class="row align-items-center">
                        <div class="col-lg-3">

                        </div>
                        <div class="col-lg-6">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="form-group">
                            <label><b>Title: </b></label>
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
                            <label><b>Description: </b></label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={property_description}
                                style={{width:"620px",height:"350px"}}
                                onChange={(e) => setProperty_description(e.target.value)}
                            />
                        </div>
                        <br />
                        <br />
                        <div className="form-group">
                            <label><b>Location: </b></label>
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
                            <label><b>Size: </b></label>
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
                            <label><b>Price per day:</b> </label>
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
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            <input type="submit" value="Update Property" className="btn btn-primary" /> 
                        </div>
                    </form>
                    <div class="col-lg-2">

                        </div>
                    </div>
                    </div>

                    <br />
                    <br />

                    <div class="row align-items-center">
          <div class="col-lg-1"></div>
              <div class="col-lg-8">

                    <div>
                        <button className="btn btn-primary" onClick={
                            () => {
                                window.location = "/editRooms";
                            }
                        }>Edit room info</button>
                    </div>
                    </div>
                    <br />
                    <br />
                    <div class="col-lg-3">
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
            </div>
            <br/><br/><br/>
<Footer/>
        </div>
    );

                            

}

export default EditProperty;