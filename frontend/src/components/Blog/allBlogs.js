import React, { Component } from 'react';



export default class AllBlogs extends Component {
    // constructor(props) {
    //     super(props);
    //     this.getAllBlogs = this.getAllBlogs.bind(this);
    //     this.state = {
    //         blogs: [],
    //     }
    // }

    // componentDidMount() {
    //     fetch('http://localhost:5000/blogs/all_blogs')
    //         .then((res) => res.json())
    //         .then((json) => {
    //             console.log(JSON.stringify(json));
    //             this.setState({
    //                 blogs: this.state.blogs.concat(json),
    //             });
    //         })
    // }

    // getAllBlogs(){
    //     return this.state.blogs.map(blog => {
    //         return (
    //             <div>
    //                 <li>{blog.title}</li>
    //                 <a href='/readBlogs/showBlog'><h1>{blog.content}</h1></a>
    //             </div>
    //         )
    //     }
    //     )
    // }

    // render() {
    //     return(
    //         <div>
    //             {/* {allBlogs} */}
    //             {this.getAllBlogs()}
    //         </div>
    //     )
    // }
    render()
    {
        return(
            <div>
                <h1>All Blogs</h1>
            </div>
        )
    }
}