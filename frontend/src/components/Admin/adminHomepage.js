import React from "react";
import AdminNavbar from "./adminNavbar";

const myStyle= {
    buttonSection:{
     padding: "10px 40px",
     fontSize: "20px",
     borderRadius: "10px",
     backgroundColor: "#395cf9",
     color: "white",
    },
    openingPicSection:{
        width:"300px",
        height:"300px",
        
    },

  }

const AdminHomepage = () => {
    return (
        <div class="bg-light">
        <AdminNavbar />
        <br/>
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
                <h3 class="display-6"><b>&emsp;Welcome to 
                  
                  <font style={myStyle.nameSection}>&nbsp;Spacey!</font></b>
                  
                  </h3>
                  <br/>
                  
                                    
                  
              </div>


            </div>

            <div class="col-lg-3">

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
    );
}

export default AdminHomepage;