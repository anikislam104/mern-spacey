import axios from 'axios';
import React, { Component } from 'react';

export default class Logout extends Component {
    componentDidMount(){
        const id={
            user_id: 0,
        }
        axios.post('http://localhost:5000/users/logout',id)
            .then(res => {
                window.location = '/';
            }
            )
    }
    render() {
        
        return (
            <div>
                <h1>Logout</h1>
            </div>
        )
    }
}