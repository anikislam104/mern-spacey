import React, { Component } from 'react';
import axios from 'axios';
import NavbarHomepage from '../navbar_homepage';

// import { useHistory } from 'react-router-dom'
// import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

let value=0;

export default class AddBusinessStorage extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangePricePerDay = this.onChangePricePerDay.bind(this);
    this.onChangeRoomType = this.onChangeRoomType.bind(this);
    this.onChangeRoomNo = this.onChangeRoomNo.bind(this);
    this.onChangeFacility = this.onChangeFacility.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);

    this.onChangeIncrement = this.onChangeIncrement.bind(this);
    this.onChangeDecrement = this.onChangeDecrement.bind(this);


    this.state = {
      host_id: '',
      title: '',
      location: '',
      description: '',
      size: '',
      pricePerDay: '',
      roomType: '',
      roomNo: '0',
      rooms: [],
      facility: '',
      facilities: [],
      image: null,
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

  onChangeRoomType(e) {

    this.setState({
      roomType: e.target.value
    })
  }

  onChangeRoomNo(e) {
    this.setState({
      roomNo: e.target.value
    })
  }

  onChangeIncrement(e){
    e.preventDefault();
    value++;
    this.setState({
      roomNo: value
    })
  }

  onChangeDecrement(e){
    e.preventDefault();
    if(value<=0) alert("Room no cannot be less than 0");
    else{
      value--;
      this.setState({
        roomNo: value
      })
    }
  }

  onChangeFacility(e) {
    this.setState({
      facility: e.target.value
    })
  }

  onChangeImage(e) {
    console.log(e.target.files[0]);
    this.setState({
        image: e.target.files[0]
        })
    }



  handleClick1(e) {
    this.setState(prevState => ({
      rooms: [...prevState.rooms, [this.state.roomType, this.state.roomNo]]
    }))
    this.setState({
      roomType: ''
    })
    this.setState({
      roomNo: 0
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


    // const property = {
    //   host_id: localStorage.getItem('user_id'),
    //   title: this.state.title,
    //   location: this.state.location,
    //   description: this.state.description,
    //   size: this.state.size,
    //   pricePerDay: this.state.pricePerDay,
    //   rooms: this.state.rooms,
    //   facilities: this.state.facilities
    // }

    const formData = new FormData();
    formData.append('image', this.state.image);
    formData.append('host_id', localStorage.getItem('user_id'));
    formData.append('title', this.state.title);
    formData.append('location', this.state.location);
    formData.append('description', this.state.description);
    formData.append('size', this.state.size);
    formData.append('pricePerDay', this.state.pricePerDay);
    formData.append('rooms', this.state.rooms);
    formData.append('facilities', this.state.facilities);



    // console.log(property);

    axios.post('http://localhost:5000/property/add', formData)
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

      buttonSection2: {
        backgroundColor: "BlueViolet",
        padding: "7px 10px",
        fontSize: "15px",
        color: "black",
      },
      descriptionSection: {
        width: "500px",
        height: "400px",
      },
      inputSection: {
        width: "300px",
        height: "40px",
      },
      nameSection:{
        color:"#0E2A53",
        fontSize:"50px",
      },
      inputSection2: {
        width: "100px",
        height: "40px",
      },
      buttonSection3: {
        backgroundColor: "#b9f2ff",
        padding: "5px 15px",
        fontSize: "25px",
        color: "black",
      },
    }



    return (

      <div className="maincontainer bg-light">
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
            <h3 class="display-6"><b>&emsp;Business Storage Hosting </b> </h3>                                
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


            <div class="col-md-12 bg-light">
              <div class="login d-flex align-items-start py-5">

                <div class="container">
                  <div class="row align-items-start">

                    <div class="col-lg-1">

                    </div>

                    <div class="col-lg-5">
                      <form onSubmit={this.onSubmit} encType="multipart/form-data">
                        <div class="form-group sm-2">
                          <label><b>Title: </b></label><br/>
                          <input id="inputTitle" type="title" required="" autofocus="" value={this.state.title} onChange={this.onChangeTitle} class="form-control rounded-pill border-0 shadow-sm px-4" />
                        <br/>
                        </div>
                        <div class="form-group sm-2">
                          <label><b>Location: </b></label><br/>
                          <input id="inputLocation" type="location" required="" autofocus="" value={this.state.location} onChange={this.onChangeLocation} class="form-control rounded-pill border-0 shadow-sm px-4" />
                        </div>
                        <br />
                        <div class="form-group sm-2">
                          <label><b>Description:</b> </label><br/>
                          <textarea id="inputContent" type="text" placeholder="" required="" value={this.state.description} onChange={this.onChangeDescription} class="form-control  border-0 shadow-sm px-4 text-primary" style={myStyle.descriptionSection} />
                        </div>
                        <br />
                        <div class="form-group sm-2">
                          <label><b>Size: </b></label><br/>
                          <input id="inputSize" type="size" required="" autofocus="" value={this.state.size} onChange={this.onChangeSize} class="form-control rounded-pill border-0 shadow-sm px-4" />
                        </div>
                        <br />
                        <div class="form-group sm-2">
                          <label><b>Price Per Day: </b></label><br/>
                          <input id="inputPricePerDay" type="pricePerDay" required="" value={this.state.pricePerDay} onChange={this.onChangePricePerDay} class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                        </div>
                        <br/>
                        <div class="form-group sm-2">
                          <label><b>Room Type </b></label><br/>
                          <input id="inputRoomType" type="roomType" required="" style={{width: "350px", height: "35px",}} value={this.state.roomType} onChange={this.onChangeRoomType} class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                          <br/>
                        </div>
                        
                        <div class="row align-items-center">  
                          <div class="col-lg-9">
                              <div class="row">
                                    <div class="col-lg-3"><button type="button" class="rounded-pill px-3" onClick={this.onChangeIncrement} style={myStyle.buttonSection3}>+</button></div>
                                    <div class="col-lg-4"><input id="inputRoomNo" type="roomNo" required="" style={myStyle.inputSection2} value={this.state.roomNo} class="form-control" /></div>
                                    <div class="col-lg-3"><button type="button" class="rounded-pill px-3" onClick={this.onChangeDecrement} style={myStyle.buttonSection3}>-</button></div>
                               </div>
                          </div>
                          <br/>
                          <div class="col-lg-3">
                            <br />
                            <button type="button" onClick={this.handleClick1} style={myStyle.buttonSection2}>Add Room</button>
                          </div>
                        </div> 
                          
                          <div>
                            <ul>
                              {this.state.rooms.map(item => {
                                return <li>{item[0]} {item[1]}</li>;
                              })}
                            </ul>
                          </div>
                        

                        
                        <br/>
                          <div class="row align-items-center">
                             <div class="col-lg-9">
                                <label><b>Facility </b></label><br/>
                                <input id="inputFacility" type="facility" required="" style={myStyle.inputSection} value={this.state.facility} onChange={this.onChangeFacility} class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                             </div>
                            
                             <div class="col-lg-3">
                             <br/>
                                <button type="button" onClick={this.handleClick2} style={myStyle.buttonSection2}>Add Facility</button>
                             </div>
                          </div>

                          <div>
                            <br/>
                            <ul>
                              
                              {this.state.facilities.map(item => {
                                return <li>{item}</li>;
                              })}
                            </ul>
                          </div>

                        


                        <br />
                        <div class="form-group sm-3">
                                <label><b>Room Picture: </b></label>
                                <br/><br/>
                                                  <div class="custom-file sm-3">
                                                    <input type="file" filename="image" class="custom-file-input form-control  border-0 shadow-sm px-4" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={this.onChangeImage} />
                                                  </div>
                                               </div>
                                               <br />
                                               <br />
                        <div className="form-group">
                          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                          <input type="submit" value="Post" className="btn btn-primary" style={myStyle.buttonSection} />
                        </div>

                      </form>
                    </div>

                    <div class="col-lg-1">

                    </div>

                    <div class="col-lg-5 bg-light">
                      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                      <br /><br /><br />
                      
                      <div>
                      <h3 class="display-4">Let's host <br/> your free <br/> space with <br/> 
                          
                          <b style={myStyle.nameSection}><i>Spacey </i></b></h3>
              
                          </div>
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