import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';


export default class BlogHome extends Component {
    constructor(props) {
        super(props);

        this.writeBlog=this.writeBlog.bind(this);
        this.readBlogs=this.readBlogs.bind(this);
        
    }


    writeBlog() {
        window.location.href = "/writeBlog";
    }

    readBlogs() {
        window.location.href = "/readBlogs";
    }
    
    render() {
        
        return(
            
            <div>
                <NavbarHomepage />
                <div className="container">
                    <button onClick={this.writeBlog}> Write Blog</button>
                    <br/>
                    <br/>
                    <button onClick={this.readBlogs}> Read Blogs</button>
                </div>
            </div>
        )
    }
}