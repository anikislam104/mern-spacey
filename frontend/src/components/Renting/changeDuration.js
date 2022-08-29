import React from "react";
import axios from "axios";
import NavbarHomepage from "../navbar_homepage";
import Footer from '../Footer';
import { differenceInCalendarDays } from "date-fns";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useEffect } from "react";
import io from 'socket.io-client';
import { ChatState } from "../../Context/ChatProvider";

const ENDPOINT = "http://localhost:5000";
var socket;

const ChangeDuration = () => {
    
    const [end_date, setEndDate] = React.useState('');
    const [allBookedDates, setAllBookedDates] = React.useState([]);
    const [socketConnected, setSocketConnected] = React.useState(false);
    const {user, selectedChat, setSelectedChat, notification1, setNotification1} = ChatState();
    
    useEffect(() => {
        
        //get all booked dates

        // const property_id = localStorage.getItem('change_duration_property_id');

        axios.post('http://localhost:5000/renting/get_booked_dates',{property_id: localStorage.getItem('change_duration_property_id')})
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
    
    

    const onChangeEndDate = (date) => {
        setEndDate(date);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const rent_request = {
            booking_id: localStorage.getItem('change_booking_id'),
            end_date: end_date,
        }

        
        
        console.log(rent_request);
        axios.post('http://localhost:5000/renting/send_change_duration_request', rent_request)
            .then(res => {
                console.log(res.data);
                if(res.data === 'ok'){
                    alert('Extend duration request sent successfully');
                    socket.emit("new extend request", rent_request);
                    // window.location = '/current_bookings';
                }
                else{
                    alert(res.data);
                }
                
            })
    }
    return(
        <div class="bg-light">
            <NavbarHomepage />
            <br/>
            <br/>
            <br/>
            <div>
            <h1><b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            &emsp;&emsp;&emsp;&emsp;&emsp;
                Select new end date:</b></h1>
            <br />
                <br />
                <div class="row align-items-center">
                <div class="col-lg-4">
                    </div>
                  
                                    <div class="col-lg-4">
            <form>
                
                <Calendar
                tileDisabled={tileDisabled}
                value={end_date}
                onClickDay={onChangeEndDate}
                    />
                
                {/* //show end date if clicked */}
                
                <br />
                <br />
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
            </div>
            </div>
            
            </div>
            <br/><br/><br/>
<Footer/>
        </div>
    )
}

export default ChangeDuration;