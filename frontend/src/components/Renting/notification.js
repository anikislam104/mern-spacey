import axios from "axios";
import React,{ Component } from "react"; 
import NavbarHomepage from "../navbar_homepage";

const style ={
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "10px",
        marginBottom: "10px",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"
};

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
                <div style={style}>


                    <div class="row align-items-center">

                  
                    <div class="col-lg-9">
                    <br/>
                    <h1><b>&emsp;Property:</b>&nbsp; {request.property_title}</h1>
                    <h1><button onClick={
                        () => {
                            localStorage.setItem('clicked_user_id', request.renter_id);
                            window.location.href = "/user_profile";
                        }
                    }><b>&emsp;Requester:</b> &nbsp;{request.renter_name}</button></h1>
                    <h1><b>&emsp;Start date:</b>&nbsp;{request.start_date}</h1>
                    <h1><b>&emsp;End date:</b>&nbsp;{request.end_date}</h1>
                    <br/>
                    </div>

                <div class="col-lg-3">
                    <button class="button" onClick={
                        () => {
                            this.acceptRequest(request._id);
                        }
                    }>Accept</button>
                    
                    <br />
                    <br />

                    <button class="button" onClick={
                        () => {
                            this.rejectRequest(request._id);
                        }
                    }>Reject</button>

</div>
                    </div>
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
                    {/*<h1>Rent Request Notifications</h1>*/}
                    <br />
                    {this.showRentRequest()}
                </div>
            )
        
    }
}