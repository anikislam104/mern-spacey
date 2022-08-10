import axios from "axios";
import React,{ Component } from "react";
var property_id= '';
var host_id= '';
var location='';
var price='';
var description='';
var size='';

export default class RentingHome extends Component {
    
    constructor(props) {
        super(props);

        this.sendSelectedProperty = this.sendSelectedProperty.bind(this);
        this.showProperties = this.showProperties.bind(this);
        this.setSelectedProperty = this.setSelectedProperty.bind(this);
        this.state = {
            properties: [],
            
        }
        
    }
    //get all properties from the database
    componentDidMount(){
        fetch('http://localhost:5000/property/all_properties')
            .then((res) => res.json())
            .then((json) => {
                //console.log(JSON.stringify(json));
                this.setState({
                    properties: this.state.properties.concat(json),
                });
                console.log(this.state.properties);
            })
    }

    //set state of the selected property
    setSelectedProperty(property){
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
        localStorage.setItem('selected_property_id', property_id);
        
    }

    //send selected property id to the next page
    sendSelectedProperty(){
        
        // e.preventDefault();
        const selected_property = {
            property_id: property_id,
            host_id: host_id,
            location: location,
            size: size,
            price: price,
            description: description,
        }
        // console.log("id "+id.property);
        axios.post('http://localhost:5000/renting/selected_property',selected_property)
            .then(res => {
                window.location = '/renting/selected_property';
            });

        
    }


    //show all properties  location
    showProperties(){
        return this.state.properties.map((property) => {
            return(
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <div className="card-body">
                        <p className="card-text">{property.title}</p>
                            <p className="card-text">{property.location}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={
                                        () => {
                                            this.setSelectedProperty(property);
                                            this.sendSelectedProperty();
                                        }
                                    }>View</button>

                                </div>
                                <small className="text-muted">{property.size} square ft</small>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    }

    render() {
        return (
            <div className="maincontainer">
                       {this.showProperties()}
            </div>
        );
    }
}