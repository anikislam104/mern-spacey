import axios from "axios";
import React,{ Component } from "react"; 
import NavbarHomepage from "../navbar_homepage";

const style ={
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "10px",
        marginBottom: "10px",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
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

        const fontStyle={
            //font color blue and bold
            color: "black",
            fontWeight: "normal",
            fontSize:"18px",
        }

        console.log(this.state.rent_request);
        return this.state.rent_request.map((request) => {
            let db = new Date(request.start_date);
            const year=db.getFullYear();
            const day=db.getDate();
            const name = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const month=name[db.getMonth()];
            db=new Date(request.end_date);
            const year2=db.getFullYear();
            const day2=db.getDate();
            const month2=name[db.getMonth()];
            return (
                <div style={style}>


                    <div class="row align-items-center">

                  
                    <div class="col-lg-9">
                    <br/>
                    <h2 style={fontStyle}><b>&emsp;&emsp;Property: </b>{request.property_title}</h2>
                    <h2 style={fontStyle}><button onClick={
                        () => {
                            localStorage.setItem('clicked_user_id', request.renter_id);
                            window.location.href = "/user_profile";
                        }
                    }><b>&emsp;&emsp;Requester:</b>{request.renter_name}</button></h2>
                    <h2 style={fontStyle}><b>&emsp;&emsp;Start date: </b>{month} {day},{year}</h2>
                    <h2 style={fontStyle}><b>&emsp;&emsp;End date: </b>{month2} {day2},{year2}</h2>
                    <br/>
                    </div>

                <div class="col-lg-3">
                    <button className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={
                        () => {
                            this.acceptRequest(request._id);
                        }
                    }>Accept</button>
                    
                    <br />
                    <br />

                    <button className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={
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