import React, { useEffect } from "react";
import NavbarHomepage from "../navbar_homepage";
import axios from "axios";

let value=0;

const EditRooms = () => {
    const [rooms, setRooms] = React.useState([]);
    //room object
    const [room, setRoom] = React.useState({
        room_type: "",
        room_number: "0",
    })

    //array of room objects
    const [roomArray, setRoomArray] = React.useState([]);


    useEffect(() => {
        const property_id = {
            property_id: localStorage.getItem("edit_property_id"),
        }

        axios.post("http://localhost:5000/renting/get_rooms", property_id)
        .then((res) => {
            console.log(res.data);
            setRooms(res.data);
        });
    }, []);

    const myStyle = {
        inputSection2: {
          width: "50px",
          height: "40px",
        },
        buttonSection3: {
          backgroundColor: "#b9f2ff",
          padding: "5px 15px",
          fontSize: "25px",
          color: "black",
        },
      }

    return(
        <div class="bg-light">
            <NavbarHomepage />
            <br/>
            <h1 class="display-6" style={{textAlign:"center"}}><b>Current Rooms</b></h1>
            <div className="container">
                <div className="notification">
                    <br/>
                    <div class="row align-items-center">
                    <div class="col-lg-1"></div>
          <div class="col-lg-4">
                    {rooms.map((room) => {
                        
                        return (
                            <div className="card mb-4 box-shadow" style={{width:"250px", height:"200px",backgroundColor:"white",textAlign:"center"}}>
                                <br/>
                                <h2><b>{room.roomNo}&nbsp;{room.roomType}  </b></h2>
                                <br />
                                <div style={{textAlign:"center"}}><button className="btn btn-primary" onClick={
                                    () => {
                                        const id = {
                                            room_id: room._id,
                                        }
                                        axios.post("http://localhost:5000/property/increase_room", id)
                                            .then((res) => {
                                                console.log(res.data);
                                                window.location.reload();
                                            })
                                    }
                                }>Add One</button>
                                <br />
                                <br />
                                <button className="btn btn-primary" onClick={
                                    () => {
                                        const id = {
                                            room_id: room._id,
                                        }
                                        axios.post("http://localhost:5000/property/decrease_room", id)
                                            .then((res) => {
                                                console.log(res.data);
                                                window.location.reload();
                                            })
                                    }
                                }>Remove One</button></div>
                             
                            </div>
                        )
                    }
                     
                    )}
                    </div>


                    

                    <div class="col-lg-2"></div>
                    
                    <div class="col-lg-5">
          
                    <h1><b>Add New Room</b></h1>
                    <br />
                    
                    <input type="text" placeholder="Room Type" onChange={(e) => {e.preventDefault(); setRoom({ ...room, room_type: e.target.value })}} />
                    <br />
                    <br />
                     <label><b>Room No </b></label><br/><br />
                          <div class="row">
                              <div class="col-lg-3"><button type="button" class="rounded-pill px-3" style={myStyle.buttonSection3} onClick={(e)=>{
                                  e.preventDefault();
                                  setRoomArray([...roomArray, room]);
                                 value++;
                                 room.room_number=value;
                                  console.log(value);
                                }}>+</button></div>
                              <div class="col-lg-2"><input type="text" required="" style={myStyle.inputSection2} placeholder=""
                              value={room.room_number}/></div>
                             
                              <div class="col-lg-3"><button type="button" class="rounded-pill px-3" style={myStyle.buttonSection3} onClick={(e)=>{
                                e.preventDefault();
                                if(value<=0) alert("Room no cannot be less than 0");
                                else{
                                    setRoomArray([...roomArray, room]);
                                    value--;
                                    room.room_number=value;
                                    console.log(value);
                                }
                              }} >-</button></div>
                          </div> 
                          <br/>
                    {/* <input type="text" placeholder="Room Number"  onChange={(e) => setRoom({ ...room, room_number: e.target.value })} /> */}
                    <br />
                    <br />
                    
                    <button className="btn btn-primary" onClick={() => {
                        setRoomArray([...roomArray, room]);
                        console.log(room.room_type);
                        
                        //console.log(room.room_number);
                        const rooms = {
                            room_type: room.room_type,
                            room_no: value,
                            property_id: localStorage.getItem("edit_property_id"),
                        }
                        console.log(rooms.room_no);
                        setRoom({ room_type: "", room_number: "" });
                        
                        axios.post("http://localhost:5000/property/add_room", rooms)
                            .then((res) => {
                                console.log(res.data);
                                window.location.reload();
                            })
                    }
                    }>Add Room</button>
                    <br />
                    
                    {/* {roomArray.map((room) => {
                        return (
                            <div>
                                <h2>{room.room_type}   {room.room_number}</h2>
                                <br />
                                
                            </div>
                        )
                    }
                    )} */}
                    </div>
                    </div>
                    </div>

                 
                </div>
        </div>
    )
}

export default EditRooms;