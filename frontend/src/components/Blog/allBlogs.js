// import axios from 'axios';
import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
// import { Link } from 'react-router-dom';



export default class AllBlogs extends Component {
    constructor(props) {
        super(props);
        this.getAllBlogs = this.getAllBlogs.bind(this);
        this.sendSelectedBlog = this.sendSelectedBlog.bind(this);
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
    sendSelectedBlog(blog_id) {
        const id={
            blog_id:blog_id,
            user_id:localStorage.getItem('user_id'),
        }

        axios.post('http://localhost:5000/blogs/showBlog',id)
            .then(res => 
                {
                    console.log(res.data);
                    window.location.href = '/blog/showBlog';
                    // this.props.history.push('/blog/'+res.data._id);
                });
    }
    GetRandomNumber (min_num, max_num){
        return Math.floor(Math.random()* (max_num - min_num) + min_num);
    }

    getAllBlogs(){
        return this.state.blogs.map((blog) => {
            return(
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <div className="card-body">
                        <p className="card-text">{blog.title}</p>
                            {/* <p className="card-text">{property.location}</p> */}
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={
                                        () => {
                                            this.sendSelectedBlog(blog._id);
                                        }
                                    }>View</button>

                                </div>
                                {/* <small className="text-muted">{property.size} square ft</small> */}
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    }

    render() {
        return(
            <div class="col-lg-12 bg-light">
                {/* {allBlogs} */}
                <NavbarHomepage />
                <br/ >
                {this.getAllBlogs()}
            </div>
        )
    }
    
}