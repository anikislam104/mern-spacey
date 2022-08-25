import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarHomepage from '../navbar_homepage';
// const blog_id=Request.QueryString["data"];
import "./styles.css";

var comments=[];
var like=0;
var dislike=0;


//style upvote and downvote buttons



export default class ShowBlog extends Component {
    constructor(props) {
        super(props);
        this.showComments = this.showComments.bind(this);
        this.comment = this.comment.bind(this);
        this.showWriterName = this.showWriterName.bind(this);
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

                
                //get user name
            

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

    showWriterName(id){
        

    }
    

    render() {
        const myStyle={
            textSection:{
                textAlign:"center",
            }
        }
        return this.state.blog.map((blog) => {
            var image=blog.image;
            return(
                <div>
                    <NavbarHomepage />
                    <h1 class="display-6" style={myStyle.textSection}>{blog.title}</h1>
                    <p style={myStyle.textSection}>Writer: {blog.user_name}</p>
                    <p><h1>{blog.content}</h1></p>
                    <img src={process.env.PUBLIC_URL+"/images/"+image} alt="..." 
                    style={{ margin:'0 auto', width: "40%" , display: "flex" }} />
                    <p><h1>{blog.image}</h1></p>
                    <br />
                    <br />
                    <br />
                    
                {/* button for upvote */}
                <button  type='submit' id="upvote" class="button" onClick={
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
                        window.location.reload();
                        window.location.reload();
                        // e.currentTarget.disabled = true;
                    }
                } >Upvote</button>   <p>{blog.like_count} upvotes</p>
               
                <button type='submit' class="button"  onClick={
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
                        window.location.reload();
                        window.location.reload();
                        // e.currentTarget.disabled = true;
                        
                        
                    }
                } >Downvote</button>     <p>{blog.dislike_count} downvotes</p>

{/* // comments */}

<br />
<br />
                <input type='text' placeholder="write comment" onChange={this.comment} value={this.state.Comment} ></input>
                <br />
                <br />
                <Link to='../blog/showBlog'><button type='submit' class="button" onClick={
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
                <br />
                <br />
                <h1>Comments</h1>
               {blog.comments.map((comment) => {
                    return(
                        <div>
                            <p class="li">{comment.comment}</p>
                        </div>
                    )
                })
                
                } 

                
                
                
                
                <br />
<br />

                
                </div>

                
               
            )
        }
        )
    }
}