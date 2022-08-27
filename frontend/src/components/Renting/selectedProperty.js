import axios from "axios";
import { Toast } from "bootstrap";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import NavbarHomepage from "../navbar_homepage";

const SelectedProperty = () => {
  const [property, setProperty] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const [facilities, setFacilities] = React.useState([]);
  const [review_ratings, setReviewRatings] = React.useState([]);
  const [host_name, setHostName] = React.useState("");
  ///const [host_id, setHostId] = React.useState("");
  const { setHostId } = ChatState();
  // const [renter_name, setRenterName] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const prop = {
      property_id: localStorage.getItem("selected_property_id"),
    };
    axios
      .post("http://localhost:5000/renting/get_selected_property", prop)
      .then((res) => {
        console.log(res.data);
        setProperty(res.data);
        const id = {
          user_id: res.data.hostId,
        };
        console.log(id);
        setHostId(res.data.hostId);
        // console.log(host_id);
        axios
          .post("http://localhost:5000/users/get_user_name", id)
          .then((res) => {
            console.log(res.data);
            setHostName(res.data);
          });

        axios
          .post("http://localhost:5000/renting/get_rooms", prop)
          .then((res) => {
            console.log(res.data);
            setRooms(res.data);
          });

        axios
          .post("http://localhost:5000/renting/get_facilities", prop)
          .then((res) => {
            console.log(res.data);
            setFacilities(res.data);
          });

        axios
          .post("http://localhost:5000/renting/get_reviews_ratings", prop)
          .then((res) => {
            //console.log(res.data);
            setReviewRatings(res.data);
          });
      });
  }, []);

<<<<<<< HEAD
                
            })
            
                
            })
                }, []);
                                    
            
        
   
    //get username of host
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
    const style = {
        fontSize: "17px",
        color: "#0E2A53",
        fontWeight: "bold",
        textAlign: "left",
        marginTop: "10px",
    };
