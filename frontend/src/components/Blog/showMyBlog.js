import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarHomepage from '../navbar_homepage';
import Footer from '../Footer';
import "./styles.css";
// const blog_id=Request.QueryString["data"];


export default class ShowMyBlog extends Component {
    constructor(props) {
        super(props);
        // this.showComments = this.showComments.bind(this);
        this.comment = this.comment.bind(this);
        // this.showSelectedBlog = this.showSelectedBlog.bind(this);
        this.state = {
            blog: [],
            user_id: '',
            Comment: "",
            like:"",
            dislike:"",
            comments:[],
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
                axios.post('http://localhost:5000/blogs/get_like_dislike_count', {blog_id:localStorage.getItem('blog_id')}) 
                    .then(res => {
                        console.log(res.data);
                        this.setState({
                            like:res.data.like_count,
                            dislike:res.data.dislike_count,
                        })
                        console.log(this.state.like);
                    })
                

                const data ={
                    blog_id:localStorage.getItem('blog_id'),
                    user_id:localStorage.getItem('user_id'),
                }
                //check reaction
                axios.post('http://localhost:5000/blogs/check_reaction', data)
                .then(res => {
                    console.log(res.data);
                    if(res.data==="liked"){
                        document.getElementById("like").style.color="white";
                        document.getElementById("like").style.backgroundColor="green";
                    }
                    else if(res.data==="disliked"){
                        document.getElementById("dislike").style.color="white";
                        document.getElementById("dislike").style.backgroundColor="red";
                    }
                    else{
                        document.getElementById("like").style.color="blue";
                        document.getElementById("dislike").style.color="blue";
                    }
                })
                const data1 ={
                    blog_id:localStorage.getItem('blog_id'),
                }
                axios.post('http://localhost:5000/blogs/get_blog_comments', data1)
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        comments: this.state.comments.concat(res.data),
                    })
                })
            })
        
    }

    comment(e){
        this.setState({
            Comment: e.target.value,
        });
    }

    
    
    
   
    render() {
        const myStyle={
            textSection:{
                textAlign:"center",
            },
            experienceSection:{
                width: "500px",
                height: "200px",
             },
             buttonSection: {
                align:"center",
                padding:"1px 40px",
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
                    <p style={myStyle.textSection}><i><button onClick={
                        ()=>{
                            localStorage.setItem('clicked_user_id',blog.user_id);
                            window.location.href = "/user_profile";
                        }
                    }>Written by {blog.user_name}</button></i></p>
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
                <div class="col-lg-3"></div>
                <div class="col-lg-4">
                <button className="btn btn-primary" style={{backgroundColor:"whitesmoke",width:"110px",height:"50px"}} type='submit' id="like" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={
                    (e) => {
                        const upvote = {
                            blog_id: blog._id,
                            user_id: localStorage.getItem('user_id'),
                            upvote: 1,
                        }
                        axios.post('http://localhost:5000/blogs/upvote', upvote)
                            .then(res => {
                                console.log(res.data);
                                this.setState({
                                    like: res.data.like_count,
                                    dislike: res.data.dislike_count,
                                });
                                if(res.data.msg === "up"){
                                    document.getElementById("like").style.color="white";
                                    document.getElementById("like").style.backgroundColor="green";
                                }
                                else if(res.data.msg === "down"){
                                    document.getElementById("like").style.color="blue";
                                    document.getElementById("like").style.backgroundColor="white";
                                }
                                else if(res.data.msg === "updown"){
                                    document.getElementById("like").style.color="white";
                                    document.getElementById("like").style.backgroundColor="green";
                                    document.getElementById("dislike").style.color="blue";
                                    document.getElementById("dislike").style.backgroundColor="white";
                                }
                            }).catch(err => {
                                console.log(err);
                            }
                        )
                        
                        //disable button after upvote
                        // like=like+1;
                        // window.location.reload();
                        // e.currentTarget.disabled = true;
                    }
                } >Upvote</button>&emsp;<b>{this.state.like}</b> upvotes
                </div>
                <div class="col-lg-4">
                <button className="btn btn-primary" style={{backgroundColor:"whitesmoke",width:"110px",height:"50px"}} type='submit' id="dislike" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={
                    (e) => {
                        const downvote = {
                            blog_id: blog._id,
                            user_id: localStorage.getItem('user_id'),
                            
                        }
                        axios.post('http://localhost:5000/blogs/downvote', downvote)
                            .then(res => {
                                console.log(res.data);
                                this.setState({
                                    like: res.data.like_count,
                                    dislike: res.data.dislike_count,
                                });
                                if(res.data.msg === "down"){
                                    document.getElementById("dislike").style.color="blue";
                                    document.getElementById("dislike").style.backgroundColor="white";
                                }
                                else if(res.data.msg === "up"){
                                    document.getElementById("dislike").style.color="white";
                                    document.getElementById("dislike").style.backgroundColor="red";
                                }
                                else if(res.data.msg === "updown"){
                                    document.getElementById("dislike").style.color="white";
                                    document.getElementById("dislike").style.backgroundColor="red";
                                    document.getElementById("like").style.color="blue";
                                    document.getElementById("like").style.backgroundColor="white";
                                }
                                
                                
                            }).catch(err => {
                                console.log(err);
                            }
                        )
                        // dislike=dislike+1;
                        // window.location.reload();
                        // e.currentTarget.disabled = true;
                        
                        
                    }
                } >Downvote</button>&emsp;<b>{this.state.dislike}</b> downvotes
                </div>
                </div>
{/* // comments */}

<div class="row align-items-center">
                <div class="col-lg-3"></div>
                <div class="col-lg-5">
                <br/><br/><br/><br/>
                <textarea id="inputComment" type="text" placeholder="write comment" required="" value={this.state.Comment} onChange={this.comment} class="form-control  border-0 shadow-sm px-4 text-primary" style={myStyle.experienceSection} />
                </div>
                {/* <br/> */}
                <div class="col-lg-4">
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
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
                                
                                
                                
                                
                            }).catch(err => {
                                console.log(err);
                            }
                        )
                        window.location.reload();
                        // e.currentTarget.disabled = true;
                        
                        
                        
                    }
                } >Comment</button></Link>
             </div>
            </div>

                <br />
                <br />
                <br/><br/>
                

                <p class="fs-4"><h1><strong>Comments</strong></h1></p>
                <br/>
                {this.state.comments.map((comment) => {
                     return(
                        <div className="card mb-5 box-shadow align-items-center" style={{width:"1300px", height:"90px",backgroundColor:"white"}}>
                            {/* <div class="col-lg-4">
                                 <p class="fs-4"><strong><button onClick={
                                    () => {
                                       localStorage.setItem('clicked_user_id', comment.user_id); 
                                        window.location.href = '/user_profile';
                                    }
                                 }>{comment.user_name}</button></strong></p>
                            </div> */}
                            
                            <p class="fs-4"><i>"{comment.comment}"</i></p>
                            
                                 <p class="fs-4"><strong><button onClick={
                                    () => {
                                       localStorage.setItem('clicked_user_id', comment.user_id); 
                                        window.location.href = '/user_profile';
                                    }
                                 }>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;---<b>{comment.user_name}</b></button></strong></p>
                            
                          </div>
                     )
                
                })
                
                } 

                
                
                
                
                <br />
<br />

                <div class="row align-items-center">
                <div class="col-lg-10">
                <button className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={
                    (e) => {
                        window.location='/blog/editBlog';
                    }
                }>Edit Blog</button>
                </div>
                <br />
                <br />
                <div class="col-lg-2">
                <button className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={
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
            </div>
            <br/><br/><br/>
            <br/>
            <br/><br/><br/><br/><br/><br/>
<Footer/> 
            </div>

                
               
            )
        }
        )
    }
}