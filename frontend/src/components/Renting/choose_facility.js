import React, { useEffect } from "react";
// import axios from "axios";

const ChooseStayDuration=()=>{
    
    
    return(
        <div>
            <h1>Choose Facility</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Start Date</label>
                    {/* min=today's date */}

                    <input type="date" className="form-control" id="exampleFormControlSelect1"  />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">End Date</label>
                    <input type="date" className="form-control" id="exampleFormControlSelect1" />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default ChooseStayDuration;