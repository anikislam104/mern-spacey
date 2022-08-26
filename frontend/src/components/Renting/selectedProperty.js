import axios from "axios";
import React,{ Component } from "react";
import NavbarHomepage from "../navbar_homepage";

export default class SelectedProperty extends Component {
    constructor(props) {
        super(props);
        this.getUsername = this.getUsername.bind(this);
        this.sendRentalRequest = this.sendRentalRequest.bind(this);
        this.state = {
            property:[],
            rooms:[],
            facilities:[],
            review_ratings:[],
            host_name:'',
            renter_name:''
        }
    }
    componentDidMount() {
        const property = {
            property_id: localStorage.getItem('selected_property_id'),
        }
        axios.post('http://localhost:5000/renting/get_selected_property', property)
            .then(res => {
                console.log(res.data);
                this.setState({
                    property: this.state.property.concat(res.data),
                });
                
            })
            const renter_id={
                           user_id: localStorage.getItem('user_id'),
                }
            axios.post('http://localhost:5000/users/get_user_name',renter_id)
                     .then(res3 => {
                            //console.log(res3.data);
                             this.setState({
                            renter_name: res3.data,
                                            });
                                    })
                                    
            axios.post('http://localhost:5000/renting/get_rooms', property)
            .then(res => {
                //console.log(res.data);
                this.setState({
                    rooms: this.state.rooms.concat(res.data),
                });
            })

            axios.post('http://localhost:5000/renting/get_facilities', property)
            .then(res => {
                console.log(res.data);
                this.setState({
                    facilities: this.state.facilities.concat(res.data),
                });
            })

            axios.post('http://localhost:5000/renting/get_reviews_ratings', property)
            .then(res => {
                console.log(res.data);
                this.setState({
                    review_ratings: this.state.review_ratings.concat(res.data),
                });
            })
        
        }
    //get username of host
    getUsername(host_id){
        const id={
            user_id: host_id,
        }
        //console.log(host_id);
        axios.post('http://localhost:5000/users/get_user_name',id)
            .then(res => {
                //console.log(res.data);
                this.setState({
                    host_name: res.data,
                });
            })
    }

    //send rental request to the server
    sendRentalRequest(property){
        var property_id = property._id;
        var host_id = property.hostId;
        var date = new Date();
        var renter_id = '';
        //fetch user id
        
                renter_id = localStorage.getItem('user_id');
                const rent_request = {
                    host_id: host_id,
                    renter_id: renter_id,
                    renter_name: this.state.renter_name,
                    property_id: property_id,
                    property_title: property.title,
                    date: date
                }
                console.log(rent_request);
                axios.post('http://localhost:5000/renting/send_rental_request', rent_request)
                    .then(res => {
                        console.log(res.data);
                        if(res.data === 'ok'){
                            window.location.href = '/homepage';
                            alert('Rental request sent');
                        }
                        else{
                            alert('You cannot book your own property');
                        }
                    })
            
        
    }
    showProperty(){
        return this.state.property.map((property) => {
            return (
                <div>
                    <h1>{property.title}</h1>
                    <h1>Location: {property.location}</h1>
                    <h1>Size: {property.size} square ft</h1>
                    <h1>Price Per Day: {property.pricePerDay} tk</h1>
                    <h1>Description: {property.description}</h1>
                    {this.getUsername(property.hostId)}
                    <h1>Host: <button onClick={
                        () => {
                            localStorage.setItem("clicked_user_id",property.hostId);
                            window.location = '/user_profile';
                        }
                    }>{this.state.host_name}</button></h1>
                    <br></br>
                    <br></br>
                    <h1><strong>Rooms:</strong></h1>
                    {this.state.rooms.map((room) => {
                        return (
                            <div>
                                <h1>{room.roomType} {room.roomNo}</h1>
                                </div>
                        )
                    }
                    )}
                    <br></br>
                    <br></br>
                    <h1><strong>Facilities:</strong></h1>
                    {this.state.facilities.map((facility) => {
                        return (
                            <div>
                                <h1>{facility.facilityType}</h1>
                                </div>
                        )
                    }
                    )}
                    {/* //design button */}
                    <br />
                    <br />
                    {/* <button className="btn btn-primary" onClick={() => this.sendRentalRequest(property)}>Book Now</button> */}
                    <button className="btn btn-primary" onClick={
                        () => {
                            // this.sendRentalRequest(property);
                            const info = {
                                property_id: property._id,
                                user_id: localStorage.getItem('user_id'),
                            }
                            axios.post('http://localhost:5000/renting/check_if_mine', info)
                                .then(res => {
                                    console.log(res.data);
                                    if(res.data === 'yes'){
                                        alert("You cannot book your own property");
                                    }
                                    else{
                                        window.location.href = '/renting/choose_facility';
                                    }

                                })
                            
                        }
                    }>Book</button>
                    <br />
                    <br />
                    <button className="btn btn-primary" onClick={
                        () => {
                            //show retrav if hidden
                            if(document.getElementById('revrat').style.display === 'none'){
                                document.getElementById('revrat').style.display = 'block';
                            }
                            else{
                                document.getElementById('revrat').style.display = 'none';
                            }
                        }
                    }>See Reviews</button>
                    <br />
                    <br />
                    <div  id="revrat" style={{display:"none"}}>
                    <h1><strong>Reviews:</strong></h1>
                    {this.state.review_ratings.map((review_rating) => {
                        return (
                            <div >
                                <h1>Renter name: {review_rating[0]}</h1>
                                <h1>Rating: {review_rating[1]}*</h1>
                                <h1>Review: {review_rating[2]}</h1>
                                <br></br>
                            </div>
                        )
                    })}
                    </div>
                </div>
            )
        
    })
}       

    render() {
        return (
            <div>
                <NavbarHomepage />
                {this.showProperty()}
            </div>
        )
    }

   
}