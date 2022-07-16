// import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
// import { Link } from 'react-router-dom';



export default class AllBlogs extends Component {
    constructor(props) {
        super(props);
        this.getAllBlogs = this.getAllBlogs.bind(this);
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

     
    getAllBlogs(){
        const myStyle={
            itemSection:{
                fontWeight: "bold",
            },
        }

        var separateElements = [];
        var multiElements = this.state.blogs;

        for(var i = 0; i < multiElements.length; i+=3) {
           var oneRow = [];
           oneRow.push(multiElements.slice(i, i+3).map(item => {
           return <div class="col-lg-4" style={{display: 'inline-block'}}> <label style={myStyle.itemSection}>{item.title}</label> <br/>{item.content}</div>
           }))
           
           separateElements.push(oneRow.map(itm => {return <div><br/><div>{itm}</div><br/><br/></div>}))
        }
        return separateElements;
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