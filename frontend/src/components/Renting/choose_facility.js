import axios from "axios";
import React, { useEffect } from "react";
import Calendar from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import NavbarHomepage from "../navbar_homepage";
import Footer from '../Footer';
import io from 'socket.io-client';
import { ChatState } from "../../Context/ChatProvider";

const ENDPOINT = "http://localhost:5000";
var socket;



const ChooseStayDuration=()=>{
    const [start_date, setStartDate] = React.useState('');
    const [end_date, setEndDate] = React.useState('');
    const [host_id, setHostId] = React.useState('');
    const [property_id, setPropertyId] = React.useState('');
    const [property_title, setPropertyTitle] = React.useState('');
    const [renter_id, setRenterId] = React.useState(''); 
    const [renter_name, setRenterName] = React.useState('');
    const [allBookedDates, setAllBookedDates] = React.useState([]);
    const [socketConnected, setSocketConnected] = React.useState(false);
    const {user, selectedChat, setSelectedChat, notification, setNotification} = ChatState();
    
    
    useEffect(() => {
        //set renter id
        setRenterId(localStorage.getItem("user_id"));
        //set renter name
        axios.post('http://localhost:5000/users/get_user_name',{user_id: localStorage.getItem("user_id")})
            .then(res => {
                console.log(res.data);
                setRenterName(res.data);
            })
        //set host id
        axios.post('http://localhost:5000/renting/get_host_id',{property_id: localStorage.getItem('selected_property_id')})
            .then(res => {
                console.log(res.data);
                setHostId(res.data);
            });
        //set property id
        setPropertyId(localStorage.getItem('selected_property_id'));
        //set property title
        axios.post('http://localhost:5000/renting/get_title',{property_id: localStorage.getItem('selected_property_id')})
            .then(res => {
                
                console.log(res.data);
                setPropertyTitle(res.data);
            })
        
        //get all booked dates
        axios.post('http://localhost:5000/renting/get_booked_dates',{property_id: localStorage.getItem('selected_property_id')})
            .then(res => {
                console.log("ue");
                console.log(res.data);
                setAllBookedDates(res.data);
            }
            )

    }, []);

    useEffect(() => {
        
        // console.log(user);
        if(user){
            socket = io(ENDPOINT);
            socket.emit("setup", user);
            socket.on("connected", () => setSocketConnected(true));
        }
        // eslint-disable-next-line
      },[user]);
    // //all dates between august 1 and august 31
    // const  = [...Array(31).keys()].map(i => new Date(2022, 7, i + 1));
    //get difference between two dates
    const getDifference = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays+1;
    }
    
    
    //declare integer array equal size of all booked dates
    var totaldiff=0;
    const diffs = new Array(allBookedDates.length).fill(0);
    for(let i=0; i<allBookedDates.length; i++){
        console.log(allBookedDates[i]);
        //get 1st element of array of tuples
        const start_date = allBookedDates[i][0];
        //get 2nd element of array of tuples
        const end_date = allBookedDates[i][1];
        diffs[i]=getDifference(start_date, end_date);
        totaldiff+=diffs[i];
        console.log("diffs " + i+"  "+diffs[i]);
    }

    var booked_dates = [...Array(totaldiff).keys()].map(i => new Date(2022, 7, i + 1));
    var count=0;
    for(let i=0; i<allBookedDates.length; i++){
        //add dates from start_date to end_date to booked_dates array
        
        var current_date = allBookedDates[i][0];
        for(let j=0; j<diffs[i]; j++){
            //get next date from current date
            

            booked_dates[count]=new Date(current_date);
            var next_date = current_date;
            console.log("current date " + next_date);
            next_date=new Date(next_date);
            next_date.setDate(next_date.getDate()+1);
            next_date=next_date.toUTCString();
            console.log("next date " + next_date);
            current_date=next_date;   
            console.log("booked dates "+count+" " + booked_dates[j]);
            count++;
            
        }
    }
    console.log("booked_dates");
    console.log(booked_dates);
    
    // var len=20
    // //get all dates from august 3 to len days after august 3
    // const disabledDates = [...Array(len).keys()].map(i => new Date(2022, 7, 3 + i));

    function isSameDay(a, b) {
        return differenceInCalendarDays(a, b) === 0;
      }
    function tileDisabled({ date, view }) {
        // Disable tiles in month view only
        if (view === 'month') {
          // Check if a date React-Calendar wants to check is on the list of disabled dates
          return booked_dates.find(dDate => isSameDay(dDate, date));

        }
      }
    
    const onChangeStartDate = (date) => {
        setStartDate(date);
        
        
    }

    const onChangeEndDate = (date) => {
        setEndDate(date);
        
        
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const rent_request = {
            host_id: host_id,
            renter_id: renter_id,
            renter_name: renter_name,
            property_id: property_id,
            property_title: property_title,
            start_date: start_date,
            end_date: end_date,
        }

        
        console.log("start date "+start_date+" end date "+end_date);
        console.log(rent_request);
        axios.post('http://localhost:5000/renting/send_rental_request', rent_request)
            .then(res => {
                console.log(res.data);
                if(res.data === 'ok'){
                    alert('Rental request sent successfully');
                    socket.emit("new rental request", rent_request);
                    window.location = '/renting';
                }
                else if(res.data === 'Invalid date'){
                    alert('Invalid date');
                    window.location.reload();
                }
                else{
                    alert('You cannot book your own property');
                    window.location = '/renting';
                }
            })
    }
    return(
        
        <div class="bg-light">
            <NavbarHomepage />
            <br />
                
            <h1 class="display-6" style={{textAlign:"center"}}><b>Choose Duration</b></h1>
            <br />
                <br />

        
            <form>
                <div class="row align-items-center">

                <div class="col-lg-9">
                <h1><b>Start Date:</b></h1>
                <br/>
                <Calendar
                tileDisabled={tileDisabled}
                value={start_date}
                onClickDay={onChangeStartDate}
                
                    />

                    </div>
                {/* //show start date if clicked */}

                
                <br />
                <br />
                
                
                <div class="col-lg-3">
                <h1><b>End Date:</b></h1>
                <br/>
                <Calendar
                tileDisabled={tileDisabled}
                value={end_date}
                onClickDay={onChangeEndDate}
                    />

                </div>    
                </div>
                {/* //show end date if clicked */}
                
                <br />
                <br />
                <div style={{margin:"0 auto", textAlign:"center"}}>
                <button className="btn btn-primary" style={{width:"120px",height:"40px"}} onClick={handleSubmit}>Submit</button>
                </div>
            </form>
            <br/><br/><br/>
<Footer/> 
        </div>
        
    )
}

export default ChooseStayDuration;