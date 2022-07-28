import React,{ Component } from "react";

export default class SelectedProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property:[],
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
    render() {
        
            return this.state.property.map((property) => {
                return (
                    <div>
                        <h1>Location: {property.location}</h1>
                        <h1>Size: {property.size}</h1>
                        <h1>Price: {property.pricePerDay}</h1>
                        <h1>Description: {property.description}</h1>
                    </div>
                )
            })
        
    }
}