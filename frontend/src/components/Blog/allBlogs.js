// import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
// import { Link } from 'react-router-dom';



export default class AllBlogs extends Component {
    constructor(props) {
        super(props);
        this.getAllBlogs = this.getAllBlogs.bind(this);
        // this.sendContent = this.sendContent.bind(this);
        this.state = {
            blogs: [],
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

    // sendContent(id) {
    //     axios.post('http://localhost:5000/blogs/showBlog',id)
    //     .then(res => console.log(res.data));
    // }

    getAllBlogs(){
        return this.state.blogs.map(blog => {
            
            return (
                
                <div>
                    
                    <div>
                        <br />
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <br />
                        <br />
                    </div>
                </div>
                
                
            )
        }
        )
    }

    render() {
        return(
            <div>
                {/* {allBlogs} */}
                <NavbarHomepage />
                <br/ >
                {this.getAllBlogs()}
            </div>
        )
    }
    
}