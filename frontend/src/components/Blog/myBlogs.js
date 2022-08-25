import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';

const arr=[];

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
        const myStyle={
            blogSection:{
                width:"300px",
                height:"250px",
                textAlign:"center",
            },
            buttonSection:{
                margin:"0 auto",
            },
            textSection:{
                fontSize:"23px",
                backgroundColor:"#f4f0ec",
            },
        }
        return this.state.blogs.map((blog) => {
            var image=blog.image;
            var path=process.env.PUBLIC_URL+"/images/"+image;
            console.log(path);
            arr.push(<div className="col-md-4">
            <div className="card mb-4 box-shadow" style={{ width:"300px", height:"250px",textAlign:"center", backgroundImage:`url(${path})` }}>
                <div className="card-body">
                <br/><br/>
                <p className="card-text"><b style={myStyle.textSection}>{blog.title}</b></p>
                    {/* <p className="card-text">{property.location}</p> */}
                    <div className="d-flex justify-content-between align-items-center">
                    <br/><br/><br/><br/><br/>
                        <div className="btn-group" style={myStyle.buttonSection}>
                            <button type="button" className="btn btn-sm btn-outline-secondary" style={{color:"#808080",backgroundColor:"white"}} onClick={
                                () => {
                                    this.sendSelectedBlog(blog._id);
                                }
                            }>View</button>

                        </div>
                        {/* <small className="text-muted">{property.size} square ft</small> */}
                    </div>
                </div>
            </div>
        </div>);
            return(
                <div>
                    
                </div>
            );
            
        })
    }


    getArrayElements(){
        let first=-3;
        let second=-2;
        let third=-1;
        //let flag1=0;
        //let flag2=0;
        return arr.map((item)=>{
            first=first+3;
            second=second+3;
            third=third+3;
            /*if(second>=arr.length || flag2===1){
                second=-1;
                flag2=1;
            }
            if(first>=arr.length || flag1===1){
                first=-1;
                flag1=1;
            }*/
            return(
                <div class="row align-items-center">

                <div class="col-lg-2">
                    {arr[first]}  
                </div>
                <div class="col-lg-2">

                    </div>
                <div class="col-lg-2">
                    {arr[second]}  
                </div>
                <div class="col-lg-2">

                    </div>
                <div class="col-lg-2">
                    {arr[third]}  
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
                {this.getMyBlogs()}
                {this.getArrayElements()}
            </div>
        )
    }
}