import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { Component, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
// import axios from 'axios';
import NavbarHomepage from "./navbar_homepage";
var property_id = "";
var host_id = "";
var location = "";
var price = "";
var description = "";
var size = "";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { user } = ChatState();
  const toast = useToast();

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
  const showProperties = () => {
    return searchResult.map((property) => {
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
    <div className="maincontainer">
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
              style={myStyle.buttonSection}
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
                  {
                  searchResult.length === 0 ? (
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
                    showProperties()
                  )}

                  <div class="col-lg-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
