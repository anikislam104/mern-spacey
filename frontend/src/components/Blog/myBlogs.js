import React, { Component } from 'react';

export default class MyBlogs extends Component {
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
                <h1>My Blogs</h1>
            </div>
        )
    }
}