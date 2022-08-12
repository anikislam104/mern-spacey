import React from "react";
import { useEffect } from "react";
import axios from "axios";

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
        <div>
            <h1>My Properties</h1>
            <div className="container">
                <div className="notification">
                    {myProperties.map((myProperty) => {
                        return (
                            <div>
                                <p>{myProperty.title}</p>
                                <br />
                            </div>
                        )
                    }
                    )}
                    </div>
                    </div>
        </div>
    );
}

export default ViewProperties;