import React from "react";
import { useEffect } from "react";
import axios from "axios";
import NavbarHomepage from "../navbar_homepage";

const ViewProperties = () => {
    const [myProperties, setMyProperties] = React.useState([]);

    useEffect(() => {
        const id=localStorage.getItem("user_id");
        const user={
            user_id:id
        }
        axios.post("http://localhost:5000/users/get_my_properties",user)
            .then(res => {
                console.log(res.data);
                setMyProperties(res.data);
            });
    }, []);
    return (
        <div class="bg-light">
            <NavbarHomepage />
            <br/>
            <h1 class="display-6" style={{textAlign:"center"}}><b>My Properties</b></h1>
            <div className="container">
                <div className="notification">
                    {myProperties.map((myProperty) => {
                        return (
                            <div>
                                <h1>{myProperty.title}</h1>
                                <br />
                                <h2>{myProperty.description}</h2>
                                <br />
                                <button className="btn btn-primary" onClick={
                                    () => {
                                        localStorage.setItem("edit_property_id", myProperty._id);
                                        window.location.href = "/editProperty/";
                                    }
                                }>Edit property details</button>
                                <br />
                                <br />
                                <button className="btn btn-primary" onClick={
                                    () => {
                                        if(window.confirm("Do you want to delete this property?")){
                                            const id={
                                                property_id:myProperty._id
                                            }
                                            axios.post("http://localhost:5000/property/delete_property",id)
                                                .then(res => {
                                                    console.log(res.data);
                                                    window.location="/viewProperties";
                                                })
                                        }
                                        else{
                                            window.location.reload();
                                        }
                                    }
                                } >Delete property</button>
                            </div>
                        )
                    }
                    )}
                    
                    </div>
                    <br />
                    <br />
                    
                    </div>
        </div>
    );
}

export default ViewProperties;