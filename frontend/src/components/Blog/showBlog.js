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
            },
            experienceSection:{
                width: "350px",
                height: "150px",
             },
        }
        return this.state.blog.map((blog) => {
            var image=blog.image;
            let db = new Date(blog.createdAt);
            const year=db.getFullYear();
            const day=db.getDate();
            const name = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const month=name[db.getMonth()];

            return(
                <div class="bg-light">
                    <NavbarHomepage />
                    <br/><br/>
                    <h1 class="display-6" style={myStyle.textSection}><b>{blog.title}</b></h1>
                    <p style={myStyle.textSection}><i>Written by {blog.user_name}</i></p>
                    <br/><br/>
                    <br/>
                    <img src={process.env.PUBLIC_URL+"/images/"+image} alt="..." 
                    style={{ margin:"0 auto", width: "500px" , height: "400px ", display: "flex" }} />
                    <br/><br/>
                    <p><h1 class="card-subtitle text-muted"><i>&emsp;Posted on {month} {day},{year}</i></h1></p>
                    <br/><br/>

                    <div class="row align-items-center">
                <div class="col-lg-0"></div>

                <div class="col-lg-8">
                    <h2 class="fs-4" style={{fontFamily:"Merriweather"}}>{blog.content}</h2>
                    </div>
                <div class="col-lg-3"></div>
                </div>

                <br/><br/><br/><br/><br/><br/><br/>

            <div class="row align-items-center">
                {/* button for upvote */}
                <div class="col-lg-4">
                <button className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" type='submit' id="upvote" onClick={
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
                } >Upvote</button>&emsp;<b>{blog.like_count}</b> upvotes
               </div>
               <div class="col-lg-4">
                <button type='submit' className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off"  onClick={
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
                } >Downvote</button>&emsp;<b>{blog.dislike_count}</b> downvotes
                </div>

{/* // comments */}

                <div class="col-lg-4">
                <br/><br/><br/><br/><br/><br/><br/>
                <textarea id="inputComment" type="text" placeholder="write comment" required="" value={this.state.Comment} onChange={this.comment} class="form-control  border-0 shadow-sm px-4 text-primary" style={myStyle.experienceSection} />
                <br/>
                <Link to='../blog/showBlog'><button type='submit' className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={
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
                </div>
            </div>       

                <br />
                <br />
                <br/><br/>
                <p class="fs-4"><h1><strong>Comments</strong></h1></p>
                <br/>
               {blog.comments.map((comment) => {
                    return(
                        <div className="card mb-5 box-shadow" style={{width:"1300px", height:"90px",backgroundColor:"white"}}>
                            <br/>
                            <p><h1 style={{fontSize:"20px"}}><i>&emsp;&emsp;&emsp;&emsp;&emsp;"{comment.comment}"</i></h1></p>
                            <br/>
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