=======
>>>>>>> ca970758d03af56db33afcf433c8c9100d73ae8c

  //get username of host
  const myStyle = {
    textSection: {
      textAlign: "left",
    },
    experienceSection: {
      width: "350px",
      height: "150px",
    },
    buttonSection: {
      width: "120px",
      height: "40px",
      backgroundColor: "blueViolet",
    },
  };

  var image = property.image;
  return (
    <div class="bg-light">
      <NavbarHomepage />
      <div className="container">
        <div class="row align-items-center">
          <div class="col-lg-2"></div>
          <div class="col-lg-3">
            <br />
            <br />
            <h1 class="display-6" style={myStyle.textSection}>
              <b>{property.title}</b>
            </h1>
            <br />
            <h1>
              <b>Location:</b> {property.location}
            </h1>
            <br />
            <h1>
              <b>Size:</b> {property.size} square ft
            </h1>
            <br />
            <h1>
              <b>Price Per Day:</b> {property.pricePerDay} tk
            </h1>
            <br />

            {/* {this.getUsername(property.hostId)} */}
            <h1>
              <b>Host:</b>{" "}
              <button
                onClick={() => {
                  localStorage.setItem("clicked_user_id", property.hostId);
                  window.location = "/user_profile";
                }}
              >
                <i>{host_name}</i>
              </button>
            </h1>
          </div>
          <div class="col-lg-1"></div>
          <div class="col-lg-6">
            <br />
            <br />
            <br />
            <img
              src={process.env.PUBLIC_URL + "/images/" + image}
              alt="..."
              style={{ width: "450px", height: "350px ", display: "flex" }}
            />
          </div>
        </div>
        <br></br>
        <br></br>
        <br />
        <h1>
          <b>&emsp;&emsp;Description:</b> {property.description}
        </h1>
        <br />
        <br />

<<<<<<< HEAD
                    </div>
                    <br></br>
                    <br></br>
                    <br/>
                    <p class="fs-4"><h1><b>&emsp;&emsp;Description:</b> <p>{property.description}</p></h1></p>
                    <br/><br/>

                    
                    <div class="row align-items-center">
                    <div class="col-lg-1">

                    </div>
                        <div class="col-lg-4">

                        <p class="fs-4"><h1 style={{textAlign:"center"}}><strong >Rooms:</strong></h1></p>
                    <br/>
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
                    
                    <div class="col-lg-4">
                    <p class="fs-4"><h1 style={{textAlign:"center"}}><strong>Facilities:</strong></h1></p>
                    <br/>
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

                    <div class="row align-items-center">

                <div class="col-lg-10">
                    &emsp;&emsp;

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
                    </div>
                    </div>
                    <br />
                    <br />
                    <div  id="revrat" style={{display:"none"}}>
                    <p class="fs-4"><h1><strong>Reviews:</strong></h1></p>
                    <br/>
                    {review_ratings.map((review_rating) => {
                        return (
                            
                            <div className="card mb-5 box-shadow" style={{width:"550px", height:"90px",backgroundColor:"white"}}>
                                <p>
                                <h1 style={style}>&emsp;&emsp;&emsp;&emsp;&emsp;Rating: <b>{review_rating[1]}*</b></h1>
                                <p><h1 style={{fontSize:"20px"}}>&emsp;&emsp;&emsp;&emsp;<i>"{review_rating[2]}"</i></h1></p>
                                <h1>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;---<b>{review_rating[0]}</b></h1>
                                </p>
                                <br></br>
                            </div>
                        )
                    })}
                    </div>
=======
        <div class="row align-items-center">
          <div class="col-lg-1"></div>
          <div class="col-lg-4">
            <h1 style={{ textAlign: "center" }}>
              <strong>Rooms:</strong>
            </h1>
            <br />
            {rooms.map((room) => {
              return (
                <div style={{ textAlign: "center" }}>
                  <ul style={{ display: "inline-block", textAlign: "center" }}>
                    <li>
                      <h1>
                        {room.roomType} <b>{room.roomNo}</b>
                      </h1>
                    </li>
                  </ul>
>>>>>>> ca970758d03af56db33afcf433c8c9100d73ae8c
                </div>
              );
            })}
          </div>
          <div class="col-lg-2"></div>

          <div class="col-lg-4">
            <h1 style={{ textAlign: "center" }}>
              <strong>Facilities:</strong>
            </h1>
            <br />
            {facilities.map((facility) => {
              return (
                <div style={{ textAlign: "center" }}>
                  <ul style={{ display: "inline-block", textAlign: "center" }}>
                    <li>
                      <h1>{facility.facilityType}</h1>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* //design button */}
        <br />
        <br />

        <div class="row align-items-center">
          <div class="col-lg-10">
            &emsp;&emsp;
            <button
              className="btn btn-primary"
              onClick={() => {
                // this.sendRentalRequest(property);
                const info = {
                  property_id: property._id,
                  user_id: localStorage.getItem("user_id"),
                };
                axios
                  .post("http://localhost:5000/renting/check_if_mine", info)
                  .then((res) => {
                    console.log(res.data);
                    if (res.data === "yes") {
                      alert("You cannot book your own property");
                    } else {
                      window.location.href = "/renting/choose_facility";
                    }
                  });
              }}
            >
              Book
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {

                navigate("/chat");
              }}
            >
              Chat With Host
            </button>
          </div>
          <br />
          <br />
          <div class="col-lg-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                //show retrav if hidden
                if (
                  document.getElementById("revrat").style.display === "none"
                ) {
                  document.getElementById("revrat").style.display = "block";
                } else {
                  document.getElementById("revrat").style.display = "none";
                }
              }}
            >
              See Reviews
            </button>
          </div>
        </div>
        <br />
        <br />
        <div id="revrat" style={{ display: "none" }}>
          <h1>
            <strong>Reviews:</strong>
          </h1>
          <br />
          {review_ratings.map((review_rating) => {
            return (
              <div>
                <p>
                  <h1>
                    &emsp;&emsp;&emsp;&emsp;&emsp;Rating:{" "}
                    <b>{review_rating[1]}*</b>
                  </h1>
                  <h1>
                    &emsp;&emsp;&emsp;&emsp;&emsp;<i>"{review_rating[2]}"</i>
                  </h1>
                  <h1>
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;---
                    {review_rating[0]}
                  </h1>
                </p>
                <br></br>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectedProperty;
