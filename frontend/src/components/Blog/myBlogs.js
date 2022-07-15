import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';

export default class MyBlogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 0,
            blogs: [],
        }
        
    }

    componentDidMount() {
        // fetch('http://localhost:5000/blogs/my_blogs')
        //     .then((res) => res.json())
        //     .then((json) => {
        //         //console.log(JSON.stringify(json));
        //         this.setState({
        //             blogs: this.state.blogs.concat(json),
        //         });
        //     })
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                //console.log(JSON.stringify(json));
                console.log(json.user_id);
                this.setState({
                    user_id: json.user_id,
                });
                console.log(this.state.user_id);
                const id={
                    user_id: this.state.user_id,
                }
                console.log(id.user_id);
                axios.post('http://localhost:5000/blogs/my_blogs',id) 
                    .then(res => {
                        console.log(res.data);
                        this.setState({
                            blogs: res.data,
                        });
                    })
            })
            
    }

    getMyBlogs(){
        return this.state.blogs.map(blog => {
            return (
                <div>
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                    <br />
                    <br />
                </div>
            )
        }
        )
    }


    render() {
        return(
            <div>
                <NavbarHomepage />
                <br />
                {this.getMyBlogs()}
            </div>
        )
    }
}