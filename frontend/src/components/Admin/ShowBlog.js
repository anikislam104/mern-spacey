import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import NavbarHomepage from '../navbar_homepage';
// const blog_id=Request.QueryString["data"];
import "./styles.css";
import AdminNavbar from './adminNavbar';

var comments=[];



//style upvote and downvote buttons



export default class ShowBlogAd extends Component {
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
            like: "",
            dislike: "",
            comments:[],
            
        }
    }
    componentDidMount() {
        
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
                    <AdminNavbar />
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

                 

                <br />
                <br />
                <br/><br/>
                <p class="fs-4"><h1><strong>Comments</strong></h1></p>
                <br/>
                {this.state.comments.map((comment) => {
                     return(
                          <div class="row align-items-center">
                            <div class="col-lg-4">
                                 <p class="fs-4"><strong><button onClick={
                                    () => {
                                       localStorage.setItem('clicked_user_id', comment.user_id); 
                                        window.location.href = '/user_profile';
                                    }
                                 }>{comment.user_name}</button></strong></p>
                            </div>
                            <div class="col-lg-8">
                                 <p class="fs-4">{comment.comment}</p>
                            </div>
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