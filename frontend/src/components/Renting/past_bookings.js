import React from "react";
import { useEffect } from "react";
import axios from "axios";
import NavbarHomepage from "../navbar_homepage";
import "./starRate.css";


const PastBookings = () => {
    const [bookings, setBookings] = React.useState([]);
    const [review, setReview] = React.useState();
    const [rating, setRating] = React.useState();

    //declare array of 3 elements
    var ratingArray = new Array(3);
    //fill index 0 with 0
    ratingArray[0] = 100;
    //fill index 1 with 1
    ratingArray[1] = 101;
    //fill index 2 with 2
    ratingArray[2] = 102;

    var btn_array = new Array(3);
    btn_array[0] = 200;
    btn_array[1] = 201;
    btn_array[2] = 202;
    


    useEffect(() => {
        const id=localStorage.getItem("user_id");
        const user={
            user_id:id
        }
        // console.log(localStorage.getItem('user_id'));
        // console.log(id);
        axios.post("http://localhost:5000/renting/get_past_bookings",user)
            .then(res => {
                console.log(res.data);
                setBookings(res.data);
            });
    }, []);
    const style = {
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "10px",
        marginBottom: "10px",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        //align in center
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    };

    const inputStyle={
        display: "none",
        //design input box
        width: "50%",
        height: "50px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
    }

    const btn={
        display: "none",
    }

    return(
        <div>
            <NavbarHomepage />
            <h1>Past Bookings</h1>
            <div className="container">
                <div className="bookings">
                    {bookings.map((booking,i) => {
                        return (
                            <div style={style}>
                                
                                <h2>Property title: {booking[2]}</h2>
                                <p>Host name: {booking[1]}</p>
                                <p>Start date: {booking[3]}</p>
                                <p>End date: {booking[4]}</p>
                                <p>Price: {booking[5]}</p>
                                <br />
                                <br />
                                <button className="btn btn-primary" onClick={
                                    () => {
                                        //make input box visible if hidden
                                        if(document.getElementById(i).style.display === "none"){
                                            document.getElementById(i).style.display="block";
                                        }
                                        //make input box hidden if visible
                                        else{
                                            document.getElementById(i).style.display="none";
                                        }
                                        //make button visible if hidden
                                        if(document.getElementById(btn_array[i]).style.display === "none"){
                                            document.getElementById(btn_array[i]).style.display="block";
                                        }
                                        //make button hidden if visible
                                        else{
                                            document.getElementById(btn_array[i]).style.display="none";
                                        }
                                        //make rating visible if hidden
                                        if(document.getElementById(ratingArray[i]).style.display === "none"){
                                            document.getElementById(ratingArray[i]).style.display="block";
                                        }
                                        //make rating hidden if visible
                                        else{
                                            document.getElementById(ratingArray[i]).style.display="none";
                                        }
                                    }
                                }>Review and Rate</button>
                                
                                <input id={i} style={inputStyle} value={review} onChange={
                                    (e) => {
                                        setReview(e.target.value);
                                    }
                                }></input>
                                <br />
                                <div class="rate" id={ratingArray[i]} style={{display:"none"}}>
                                    <input type="radio" id="star5" name="rate" value="5" onClick={
                                        (e) => {
                                            setRating(5);
                                        }
                                    }/>
                                    <label for="star5" title="text">5 stars</label>
                                    <input type="radio" id="star4" name="rate" value="4" onClick={
                                        (e) => {
                                            setRating(4);
                                        }
                                    }/>
                                    <label for="star4" title="text">4 stars</label>
                                    <input type="radio" id="star3" name="rate" value="3" onClick={
                                        (e) => {
                                            setRating(3);
                                        }
                                    }/>
                                    <label for="star3" title="text">3 stars</label>
                                    <input type="radio" id="star2" name="rate" value="2" onClick={
                                        (e) => {
                                            setRating(2);
                                        }
                                    }/>
                                    <label for="star2" title="text">2 stars</label>
                                    <input type="radio" id="star1" name="rate" value="1" onClick={
                                        (e) => {
                                            setRating(1);
                                        }
                                    }/>
                                    <label for="star1" title="text">1 star</label>
                                </div>
                                <br />
                                <button id={btn_array[i]} style={btn} className="btn btn-primary" onClick={
                                    () => {
                                        //setReview(document.getElementById("review").value);
                                        //setRating(document.getElementById("rates").value);
                                        console.log(review);
                                        console.log(rating);
                                        const rr={
                                            review:review,
                                            rating:rating,
                                            booking_id:booking[0]
                                        }
                                        
                                        axios.post("http://localhost:5000/renting/set_rating_review",rr)
                                            .then(res => {
                                                console.log(res.data);
                                            });

                                    }
                                }>Submit</button>
                            </div>
                        )
                        //increment value of i
                        
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default PastBookings;