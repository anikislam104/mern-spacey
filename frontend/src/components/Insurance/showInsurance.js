import React, { useEffect } from "react";
import axios from "axios";

const ShowInsurance = () => {
    const [name, setName] = React.useState('');
    const [policy, setPolicy] = React.useState('');

    useEffect(() => {
        const id={
            id: localStorage.getItem("user_id")
        }
        axios.post("http://localhost:5000/insurance/get_insurance", id)
            .then(res => {
                console.log(res.data);
                setName(res.data.name);
                setPolicy(res.data.policy);
            }
            )
    })

    return (
        <div>
            <h1>Insurance providers name: {name}</h1>
            <h1>Policy: {policy}</h1>
        </div>
        )

}

export default ShowInsurance;