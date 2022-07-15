import React, { Component } from 'react';

export default class MyBlogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 0,
        }
        
    }

    componentDidMount() {
        fetch('http://localhost:5000/blogs/all_blogs')
            .then((res) => res.json())
            .then((json) => {
                console.log(JSON.stringify(json));
                this.setState({
                    blogs: this.state.blogs.concat(json),
                });
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
                <h1>My Blogs</h1>
            </div>
        )
    }
}