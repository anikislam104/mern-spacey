import React from "react";
import NavbarHomepage from "../navbar_homepage";

const styleForButtons = {
    //simple styled buttons
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
    height: "30%",
    borderBottom: "1px solid black",
    paddingBottom: "10px",
    marginBottom: "10px",
    marginTop: "10px",
    marginLeft: "10px",
    justifyContent: "center",
};


const MyHostings = () => {
    return (
        <div>
            <NavbarHomepage />
            <div>
                <button className="btn btn-primary" style={styleForButtons} onClick={
                    () => {
                        window.location.href = "/current_hostings";
                    }
                }>Current Hostings</button>
            </div>
            <div>
                <button className="btn btn-primary" style={styleForButtons} onClick={
                    () => {
                        window.location.href = "/past_hostings";
                    }
                }>Past Hostings</button>
            </div>
        </div>
        )
}

export default MyHostings;