import React, { Component } from 'react';
import spacey from "../Authentication/spacey.svg";
import { Link } from 'react-router-dom';
import NavbarHomepage from '../navbar_homepage';
import PersonalRoom from "./personal_room.svg";
import BusinessStorage from "./business_storage.svg";

export default class HostingOpeningPage extends Component {
  render() {

    const myStyle = {
      logoSection: {
        width: "60px",
        height: "60px",

      },
      picSection: {
        backgroundColor: "#4E4C87",
      },
      textSection: {
        color: "#E1E3EE",
      },
      nameSection: {
        color: "#0E2A53",
      },
      buttonSection: {
        padding: "10px 40px",
        fontSize: "20px",
        borderRadius: "10px",
        backgroundColor: "#395cf9",
        color: "white",
      },
      openingPicSection: {
        width: "300px",
        height: "300px",

      },
    }

    return (

      <div className="maincontainer">
        <NavbarHomepage />
        <br />

        <div class="container-fluid">
          <div class="row no-gutter">


            <div class="col-md-12 bg-light">
              <div class="login d-flex align-items-center py-5">

                <div class="container">
                  <div class="row align-items-center">

                    <div class="col-lg-3">

                    </div>

                    <div class="col-lg-6">
                      <div class="card-body">
                        <h3 class="display-6"><b>What kind of place will you host <br /> with &nbsp;
                          <img src={spacey} class="img-responsive" alt=" " style={myStyle.logoSection} />
                          <font style={myStyle.nameSection}>&nbsp;Spacey</font></b> ? </h3>
                      </div>


                    </div>

                    <div class="col-lg-3">

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row no-gutter">
            <div class="col-lg-1">

            </div>
            <div class="col-lg-5">
              <div class="image">
                <img src={PersonalRoom} class="img-responsive" alt=" " style={myStyle.openingPicSection} />
              </div>
              <label><h5>Host your personal space</h5></label><br />
              <div className="container">
                <br />
                &emsp;&emsp;
                <button style={myStyle.buttonSection}> <Link to={{
                  pathname: "/add-property",
                  state: { option: 'Personal Room' }
                }} className="navbar-brand" style={myStyle.optionSection} >Personal Room</Link>
                  <br /></button>
              </div>
            </div>

            <div class="col-lg-1">

            </div>
            <div class="col-lg-5">
              <div class="image">
                <img src={BusinessStorage} class="img-responsive" alt=" " style={myStyle.openingPicSection} />
              </div>
              <label><h5>Host your free storage</h5></label><br />
              <div className="container">
                <br />
                &emsp;&emsp;
                <button style={myStyle.buttonSection}> <Link to={{
                  pathname: "/add-business-storage",
                  state: { option: 'Business Storage' }
                }} className="navbar-brand" style={myStyle.optionSection} >Business Storage</Link>
                  <br /></button>

              </div>
            </div>
          </div>

        </div>

      </div>

    )
  }
}