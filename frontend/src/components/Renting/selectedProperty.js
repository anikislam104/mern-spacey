import axios from "axios";
import React,{ Component } from "react";

export default class SelectedProperty extends Component {
    constructor(props) {
        super(props);
        this.getUsername = this.getUsername.bind(this);
        this.state = {
            property:[],
            host_name:''
        }
    }
    componentDidMount() {
        fetch('http://localhost:5000/renting/get_selected_property')
            .then((res) => res.json())
            .then((json) => {
                console.log(JSON.stringify(json));
                this.setState({
                    property: this.state.property.concat(json),
                });
            })
        
        }
    //get username of host
    getUsername(host_id){
        axios.post('http://localhost:5000/users/get_user_name',{host_id:host_id})
            .then(res => {
                console.log(res.data);
                this.setState({
                    host_name: res.data,
                });
            })
    }

    render() {
        
            return this.state.property.map((property) => {
                return (
                    <div>
                        <h1>Location: {property.location}</h1>
                        <h1>Size: {property.size}</h1>
                        <h1>Price: {property.pricePerDay}</h1>
                        <h1>Description: {property.description}</h1>
                        {this.getUsername(property.hostId)}
                        <h1>Host: {this.state.host_name}</h1>
                        <button>Book</button>
                    </div>
                )
            })
        
    }
}