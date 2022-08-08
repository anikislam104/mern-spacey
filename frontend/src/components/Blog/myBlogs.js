import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';

export default class MyBlogs extends Component {
    constructor(props) {
        super(props);
        this.sendSelectedBlog = this.sendSelectedBlog.bind(this);
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
                    user_id: localStorage.getItem('user_id'),
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

    sendSelectedBlog(blog_id) {
        const id={
            blog_id:blog_id,
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
    
    getMyBlogs(){
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
                <NavbarHomepage />
                <br />
                {this.getMyBlogs()}
            </div>
        )
    }
}