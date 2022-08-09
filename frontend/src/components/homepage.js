import React, { Component } from 'react';
// import axios from 'axios';
import NavbarHomepage from './navbar_homepage';





export default class Homepage extends Component {
    constructor(props) {
        super(props);
        // this.showImage = this.showImage.bind(this);
        this.state = {
            user_id: 0,
            image:'',
            path: '',
        }
        
    }

    componentDidMount() {
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    user_id: localStorage.getItem('user_id'),
                    image: json.user_image,
                    path: './Images/' + json.user_image,
                });
                console.log(this.state.user_id);
                console.log(this.state.image);
                
                
            })
    }

    
    render() {
        
        
        return(
            
            <div><NavbarHomepage />
            <br />
            <h1 align="center">Welcome to Spacey</h1>
            <br />
            <br />
            
            </div>
        )
        
    }
}