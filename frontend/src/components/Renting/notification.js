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
        // window.location.reload();
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                console.log(JSON.stringify(json));
                this.setState({
                    host_id: localStorage.getItem('user_id'),
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

    acceptRequest(id){
        const acceptRequest ={
            id: id,
        }
        axios.post('http://localhost:5000/renting/accept_rent_request', acceptRequest)
            .then(res => {
                console.log(res.data);
            })
        window.location.href='/homepage';
        alert("Request Accepted");
    }

    rejectRequest(id){
        const rejectRequest ={
            id: id,
        }
        axios.post('http://localhost:5000/renting/reject_rent_request', rejectRequest)
            .then(res => {
                console.log(res.data);
            })
        window.location.href='/homepage';
        alert("Request Rejected");
    }

    render() {
        
            return this.state.rent_request.map((request) => {
                return (
                    <div>
                        
                        <h1>{request.property_title}</h1>
                        <h1>{request.renter_name}</h1>
                        <h1>{request.date}</h1>
                        <button onClick={
                            () => {
                                this.acceptRequest(request._id);
                            }
                        }>Accept</button>
                        <p>         </p>
                        <button onClick={
                            () => {
                                this.rejectRequest(request._id);
                            }
                        }>Reject</button>
                        <br />
                        <br />
                    </div>
                )
            })
        
    }
}