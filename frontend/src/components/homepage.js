import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
// import axios from 'axios';
import NavbarHomepage from "./navbar_homepage";
import Footer from './Footer';
var property_id = "";
var host_id = "";
var location = "";
var price = "";
var description = "";
var size = "";
const arr = [];
const parr = [];
const arr3= [];

const Homepage = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [personal_properties, setPersonalProperties] = useState([]);
  const [business_properties, setBusinessProperties] = useState([]);
  const [totalBusinessProperties, setTotalBusinessProperties] = useState(0);
  const [totalPersonalProperties, setTotalPersonalProperties] = useState(0);

  const { user } = ChatState();
  const toast = useToast();


  function getArrayElementsRec(total) {
    let first = -3;
    let second = -2;
    let third = -1;
    //let flag1=0;
    //let flag2=0;

    return arr3.map((item) => {
      first = first + 3;
      second = second + 3;
      third = third + 3;
      /*if(second>=arr.length || flag2===1){
            second=-1;
            flag2=1;
        }
        if(first>=arr.length || flag1===1){
            first=-1;
            flag1=1;
        }*/
      if (first < total && second < total && third < total) {
        return (
          <div class="row align-items-center">
            <div class="col-lg-2">
              {arr3[first]}
              {/* increment count */}
            </div>
            <div class="col-lg-2"></div>
            <div class="col-lg-2">{arr3[second]}</div>
            <div class="col-lg-2"></div>
            <div class="col-lg-2">{arr3[third]}</div>
          </div>
        );
      } else if (first < total && second < total) {
        return (
          <div class="row align-items-center">
            <div class="col-lg-2">
              {arr3[first]}
              {/* increment count */}
            </div>
            <div class="col-lg-2"></div>
            <div class="col-lg-2">{arr3[second]}</div>
            <div class="col-lg-2"></div>
          </div>
        );
      } else if (first < total) {
        return (
          <div class="row align-items-center">
            <div class="col-lg-2">
              {arr3[first]}
              {/* increment count */}
            </div>
          </div>
        );
      }
    });
  }

  function getArrayElements(total) {
    let first = -3;
    let second = -2;
    let third = -1;
    //let flag1=0;
    //let flag2=0;

    return arr.map((item) => {
      first = first + 3;
      second = second + 3;
      third = third + 3;
      /*if(second>=arr.length || flag2===1){
            second=-1;
            flag2=1;
        }
        if(first>=arr.length || flag1===1){
            first=-1;
            flag1=1;
        }*/
      if (first < total && second < total && third < total) {
        return (
          <div class="row align-items-center">
            <div class="col-lg-2">
              {arr[first]}
              {/* increment count */}
            </div>
            <div class="col-lg-2"></div>
            <div class="col-lg-2">{arr[second]}</div>
            <div class="col-lg-2"></div>
            <div class="col-lg-2">{arr[third]}</div>
          </div>
        );
      } else if (first < total && second < total) {
        return (
          <div class="row align-items-center">
            <div class="col-lg-2">
              {arr[first]}
              {/* increment count */}
            </div>
            <div class="col-lg-2"></div>
            <div class="col-lg-2">{arr[second]}</div>
            <div class="col-lg-2"></div>
          </div>
        );
      } else if (first < total) {
        return (
          <div class="row align-items-center">
            <div class="col-lg-2">
              {arr[first]}
              {/* increment count */}
            </div>
          </div>
        );
      }
    });
  }

  function getArrayElementsPer(total) {
    let first = -3;
    let second = -2;
    let third = -1;
    //let flag1=0;
    //let flag2=0;

    return arr.map((item) => {
      first = first + 3;
      second = second + 3;
      third = third + 3;
      /*if(second>=arr.length || flag2===1){
              second=-1;
              flag2=1;
          }
          if(first>=arr.length || flag1===1){
              first=-1;
              flag1=1;
          }*/
      if (first < total && second < total && third < total) {
        return (
          <div class="row align-items-center">
            <div class="col-lg-2">
              {parr[first]}
              {/* increment count */}
            </div>
            <div class="col-lg-2"></div>
            <div class="col-lg-2">{parr[second]}</div>
            <div class="col-lg-2"></div>
            <div class="col-lg-2">{parr[third]}</div>
          </div>
        );
      } else if (first < total && second < total) {
        return (
          <div class="row align-items-center">
            <div class="col-lg-2">
              {parr[first]}
              {/* increment count */}
            </div>
            <div class="col-lg-2"></div>
            <div class="col-lg-2">{parr[second]}</div>
            <div class="col-lg-2"></div>
          </div>
        );
      } else if (first < total) {
        return (
          <div class="row align-items-center">
            <div class="col-lg-2">
              {parr[first]}
              {/* increment count */}
            </div>
          </div>
        );
      }
    });
  }

  const myStyle2 = {
    blogSection: {
      width: "300px",
      height: "250px",
      textAlign: "center",
    },
    buttonSection: {
      margin: "0 auto",
    },
    textSection: {
      fontSize: "23px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.3)",
      width: "100%",
      height: "100%",
      color: "white",
    },
  };

  const getRecommendedProperties = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/property/get_rec",
        config
      );
      setRecommendedProperties(data);
      console.log(recommendedProperties);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    console.log("updated");
    const id = {
      user_id: localStorage.getItem("user_id"),
    };
    axios.post("http://localhost:5000/property/get_rec", id).then((res) => {
      setRecommendedProperties(res.data);
      console.log("useEffect");
      console.log(res.data);
    });
    axios
      .post("http://localhost:5000/property/get_personal_properties", id)
      .then((res) => {
        console.log(res.data);
        setPersonalProperties(res.data);
        setTotalPersonalProperties(res.data.length);
        console.log(res.data.length);

        axios
          .post("http://localhost:5000/property/get_business_properties", id)
          .then((res) => {
            console.log(res.data);
            setBusinessProperties(res.data);
            setTotalBusinessProperties(res.data.length);
          });
      });
  }, []);

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setSearchResult([]);
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/property?search=${search}`,
        config
      );
      setSearchResult(data);
      console.log(searchResult);
    } catch (error) {
      // toast({
      //   title: "Error Occured!",
      //   description: "Failed to Load the Search Results",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom-left",
      // });
    }
  };

  //set state of the selected property
  const setSelectedProperty = (property) => {
    console.log(property._id);
    // this.setState({
    //     property_id: property._id,
    //     host_id: property.hostId,
    //     location: property.location,
    //     size: property.size,
    //     price: property.pricePerDay,
    //     description: property.description,
    // });
    property_id = property._id;
    host_id = property.hostId;
    location = property.location;
    size = property.size;
    price = property.pricePerDay;
    description = property.description;
    console.log(property_id);
    localStorage.setItem("selected_property_id", property_id);
  };

  //send selected property id to the next page
  const sendSelectedProperty = () => {
    // e.preventDefault();
    const selected_property = {
      property_id: property_id,
      host_id: host_id,
      location: location,
      size: size,
      price: price,
      description: description,
    };
    // console.log("id "+id.property);
    axios
      .post(
        "http://localhost:5000/renting/selected_property",
        selected_property
      )
      .then((res) => {
        window.location = "/renting/selected_property";
      });
  };

  //show all properties  location
  const showProperties = (properties) => {
    return properties.map((property) => {
      return (
        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-body">
              <p className="card-text">{property.title}</p>
              <p className="card-text">{property.location}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => {
                      setSelectedProperty(property);
                      sendSelectedProperty();
                    }}
                  >
                    View
                  </button>
                </div>
                <small className="text-muted">{property.size} square ft</small>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const h1s={
    //bold big catchy font
    fontWeight: "bold",
    fontSize: "50px",
    fontFamily: "Catchy",
    //background color light blue
    backgroundColor: "rgba(0,0,255,0.3)",
    //text color
    color: "white",
  }

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
  };

  return (
    <div className="maincontainer bg-light">
      <NavbarHomepage />
      <br />
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-top p-3">
        <form className="container-fluid">
          <div class="input-group">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Location, Apartment, Host, etc."
              aria-label="Search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              onClick={handleSearch}
              className="btn btn-outline-success my-2 my-sm-0"
            >
              Search
            </button>
          </div>
        </form>
      </nav>
      <br />
      <div class="container-fluid">
        <div class="row no-gutter">
          <div class="col-md-12 bg-light">
            <div class="login d-flex align-items-center py-5">
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-lg-3"></div>
                  {searchResult.length === 0 ? (
                    <div class="col-lg-6">
                      <div class="card-body">
                        <h3 class="display-6">
                          <b>
                            &emsp;Welcome to &nbsp;
                            <font style={myStyle.nameSection}>
                              &nbsp;Spacey
                            </font>
                          </b>{" "}
                        </h3>
                      </div>
                    </div>
                  ) : (
                    showProperties(searchResult)
                  )}
                  <div class="col-lg-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* {showProperties(recommendedProperties)} */}
        <h1 style={h1s}>Recommended Properties</h1>
        <br />
        <br />
        <div >
          {/* loop through the personal properties and show them */}
          {recommendedProperties.map((property) => {
            var image = property.image;
            var path = process.env.PUBLIC_URL + "/images/" + image;

            arr3.push(
              <div className="col-md-4">
                <div
                  className="card mb-4 box-shadow"
                  style={{
                    width: "300px",
                    height: "250px",
                    textAlign: "center",
                    backgroundImage: `url(${path})`,
                  }}
                >
                  <div className="card-body" style={myStyle2.textSection}>
                    <br />
                    <br />
                    <p className="card-text">
                      <b>{property.title}</b>
                    </p>
                    <p className="card-text">
                      <b>{property.location}</b>
                    </p>
                    <font
                      className="text-muted"
                      style={{ fontSize: "18px", fontColor: "white" }}
                    >
                      <i>
                        &emsp;&emsp;&emsp;&emsp;&emsp; ({property.size} square
                        ft)
                      </i>
                    </font>
                    {/* <p className="card-text">{property.location}</p> */}
                    <div className="d-flex justify-content-between align-items-center">
                      <br /> <br /> <br /> <br />
                      <div className="btn-group" style={myStyle2.buttonSection}>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          style={{ color: "#808080", backgroundColor: "white" }}
                          onClick={() => {
                            localStorage.setItem(
                              "selected_property_id",
                              property._id
                            );
                            window.location.href = "/renting/selected_property";
                          }}
                        >
                          View
                        </button>
                      </div>
                      {/* <small className="text-muted">{property.size} square ft</small> */}
                    </div>
                  </div>
                </div>
              </div>
            );

            return <div></div>;
          })}
          {getArrayElementsRec(recommendedProperties.length)}
        </div>
        <br />
        <br />
        <button
          className="btn btn-primary"
          onClick={() => {
            document.getElementById("personal").style.display = "block";
            document.getElementById("business").style.display = "none";
          }}
        >
          Personal Property
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className="btn btn-primary"
          onClick={() => {
            document.getElementById("personal").style.display = "none";
            document.getElementById("business").style.display = "block";
          }}
        >
          Business Storage
        </button>
        <br />
        <br />
        <div id="personal" style={{ display: "block" }}>
          {/* loop through the personal properties and show them */}
          {personal_properties.map((property) => {
            // return (
            //   <div className="col-md-4">
            //   <div className="card mb-4 box-shadow">
            //     <div className="card-body">
            //       <p className="card-text">{property.title}</p>
            //       <p className="card-text">{property.location}</p>
            //       <div className="d-flex justify-content-between align-items-center">
            //         <div className="btn-group">
            //           <button
            //             type="button"
            //             className="btn btn-sm btn-outline-secondary"
            //             onClick={() => {
            //               setSelectedProperty(property);
            //               sendSelectedProperty();
            //             }}
            //           >
            //             View
            //           </button>
            //         </div>
            //         <small className="text-muted">{property.size} square ft</small>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            //   );
            var image = property.image;
            var path = process.env.PUBLIC_URL + "/images/" + image;

            parr.push(
              <div className="col-md-4">
                <div
                  className="card mb-4 box-shadow"
                  style={{
                    width: "300px",
                    height: "250px",
                    textAlign: "center",
                    backgroundImage: `url(${path})`,
                  }}
                >
                  <div className="card-body" style={myStyle2.textSection}>
                    <br />
                    <br />
                    <p className="card-text">
                      <b>{property.title}</b>
                    </p>
                    <p className="card-text">
                      <b>{property.location}</b>
                    </p>
                    <font
                      className="text-muted"
                      style={{ fontSize: "18px", fontColor: "white" }}
                    >
                      <i>
                        &emsp;&emsp;&emsp;&emsp;&emsp; ({property.size} square
                        ft)
                      </i>
                    </font>
                    {/* <p className="card-text">{property.location}</p> */}
                    <div className="d-flex justify-content-between align-items-center">
                      <br /> <br /> <br /> <br />
                      <div className="btn-group" style={myStyle2.buttonSection}>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          style={{ color: "#808080", backgroundColor: "white" }}
                          onClick={() => {
                            localStorage.setItem(
                              "selected_property_id",
                              property._id
                            );
                            window.location.href = "/renting/selected_property";
                          }}
                        >
                          View
                        </button>
                      </div>
                      {/* <small className="text-muted">{property.size} square ft</small> */}
                    </div>
                  </div>
                </div>
              </div>
            );

            return <div></div>;
          })}
          {getArrayElementsPer(totalPersonalProperties)}
        </div>
        <div id="business" style={{ display: "none" }}>
          {/* loop through the personal properties and show them */}
          {business_properties.map((property) => {
            var image = property.image;
            var path = process.env.PUBLIC_URL + "/images/" + image;

            arr.push(
              <div className="col-md-4">
                <div
                  className="card mb-4 box-shadow"
                  style={{
                    width: "300px",
                    height: "250px",
                    textAlign: "center",
                    backgroundImage: `url(${path})`,
                  }}
                >
                  <div className="card-body" style={myStyle2.textSection}>
                    <br />
                    <br />
                    <p className="card-text">
                      <b>{property.title}</b>
                    </p>
                    <p className="card-text">
                      <b>{property.location}</b>
                    </p>
                    <font
                      className="text-muted"
                      style={{ fontSize: "18px", fontColor: "white" }}
                    >
                      <i>
                        &emsp;&emsp;&emsp;&emsp;&emsp; ({property.size} square
                        ft)
                      </i>
                    </font>
                    {/* <p className="card-text">{property.location}</p> */}
                    <div className="d-flex justify-content-between align-items-center">
                      <br /> <br /> <br /> <br />
                      <div className="btn-group" style={myStyle2.buttonSection}>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          style={{ color: "#808080", backgroundColor: "white" }}
                          onClick={() => {
                            localStorage.setItem(
                              "selected_property_id",
                              property._id
                            );
                            window.location.href = "/renting/selected_property";
                          }}
                        >
                          View
                        </button>
                      </div>
                      {/* <small className="text-muted">{property.size} square ft</small> */}
                    </div>
                  </div>
                </div>
              </div>
            );

            return <div></div>;
          })}
          {getArrayElements(totalBusinessProperties)}
        </div>
      </div>
      <br/>
      
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<Footer/>
    </div>
  );
};
export default Homepage;
