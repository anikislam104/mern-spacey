import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';



export default class MyBlogs extends Component {
    constructor(props) {
        super(props);
        this.sendSelectedBlog = this.sendSelectedBlog.bind(this);
        this.state = {
            user_id: '',
            blogs: [],
        }
        
    }

    componentDidMount() {
        
        this.setState({
            user_id: localStorage.getItem('user_id'),
        });
        const id={
            user_id:localStorage.getItem('user_id'),
        }
        console.log(id);
        axios.post('http://localhost:5000/blogs/my_blogs',id) 
            .then(res => {
                console.log(res.data);
                    this.setState({
                        blogs: res.data,
                    });
                })
            
            
    }

    

    sendSelectedBlog(blog_id) {
        const id={
            blog_id:blog_id,
            user_id:localStorage.getItem('user_id'),
        }

        axios.post('http://localhost:5000/blogs/showBlog',id)
            .then(res => 
                {
                    console.log(res.data);
                    localStorage.setItem('blog_id', res.data._id);
                    window.location.href = '/blog/showMyBlog';
                    // this.props.history.push('/blog/'+res.data._id);
                });
    }

    GetRandomNumber (min_num, max_num){
        return Math.floor(Math.random()* (max_num - min_num) + min_num);
    }
    
    getMyBlogs(){
        return this.state.blogs.map((blog) => {
            return(
                <div className="col-md-4 bg-light" >
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
                <NavbarHomepage />
                <br />
                {this.getMyBlogs()}
            </div>
        )
    }
}