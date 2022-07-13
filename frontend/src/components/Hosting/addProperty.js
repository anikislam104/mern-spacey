import React, { Component } from 'react';
import axios from 'axios';
import Navbar from "./hostingNavbar"

// import { useHistory } from 'react-router-dom'
// import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


export default class AddProperty extends Component {
  constructor(props) {
    super(props);

    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangePricePerDay = this.onChangePricePerDay.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      host_id: 0,
      location: '',
      description: '',
      size: 0,
      pricePerDay: 0,
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/users/user_id')
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                host_id: json.user_id,
            });
        })
}

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeSize(e) {
    this.setState({
      size: e.target.value
    })
  }

  onChangePricePerDay(e) {
    this.setState({
      pricePerDay: e.target.value
    })
  }

  async onSubmit(e) {
    e.preventDefault();
    

    const property = {
      host_id: this.state.host_id,
      location: this.state.location,
      description: this.state.description,
      size: this.state.size,
      pricePerDay: this.state.pricePerDay,
    }

    console.log(property);

    axios.post('http://localhost:5000/property/add', property)
      .then(res => {
        console.log(res.data);
        if (res.data === 'invalid') {
          window.location = '/invalidAuth';
        }
        else {
          window.location = '/signup_otp';
        }
      });
  }
  render() {

    const myStyle = {
      buttonSection: {
        padding: "10px 40px",
        fontSize: "20px",
        borderRadius: "10px",
        backgroundColor: "BlueViolet",
        color: "white",
      },

      inputSection: {
        padding: "10px 10px",
      }

    }
    return (

      <div className="maincontainer">
        <Navbar />
        <br />
        <div class="container-fluid">
          <div class="row no-gutter">


            <div class="col-md-12 bg-light">
              <div class="login d-flex align-items-start py-5">

                <div class="container">
                  <div class="row align-items-start">

                    <div class="col-lg-1">

                    </div>

                    <div class="col-lg-5">
                      <form onSubmit={this.onSubmit}>
                        <div class="form-group sm-2">
                          <label>Location: </label>
                          <input id="inputLocation" type="location" required="" autofocus="" value={this.state.location} onChange={this.onChangeLocation} class="form-control rounded-pill border-0 shadow-sm px-4" />
                        </div>
                        <br />
                        <div class="form-group sm-2">
                          <label>Description: </label>
                          <input id="inputDescription" type="description" required="" autofocus="" value={this.state.description} onChange={this.onChangeDescription} class="form-control rounded-pill border-0 shadow-sm px-4" />
                        </div>
                        <br />
                        <div class="form-group sm-2">
                          <label>Size: </label>
                          <input id="inputSize" type="size" required="" autofocus="" value={this.state.size} onChange={this.onChangeSize} class="form-control rounded-pill border-0 shadow-sm px-4" />
                        </div>
                        <br />
                        <div class="form-group sm-2">
                          <label>Price Per Day: </label>
                          <input id="inputPricePerDay" type="pricePerDay" required="" value={this.state.pricePerDay} onChange={this.onChangePricePerDay} class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                        </div>
                        <br />
                        <br />
                        <div className="form-group">
                          <input type="submit" value="Post" className="btn btn-primary" style={myStyle.buttonSection} />
                        </div>

                      </form>
                    </div>

                    <div class="col-lg-1">

                    </div>

                    <div class="col-lg-5">
                      <br /><br /><br /><br /><br />
                      <h3 class="display-4">Let's share & rent together!</h3>
                      <br />
                      <p class="text-muted mb-4">Create your Spacey account!</p>
                      <br />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}