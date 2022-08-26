import axios from "axios";
import React,{ useEffect } from "react";
import NavbarHomepage from "../navbar_homepage";

const SelectedProperty = () => {
    const [property, setProperty] = React.useState([]);
    const [rooms, setRooms] = React.useState([]);
    const [facilities, setFacilities] = React.useState([]);
    const [review_ratings, setReviewRatings] = React.useState([]);
    const [host_name, setHostName] = React.useState('');
    // const [renter_name, setRenterName] = React.useState('');

    useEffect(() => {
        
        const prop = {
            property_id: localStorage.getItem('selected_property_id'),
        }
        axios.post('http://localhost:5000/renting/get_selected_property', prop)
            .then(res => {
                console.log(res.data);
                setProperty(res.data);
                const id={
                    user_id: res.data.hostId,
                }
                console.log(id);
                // console.log(host_id);
                axios.post('http://localhost:5000/users/get_user_name',id)
                    .then(res => {
                        console.log(res.data);
                        setHostName(res.data);
                    })

                axios.post('http://localhost:5000/renting/get_rooms', prop)
            .then(res => {
                console.log(res.data);
                setRooms(res.data);
            })

            axios.post('http://localhost:5000/renting/get_facilities', prop)
            .then(res => {
                console.log(res.data);
                setFacilities(res.data);
            })

            axios.post('http://localhost:5000/renting/get_reviews_ratings', prop)
            .then(res => {
                console.log(res.data);
                setReviewRatings(res.data);

                
            })
            
                
            })
            // const renter_id={
            //                user_id: localStorage.getItem('user_id'),
            //     }
            // axios.post('http://localhost:5000/users/get_user_name',renter_id)
            //          .then(res3 => {
            //                 console.log(res3.data);
            //                 setRenterName(res3.data.user_name);
            //                         })
                                    
            
        
        } , [])
    //get username of host


    

    return (
        <div>
            <NavbarHomepage />
            <div className="container">
                    <h1>{property.title}</h1>
                    <h1>Location: {property.location}</h1>
                    <h1>Size: {property.size} square ft</h1>
                    <h1>Price Per Day: {property.pricePerDay} tk</h1>
                    <h1>Description: {property.description}</h1>
                    <h1>Host: <button onClick={
                        () => {
                            localStorage.setItem("clicked_user_id",property.hostId);
                            window.location = '/user_profile';
                        }
                    }>{host_name}</button></h1>
                    <br></br>
                    <br></br>
                    <h1><strong>Rooms:</strong></h1>
                    {rooms.map((room) => {
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
                    <h1><strong>Facilities:</strong></h1>
                    {facilities.map((facility) => {
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
                    <h1><strong>Reviews:</strong></h1>
                    {review_ratings.map((review_rating) => {
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
        </div>
        )
   
}

export default SelectedProperty;