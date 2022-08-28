import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import spacey from "../components/Authentication/spacey.svg";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./navbar.css"

const NavbarHomepage = () => {


  const [user_name, setUser_Name] = useState('');

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser_Name(userInfo.firstName);
  }, [user_name]);

    const myStyle= {
      navSection:{
       backgroundColor: "#C2C6CC",
       color: "white",
       width:"1300px",
       height:"90px",
      },
      
      optionSection:{
        color: "#0E2A53",
        fontSize:"30px",
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
      
      <nav className="navbar navbar navbar-expand-lg"  style={myStyle.navSection}>
        
            
            &nbsp;<img src={spacey} class="img-responsive" alt=" " />
            
          <Link to={"/homepage"} className="navbar-brand"  ><font style={myStyle.optionSection}><b> &nbsp;Spacey &nbsp;</b></font></Link>
         
         <ul className="navbar-nav mr-auto">
        
          <li className="navbar-item">
            &nbsp;
          <Link to={'/rent_request_notifications'} className="nav-link"><h5><b>Rent <br/>Requests &nbsp;</b></h5></Link>
          </li>
          
          <li className="navbar-item">
          &nbsp;
          <Link to={'/blog'} className="nav-link"><h5><b>Blog &nbsp;</b></h5></Link>
          </li>
          &nbsp;  
          <li className="navbar-item">
          &nbsp; &nbsp;
          <Link to={'/hosting'} className="nav-link rounded-pill" style={myStyle.textSection}><h6>Become A Host</h6></Link>
          </li>
          &nbsp;  &nbsp;
          <li className="navbar-item">
          &nbsp;
          <Link to={'/renting'} className="nav-link rounded-pill" style={myStyle.textSection}><h6>Rent Storage</h6></Link>
          </li>

          &nbsp; &nbsp; 

          <li className="navbar-item">
          &nbsp;
          <Link to={'/payment/payment_notifications'} className="nav-link"><h5><b>Payment <br/> Notifications &nbsp;</b></h5></Link>
          </li>

          &nbsp; 

          <li className="navbar-item">
          &nbsp;
          <Link to={'/notification'} className="nav-link"><h5><b>Notification &nbsp;</b></h5></Link>
          </li>

          &nbsp; 

          <li className="navbar-item">
          &nbsp;
          <Link to={'/extend_notification'} className="nav-link"><h5><b>Extend Booking <br/> Requests</b></h5></Link>
          </li>
          
          <Navbar>
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                
                <Nav className="me-auto">
                  <br/><br/><br/>
                  <NavDropdown title={user_name} style={{fontWeight:"bold"}} id="basic-nav-dropdown" className="nav-brand">
                    {/* <NavDropdown.Item href={'/payment/payment_history'}>
                      Payment History
                    </NavDropdown.Item> */}
                    <NavDropdown.Item href={'/viewProfile'}>
                    View Profile
                    </NavDropdown.Item>

                    {/* <NavDropdown.Item href={'/renting/my_bookings'}>
                    My Bookings
                    </NavDropdown.Item>

                    <NavDropdown.Item href={'/my_hostings'}>
                    My Hostings
                    </NavDropdown.Item> */}
                    <NavDropdown.Item href={'/chat'}>
                    Chat
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item href={'/view_complaints'}>
                    Complaints
                    </NavDropdown.Item> */}
                    <NavDropdown.Item href={'/logout'}>
                    Log out
                    </NavDropdown.Item>
                    
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
  

         </ul>
         
       
      </nav>
           
    )

  }
 export default NavbarHomepage;