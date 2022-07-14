import React, { Component } from 'react';
var blog_id =Request.QueryString["blog_id"];
export default class ShowBlog extends Component {
    render() {
        return(
            <div>
                <h1>Show Blog {blog_id}</h1>
            </div>
        )
    }
}