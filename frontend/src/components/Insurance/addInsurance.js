import React, { Component } from 'react';
import axios from 'axios';
import NavbarHomepage from '../navbar_homepage';




// import { useHistory } from 'react-router-dom'
// import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


export default class AddInsurance extends Component {
    constructor(props) {
        super(props);

        this.onChangePolicy = this.onChangePolicy.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            adder_id: '',
            policy: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    adder_id: json.user_id,
                });
            })
    }

    onChangePolicy(e) {
        this.setState({
            policy: e.target.value
        })
    }

    async onSubmit(e) {
        e.preventDefault();


        const insurance = {
            adder_id: localStorage.getItem("user_id"),
            policy: this.state.policy
        }



        console.log(insurance);

        axios.post('http://localhost:5000/insurance/add', insurance)
            .then(res => {
                console.log(res.data);
                window.location = '/adminHomepage';
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

            buttonSection2: {
                backgroundColor: "Sea Serpent",
                padding: "7px 10px",
                fontSize: "15px",
                color: "black",
            },
            descriptionSection: {
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
                                                    <label>Policy: </label>
                                                    <textarea id="inputPolicy" type="text" placeholder="" required="" value={this.state.Policy} onChange={this.onChangePolicy} class="form-control  border-0 shadow-sm px-4 text-primary" style={myStyle.descriptionSection} />
                                                </div>
                                                <br />
                                                <div className="form-group">
                                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                                    <input type="submit" value="Post" className="btn btn-primary" style={myStyle.buttonSection} />
                                                </div>

                                            </form>
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