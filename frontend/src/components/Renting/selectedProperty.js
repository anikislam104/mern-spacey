import axios from "axios";
import React,{ Component } from "react";

export default class SelectedProperty extends Component {
    constructor(props) {
        super(props);
        this.getUsername = this.getUsername.bind(this);
        this.sendRentalRequest = this.sendRentalRequest.bind(this);
        this.state = {
            property:[],
            host_name:'',
            renter_name:''
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
                fetch('http://localhost:5000/users/user_id')
                    .then((res2) => res2.json())
                    .then((json2) => {
                        var id=json2.user_id;
                        const renter_id={
                            user_id: id,
                        }
                        axios.post('http://localhost:5000/users/get_user_name',renter_id)
                            .then(res3 => {
                                console.log(res3.data);
                                this.setState({
                                    renter_name: res3.data,
                                });
                            })
                    })

            })
        
        }
    //get username of host
    getUsername(host_id){
        const id={
            user_id: host_id,
        }
        axios.post('http://localhost:5000/users/get_user_name',id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    host_name: res.data,
                });
            })
    }

    //send rental request to the server
    sendRentalRequest(property){
        var property_id = property._id;
        var host_id = property.hostId;
        var date = new Date();
        var renter_id = '';
        //fetch user id
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                console.log(JSON.stringify(json));
                renter_id = json.user_id;
                const rent_request = {
                    host_id: host_id,
                    renter_id: renter_id,
                    renter_name: this.state.renter_name,
                    property_id: property_id,
                    date: date
                }
                console.log(rent_request);
                axios.post('http://localhost:5000/renting/send_rental_request', rent_request)
                    .then(res => {
                        console.log(res.data);
                        if(res.data === 'ok'){
                            window.location.href = '/renting';
                        }
                    })
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
                        <button onClick={
                            () => {
                                this.sendRentalRequest(property);
                            }
                        }>Book</button>
                    </div>
                )
            })
        
    }
}