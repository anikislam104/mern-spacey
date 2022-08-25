import React from "react";
import { useEffect } from "react";
import axios from "axios";
import NavbarHomepage from "../navbar_homepage";
import "./starRate.css";


const PastBookings = () => {
    const [bookings, setBookings] = React.useState([]);
    const [review, setReview] = React.useState();
    const [rating, setRating] = React.useState();
    const [total, setTotal] = React.useState();

    


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
                setTotal(res.data.length);
                console.log(res.data.length);
            });
    }, []);

    //declare array of 3 elements
    var ratingArray = new Array(total);
    for (var i = 0; i < total; i++) {
        //start filling from 0 increment by 1
        ratingArray[i] = i;
    }
    console.log(ratingArray);

    var btn_array = new Array(total);
    for (i = 0; i < total; i++) {
        //start from end of rating array
        btn_array[i] = total+i;
    }
    console.log(btn_array);
    var star5array = new Array(total);
    for(i=0;i<total;i++){
        star5array[i]=i+total*2;
    }
    //make for star4array
    var star4array = new Array(total);
    for(i=0;i<total;i++){
        star4array[i]=i+total*3;
    }
    //make for star3array
    var star3array = new Array(total);
    for(i=0;i<total;i++){
        star3array[i]=i+total*4;
    }
    //make for star2array
    var star2array = new Array(total);
    for(i=0;i<total;i++){
        star2array[i]=i+total*5;
    }
    //make for star1array
    var star1array = new Array(total);
    for(i=0;i<total;i++){
        star1array[i]=i+total*6;
    }
    var reviewarray = new Array(total);
    for(i=0;i<total;i++){
        reviewarray[i]=i+total*7;
    }
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
                    {bookings.map((booking,idx) => {
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
                                        if(document.getElementById(reviewarray[idx]).style.display === "none"){
                                            document.getElementById(reviewarray[idx]).style.display="block";
                                        }
                                        //make input box hidden if visible
                                        else{
                                            document.getElementById(reviewarray[idx]).style.display="none";
                                        }
                                        //make button visible if hidden
                                        if(document.getElementById(btn_array[idx]).style.display === "none"){
                                            document.getElementById(btn_array[idx]).style.display="block";
                                        }
                                        //make button hidden if visible
                                        else{
                                            document.getElementById(btn_array[idx]).style.display="none";
                                        }
                                        //make rating visible if hidden
                                        if(document.getElementById(ratingArray[idx]).style.display === "none"){
                                            document.getElementById(ratingArray[idx]).style.display="block";
                                        }
                                        //make rating hidden if visible
                                        else{
                                            document.getElementById(ratingArray[idx]).style.display="none";
                                        }
                                    }
                                }>Review and Rate</button>
                                
                                <input id={reviewarray[idx]} style={inputStyle} onChange={
                                    (e) => {
                                        setReview(e.target.value);
                                    }
                                }></input>
                                <br />
                                <div class="rate" id={ratingArray[idx]} style={{display:"none"}}>
                                    <input type="radio" id={star5array[idx]} name="rate" value="5" onClick={
                                        (e) => {
                                            
                                            setRating(5);
                                            var x = window.scrollX;
                                            var currentScroll = window.scrollY;   
                                            window.scrollTo(x,currentScroll);
                                            
                                        }
                                    }/>
                                    <label for={star5array[idx]} title="text">5 stars</label>
                                    <input type="radio" id={star4array[idx]} name="rate" value="4" onClick={
                                        (e) => {
                                            setRating(4);
                                            var x = window.scrollX;
                                            var currentScroll = window.scrollY;   
                                            window.scrollTo(x,currentScroll);
                                        }
                                    }/>
                                    <label for={star4array[idx]} title="text">4 stars</label>
                                    <input type="radio" id={star3array[idx]} name="rate" value="3" onClick={
                                        (e) => {
                                            setRating(3);
                                            var x = window.scrollX;
                                            var currentScroll = window.scrollY;   
                                            window.scrollTo(x,currentScroll);
                                        }
                                    }/>
                                    <label for={star3array[idx]} title="text">3 stars</label>
                                    <input type="radio" id={star2array[idx]} name="rate" value="2" onClick={
                                        (e) => {
                                            setRating(2);
                                            //get current window position
                                            var x = window.scrollX;
                                            var currentScroll = window.scrollY;   
                                            window.scrollTo(x,currentScroll);

                                        }
                                    }/>
                                    <label for={star2array[idx]} title="text">2 stars</label>
                                    <input type="radio" id={star1array[idx]} name="rate" value="1" onClick={
                                        (e) => {
                                            setRating(1);
                                            var x = window.scrollX;
                                            var currentScroll = window.scrollY;   
                                            window.scrollTo(x,currentScroll);
                                        }
                                    }/>
                                    <label for={star1array[idx]} title="text">1 star</label>
                                </div>
                                <br />
                                <button id={btn_array[idx]} style={btn} className="btn btn-primary" onClick={
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
                                                if(res.data === "ok"){
                                                    window.location.reload();
                                                }
                                                else{
                                                    alert("You have already reviewed this property");
                                                }
                                            });

                                    }
                                }>Submit</button>
                            </div>
                        )
                        
                        
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default PastBookings;