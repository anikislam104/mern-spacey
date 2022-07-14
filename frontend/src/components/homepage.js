import React, { Component } from 'react';
// import axios from 'axios';
import NavbarHomepage from './navbar_homepage';


export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 0,
            image:'',
        }
        
    }

    componentDidMount() {
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    user_id: json.user_id,
                    image: json.user_image,
                });
            })
    }

    render() {
        const { user_id } = this.state;
        return(
            
            <div><NavbarHomepage />{user_id}
            <br />
            <img src={this.state.image} alt="user_image" />
            </div>
        )
    }
}