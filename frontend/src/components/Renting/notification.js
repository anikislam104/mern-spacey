import axios from "axios";
import React,{ Component } from "react"; 
import NavbarHomepage from "../navbar_homepage";


export default class RentRequestNotification extends Component {
    constructor(props) {
        super(props);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this);
        this.showRentRequest = this.showRentRequest.bind(this);
        this.state = {
            rent_request: [],
            host_id: '',
        }
    }

    componentDidMount() {
        // window.location.reload();
        
                const host_id ={
                    host_id: localStorage.getItem('user_id'),
                }
                axios.post('http://localhost:5000/renting/my_rentRequests', host_id)
                    .then(res2 => {
                        console.log(res2.data);
                        this.setState({
                            rent_request: res2.data,
                            
                        });
                        // console.log(this.state.rent_request);
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
        window.location.reload();
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
        window.location.reload();
        alert("Request Rejected");
    }

    showRentRequest(){
        console.log(this.state.rent_request);
        return this.state.rent_request.map((request) => {
            return (
                <div>
                    
                    <h1>{request.property_title}</h1>
                    <h1>{request.renter_name}</h1>
                    <h1>{request.start_date}</h1>
                    <h1>{request.end_date}</h1>
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

    render() {
        
            return (
                <div>
                    <NavbarHomepage />
                    <h1>Rent Request Notifications</h1>
                    <br />
                    {this.showRentRequest()}
                </div>
            )
        
    }
}