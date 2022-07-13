import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';

export default class ReadBlogs extends Component {
    myBlogs(){
        window.location.href = "/readBlogs/myBlogs";
    }
    allBlogs(){
        window.location.href = "/readBlogs/allBlogs";
    }
    render(){
        return(
            <div><NavbarHomepage /><br />
                <button onClick={this.myBlogs}>My Blogs</button>
                <br/><br/>
                <button onClick={this.allBlogs}>All Blogs</button>
            </div>
        )
    }
}