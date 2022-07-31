import React, { Component } from 'react';
import axios from 'axios';
import NavbarHomepage from '../navbar_homepage';




// import { useHistory } from 'react-router-dom'
// import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


export default class AddBusinessStorage extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangePricePerDay = this.onChangePricePerDay.bind(this);
    this.onChangeFacility = this.onChangeFacility.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    ///this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);


    this.state = {
      host_id: '',
      title: '',
      location: '',
      description: '',
      size: '',
      pricePerDay: '',
      roomType: '',
      roomNo: '',
      rooms: [],
      facility: '',
      facilities: []
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

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
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


  onChangeFacility(e) {
    this.setState({
      facility: e.target.value
    })
  }


  handleClick2(e) {
    this.setState(prevState => ({
      facilities: [...prevState.facilities, this.state.facility]
    }))
    this.setState({
      facility: ''
    })
  }

  async onSubmit(e) {
    e.preventDefault();

    
    const property = {
      host_id: this.state.host_id,
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
      size: this.state.size,
      pricePerDay: this.state.pricePerDay,
      rooms: this.state.rooms,
      facilities: this.state.facilities
    }



    console.log(property);

    axios.post('http://localhost:5000/property/add', property)
      .then(res => {
        console.log(res.data);
        window.location = '/hosting';
      });
    

  }
  render() {



    

    const myStyle = {
      buttonSection: {
        padding: "10px 50px",
        fontSize: "20px",
        borderRadius: "10px",
        backgroundColor: "BlueViolet",
        color: "white",
      },

      inputSection: {
        padding: "10px 10px",
      },

      buttonSection2:{
        backgroundColor:"Sea Serpent",
        padding: "7px 10px",
        fontSize: "15px",
        color:"black",
      },
      descriptionSection:{
        width: "500px",
        height: "400px",
     },

    }



    return (

      <div className="maincontainer">
        <NavbarHomepage />
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
                          <label>Title: </label>
                          <input id="inputTitle" type="title" required="" autofocus="" value={this.state.title} onChange={this.onChangeTitle} class="form-control rounded-pill border-0 shadow-sm px-4" />
                        </div>
                        <div class="form-group sm-2">
                          <label>Location: </label>
                          <input id="inputLocation" type="location" required="" autofocus="" value={this.state.location} onChange={this.onChangeLocation} class="form-control rounded-pill border-0 shadow-sm px-4" />
                        </div>
                        <br />
                        <div class="form-group sm-2">
                          <label>Description: </label>
                          <textarea id="inputContent" type="text" placeholder="" required="" value={this.state.description} onChange={this.onChangeDescription} class="form-control  border-0 shadow-sm px-4 text-primary" style={myStyle.descriptionSection} />
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
                        

                        <div class="form-group sm-2">
                          <label>Facility </label>
                          <input id="inputFacility" type="facility" required="" value={this.state.facility} onChange={this.onChangeFacility} class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                          <br/>
                          <div>
                            <button type="button" onClick={this.handleClick2} style={myStyle.buttonSection2}>Add Facility</button>
                          </div>
                          <div>
                          
                          <ul>
                            {this.state.facilities.map(item => {
                              return <li>{item}</li>;
                            })}
                          </ul>
                          </div>
                          
                        </div>
                        <br />
                        <div className="form-group">
                          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                          <input type="submit" value="Post" className="btn btn-primary" style={myStyle.buttonSection} />
                        </div>

                      </form>
                    </div>

                    <div class="col-lg-1">

                    </div>

                    <div class="col-lg-5">
                      <br /><br /><br /><br /><br /><br/>
                      <h3 class="display-4">Let's host your <p>free space!</p></h3>
                      <br />
                      <p class="text-muted mb-4">Spacey makes hosting easier and safer!</p>
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