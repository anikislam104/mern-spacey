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
                            console.log(res3.data);
                             this.setState({
                            renter_name: res3.data,
                                            });
                                    })
                                    
            axios.post('http://localhost:5000/renting/get_rooms', property)
            .then(res => {
                console.log(res.data);
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
        console.log(host_id);
        axios.post('http://localhost:5000/users/get_user_name',id)
            .then(res => {
                console.log(res.data);
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
        const myStyle={
            textSection:{
                textAlign:"left",
            },
            experienceSection:{
                width: "350px",
                height: "150px",
             },
             buttonSection:{
                width:"120px",
                height:"40px",
                backgroundColor:"blueViolet",
             },
        }

        return this.state.property.map((property) => {
            var image=property.image;

            return (
                <div>
                    <div class="row align-items-center">
                        <div class="col-lg-2">

                        </div>
                        <div class="col-lg-3">
                        <br/>
                        <br/>
                    <h1 class="display-6" style={myStyle.textSection}><b>{property.title}</b></h1>
                    <br/>
                    <h1><b>Location:</b> {property.location}</h1>
                    <br/>
                    <h1><b>Size:</b> {property.size} square ft</h1>
                    <br/>
                    <h1><b>Price Per Day:</b> {property.pricePerDay} tk</h1>
                    <br/>
                    {this.getUsername(property.hostId)}
                    <h1 style={myStyle.textSection}><b>Host: </b><button onClick={
                        () => {
                            localStorage.setItem("clicked_user_id",property.hostId);
                            window.location = '/user_profile';
                        }
                    }><i>{this.state.host_name}</i></button></h1>
                    </div>
                    <div class="col-lg-1">

                    </div>
                    <div class="col-lg-6">
                        <br/><br/><br/>
                    <img src={process.env.PUBLIC_URL+"/images/"+image} alt="..." 
                    style={{  width: "450px" , height: "350px ", display: "flex" }} />
                    </div>

                    </div>
                    
                    <br></br>
                    <br></br>
                    <br/>
                    <h1><b>&emsp;&emsp;Description:</b> {property.description}</h1>
                    <br/><br/>
                    <br/>


                    <div class="row align-items-center">
                    <div class="col-lg-1">

                    </div>
                        <div class="col-lg-4">

                    <h1 style={{textAlign:"center"}}><strong >Rooms:</strong></h1>
                    <br/>
                    {this.state.rooms.map((room) => {
                        return (
                            <div style={{textAlign:"center"}}>
                                
                                <ul style={{display:"inline-block",textAlign:"center"}}>
                                <li><h1>{room.roomType} <b>{room.roomNo}</b></h1></li>
                                </ul>
                                </div>
                        )
                    }
                    )}
                    </div>
                    <div class="col-lg-2">

                    </div>
                    <br></br>
                    <br></br>
                    <div class="col-lg-4">
                    <h1 style={{textAlign:"center"}}><strong>Facilities:</strong></h1>
                    <br/>
                    {this.state.facilities.map((facility) => {
                        return (
                            <div style={{textAlign:"center"}}>
                                <ul style={{display:"inline-block",textAlign:"center"}}>
                                <li><h1>{facility.facilityType}</h1></li>
                                </ul>
                                </div>
                        )
                    }
                    )}
                    </div>
                   </div>

                    {/* //design button */}
                    <br />
                    <br />
                    <br />
                    {/* <button className="btn btn-primary" onClick={() => this.sendRentalRequest(property)}>Book Now</button> */}
                    <div class="row align-items-center">

                <div class="col-lg-10">
                    &emsp;&emsp;
                    <button className="btn btn-primary" style={myStyle.buttonSection} onClick={
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
                    </div>
                    <br />
                    <br />
                    <div class="col-lg-2">
                    <button className="btn btn-primary" style={myStyle.buttonSection} onClick={
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
                    </div>
                    </div>
                    <br />
                    <br />
                    <div  id="revrat" style={{display:"none"}}>
                    <h1><strong>&emsp;&emsp;Reviews:</strong></h1>
                    <br/>
                    {this.state.review_ratings.map((review_rating) => {
                        return (
                            <div >
                                <p>
                                <h1>&emsp;&emsp;&emsp;&emsp;&emsp;Rating: <b>{review_rating[1]}*</b></h1>
                                <h1>&emsp;&emsp;&emsp;&emsp;&emsp;<i>"{review_rating[2]}"</i></h1>
                                <h1>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;---{review_rating[0]}</h1>
                                </p>
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
            <div class="bg-light">
                <NavbarHomepage />
                {this.showProperty()}
            </div>
        )
    }

   
}