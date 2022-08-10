import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// const blog_id=Request.QueryString["data"];
var comments=[];
var like=0;
var dislike=0;
export default class ShowMyBlog extends Component {
    constructor(props) {
        super(props);
        this.showComments = this.showComments.bind(this);
        this.comment = this.comment.bind(this);
        // this.showSelectedBlog = this.showSelectedBlog.bind(this);
        this.state = {
            blog: [],
            user_id: '',
            Comment: "",
            
        }
    }
    componentDidMount() {
        // fetch('http://localhost:5000/blogs/get_selected_blog')
        //     .then((res) => res.json())
        //     .then((json) => {
        //         console.log(JSON.stringify(json));
        //         this.setState({
        //             blog: this.state.blog.concat(json),
        //         });
        //         fetch('http://localhost:5000/users/user_id')
        //             .then((res) => res.json())
        //             .then((json) => {
        //                 //console.log(JSON.stringify(json));
        //                 this.setState({
        //                     user_id: localStorage.getItem('user_id'),
        //                 });
        //             })
        //     })
        const blog={
            blog_id:localStorage.getItem('blog_id'),
        }
        axios.post('http://localhost:5000/blogs/get_selected_blog', blog)
            .then(res => {
                console.log(res.data);
                this.setState({
                    blog: this.state.blog.concat(res.data),
                });
            })
        console.log(this.state.blog);
        this.setState({
            user_id: localStorage.getItem('user_id'),
        });
    }

    comment(e){
        this.setState({
            Comment: e.target.value,
        });
    }

    
    showComments(){
        console.log("hellooooooooooo");
        for(var i=0;i<comments.length;i++){
            console.log(comments[i].comment);
            // this.renderComments(comments[i].comment);
            return(
                <div>
                    <p>{comments[i].comment}</p>
                    </div>
            )
        }
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
                <button  type='submit' onClick={
                    (e) => {
                        const upvote = {
                            blog_id: blog._id,
                            user_id: localStorage.getItem('user_id'),
                            upvote: 1,
                        }
                        axios.post('http://localhost:5000/blogs/upvote', upvote)
                            .then(res => {
                                console.log(res.data);
                            }).catch(err => {
                                console.log(err);
                            }
                        )
                        
                        //disable button after upvote
                        like=like+1;
                        // window.location.reload();
                        e.currentTarget.disabled = true;
                    }
                } >Upvote</button>{blog.like_count}
                <br />
                <br />
                <button type='submit' onClick={
                    (e) => {
                        const downvote = {
                            blog_id: blog._id,
                            user_id: localStorage.getItem('user_id'),
                            
                        }
                        axios.post('http://localhost:5000/blogs/downvote', downvote)
                            .then(res => {
                                console.log(res.data);
                                
                            }).catch(err => {
                                console.log(err);
                            }
                        )
                        dislike=dislike+1;
                        // window.location.reload();
                        e.currentTarget.disabled = true;
                        
                        
                    }
                } >Downvote</button>{blog.dislike_count}

{/* // comments */}

<br />
<br />
                <input type='text' onChange={this.comment} value={this.state.Comment} ></input>
                <Link to='../blog/showBlog'><button type='submit' onClick={
                    (e) => {
                        const comment = {
                            blog_id: blog._id,
                            user_id: localStorage.getItem('user_id'),
                            comment: this.state.Comment,
                        }
                        axios.post('http://localhost:5000/blogs/comment', comment)
                            .then(res => {

                                console.log(res.data);
                                comments=res.data;
                                //loop through comments and display
                                for(var i=0;i<comments.length;i++){
                                    console.log(comments[i].comment);
                                }
                                
                                
                                
                            }).catch(err => {
                                console.log(err);
                            }
                        )
                        window.location.reload();
                        e.currentTarget.disabled = true;
                        
                        
                        
                    }
                } >Comment</button></Link>
                
               {blog.comments.map((comment) => {
                    return(
                        <div>
                            <p>{comment.comment}</p>
                        </div>
                    )
                })
                
                } 

                
                
                
                
                <br />
<br />

                
                <button onClick={
                    (e) => {
                        window.location='/blog/editBlog';
                    }
                }>Edit Blog</button>
                <br />
                <br />
                <button onClick={
                    (e) => {
                        
                        if(window.confirm("Are you sure you want to delete this blog?")){
                            console.log("yes");
                            const deleteBlog = {
                                blog_id: blog._id,
                                user_id: localStorage.getItem('user_id'),
                            }
                            axios.post('http://localhost:5000/blogs/delete_blog', deleteBlog)
                                .then(res => {
                                    console.log(res.data);
                                });
                            window.location.href='../readBlogs/myBlogs';
                        }
                        else{
                            console.log("no");
                            window.location.reload();
                        }
                        
                    }
                }>Delete Blog</button>
                </div>

                
               
            )
        }
        )
    }
}