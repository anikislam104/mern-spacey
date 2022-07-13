import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';

export default class ReadBlogs extends Component {

    render(){
        return(
            <div><NavbarHomepage /><br />
                <button>My Blogs</button>
                <br/><br/>
                <button>All Blogs</button>
            </div>
        )
    }
}