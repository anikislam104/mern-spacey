import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import spacey from "../components/Authentication/spacey.svg";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default class NavbarHomepage extends Component {

  constructor(props) {
    super(props);

    this.state = {
        user_name:'',
    }

  }

  componentDidMount() {
    fetch('http://localhost:5000/users/user_id')
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                user_name: localStorage.getItem('email'),
            });
  
        })
  }

  render() {
    const myStyle= {
      navSection:{
       backgroundColor: "#C2C6CC",
       color: "white",
       width:"1300px",
       height:"60px",
      },
      
      optionSection:{
        color: "#0E2A53",
       },

       textSection:{
        backgroundColor:"#484848",
        color:"white",
        width:"150px",
        height:"40px",
        textAlign:"center",
       },

    }

    return (
      <nav className="navbar navbar navbar-expand-lg" style={myStyle.navSection}>
         <div class="logo-image">
            <img src={spacey} class="img-responsive" alt=" " />
        </div>
        <Link to={"/homepage"} className="navbar-brand" style={myStyle.optionSection} ><h2>Spacey</h2></Link>
        <div class="col-lg-3">
   
        </div>
        <div class="col-lg-9">
         <div className="collpase navbar-collapse">
         <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            
          <Link to={'/rent_request_notifications'} className="nav-link"><h5>Rent Requests</h5></Link>
          </li>
          &nbsp; &nbsp; 
          <li className="navbar-item">
          <Link to={'/blog'} className="nav-link"><h5>Blog</h5></Link>
          </li>
          &nbsp; &nbsp; 
          <li className="navbar-item">
          <Link to={'/hosting'} className="nav-link rounded-pill" style={myStyle.textSection}><h6>Become A Host</h6></Link>
          </li>
          &nbsp; &nbsp;
          <li className="navbar-item">
          <Link to={'/renting'} className="nav-link rounded-pill" style={myStyle.textSection}><h6>Rent Storage</h6></Link>
          </li>
          &nbsp; &nbsp; 
          
          
          <Navbar>
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown title={this.state.user_name} id="basic-nav-dropdown">
                    <NavDropdown.Item href={'/payment/payment_notifications'}>Payment Notifications</NavDropdown.Item>
                    <NavDropdown.Item href={'/payment/payment_history'}>
                      Payment History
                    </NavDropdown.Item>
                    <NavDropdown.Item href={'/viewProfile'}>
                    View Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href={'/notification'}>
                    Notification
                    </NavDropdown.Item>
                    <NavDropdown.Item href={'/renting/my_bookings'}>
                    My Bookings
                    </NavDropdown.Item>
                    <NavDropdown.Item href={'extend_notification'}>
                    Extend booking requests
                    </NavDropdown.Item>
                    <NavDropdown.Item href={'/logout'}>
                    Log out
                    </NavDropdown.Item>
                    
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
  

         </ul>
         </div>
        </div>
      </nav>
    )

  }
}