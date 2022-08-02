import React, { Component } from 'react';
import axios from 'axios';
// const blog_id=Request.QueryString["data"];
export default class ShowBlog extends Component {
    constructor(props) {
        super(props);
        this.comment = this.comment.bind(this);
        // this.showSelectedBlog = this.showSelectedBlog.bind(this);
        this.state = {
            blog: [],
            user_id: '',
            Comments: "",
        }
    }
    componentDidMount() {
        fetch('http://localhost:5000/blogs/get_selected_blog')
            .then((res) => res.json())
            .then((json) => {
                console.log(JSON.stringify(json));
                this.setState({
                    blog: this.state.blog.concat(json),
                });
                fetch('http://localhost:5000/users/user_id')
                    .then((res) => res.json())
                    .then((json) => {
                        //console.log(JSON.stringify(json));
                        this.setState({
                            user_id: json.user_id,
                        });
                    })
            })
    }

    comment(e){
        this.setState({
            Comments: e.target.value,
        });
    }

    

    render() {
        return this.state.blog.map((blog) => {
            return(
                <div>
                    <h1>{blog.title}</h1>
                    <p>{blog.content}</p>
                    <br />
                    <br />
                {/* button for upvote */}
                <button type='submit' onClick={
                    () => {
                        const upvote = {
                            blog_id: blog._id,
                            user_id: this.state.user_id,
                            upvote: 1,
                        }
                        axios.post('http://localhost:5000/blogs/upvote', upvote)
                            .then(res => {
                                console.log(res.data);
                            }).catch(err => {
                                console.log(err);
                            }
                        )
                        
                        
                    }
                } >Upvote</button>{blog.like_count}
                <br />
                <br />
                <button type='submit' onClick={
                    () => {
                        const downvote = {
                            blog_id: blog._id,
                            user_id: this.state.user_id,
                            
                        }
                        axios.post('http://localhost:5000/blogs/downvote', downvote)
                            .then(res => {
                                console.log(res.data);
                            }).catch(err => {
                                console.log(err);
                            }
                        )
                        this.disabled=true;
                        
                        
                    }
                } >Downvote</button>{blog.dislike_count}

{/* // comments */}

<br />
<br />
                <input type='text' onChange={this.comment} value={this.state.Comments}></input>
                <button type='submit' onClick={
                    () => {
                        const comment = {
                            blog_id: blog._id,
                            user_id: this.state.user_id,
                            comment: this.state.Comments,
                        }
                        axios.post('http://localhost:5000/blogs/comment', comment)
                            .then(res => {
                                console.log(res.data);
                            }).catch(err => {
                                console.log(err);
                            }
                        )
                        
                        
                    }
                } >Comment</button>
                
                {blog.comments.map((comment) => {
                    return(
                        <div>
                            <p>{comment.comment}</p>
                        </div>
                    )
                })}
                <br />
<br />

                </div>

                
               
            )
        }
        )
    }
}