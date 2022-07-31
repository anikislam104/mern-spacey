import axios from "axios";
import React,{ Component } from "react";


export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this);
        this.state = {
            rent_request: [],
            host_id: '',
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                console.log(JSON.stringify(json));
                this.setState({
                    host_id: json.user_id,
                });
                const host_id ={
                    host_id: this.state.host_id,
                }
                axios.post('http://localhost:5000/renting/my_rentRequests', host_id)
                    .then(res2 => {
                        console.log(res2.data);
                        this.setState({
                            rent_request: res2.data,
                        });
                    })
            })
    }

    acceptRequest(property_id, host_id, renter_id){

        window.location.href='/homepage';
    }

    rejectRequest(property_id, host_id, renter_id){
        window.location.href='/homepage';
    }

    render() {
        
            return this.state.rent_request.map((request) => {
                return (
                    <div>
                        
                        <h1>{request.property_id}</h1>
                        <h1>{request.renter_name}</h1>
                        <h1>{request.date}</h1>
                        <button onClick={
                            () => {
                                this.acceptRequest(request.property_id, request.host_id, request.renter_id);
                            }
                        }>Accept</button>
                        <p>         </p>
                        <button onClick={
                            () => {
                                this.rejectRequest(request.property_id, request.host_id, request.renter_id);
                            }
                        }>Reject</button>
                        <br />
                        <br />
                    </div>
                )
            })
        
    }
}