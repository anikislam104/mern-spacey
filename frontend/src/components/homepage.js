import React, { Component } from 'react';
// import axios from 'axios';
var user_id = fetch('http://localhost:5000/users/user_id').then(res => res.json()).then(data => {
    user_id = data.user_id;
});;

export default class Homepage extends Component {
    

    render() {
        
        return(
            <h1>User ID: {user_id}</h1>
        )
    }
}