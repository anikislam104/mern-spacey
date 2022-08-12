import React, { useEffect } from "react";
import NavbarHomepage from "../navbar_homepage";
import axios from "axios";


const EditRooms = () => {
    const [rooms, setRooms] = React.useState([]);
    //room object
    const [room, setRoom] = React.useState({
        room_type: "",
        room_number: "",
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
    return(
        <div>
            <NavbarHomepage />
            <h1>Current Rooms</h1>
            <div className="container">
                <div className="notification">
                    {rooms.map((room) => {
                        return (
                            <div>
                                <h1>{room.roomType}   {room.roomNo}</h1>
                                <br />
                                <button className="btn btn-primary" onClick={
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
                                }>Remove One</button>
                            </div>
                        )
                    }
                    )}
                    </div>
                    <br />
                    <input type="text" placeholder="Room Type" onChange={(e) => setRoom({ ...room, room_type: e.target.value })} />
                    <br />
                    <br />
                    <input type="text" placeholder="Room Number" onChange={(e) => setRoom({ ...room, room_number: e.target.value })} />
                    <br />
                    <br />
                    <button className="btn btn-primary" onClick={() => {
                        setRoomArray([...roomArray, room]);
                        console.log(room.room_type);
                        console.log(room.room_number);
                        const rooms = {
                            room_type: room.room_type,
                            room_no: room.room_number,
                            property_id: localStorage.getItem("edit_property_id"),
                        }
                        setRoom({ room_type: "", room_number: "" });
                        
                        axios.post("http://localhost:5000/property/add_room", rooms)
                            .then((res) => {
                                console.log(res.data);
                                // window.location.reload();
                            })
                    }
                    }>Add Room</button>
                    <br />
                    <br />
                    {roomArray.map((room) => {
                        return (
                            <div>
                                <h1>{room.room_type}   {room.room_number}</h1>
                                <br />
                                
                            </div>
                        )
                    }
                    )}
                </div>
        </div>
    )
}

export default EditRooms;