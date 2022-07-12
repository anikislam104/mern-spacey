import React, { Component } from 'react';
// import axios from 'axios';
import NavbarHomepage from '../navbar_homepage';


export default class BlogHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 0,
        }
        
    }

    componentDidMount() {
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    user_id: json.user_id,
                });
            })
    }

    
    render() {
        
        return(
            
            <div>
                <NavbarHomepage />
                {this.state.user_id}
                
            </div>
        )
    }
}