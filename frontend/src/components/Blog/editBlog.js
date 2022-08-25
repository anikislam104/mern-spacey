import axios from "axios";
import React from "react";
import { useState } from "react";
import NavbarHomepage from '../navbar_homepage';

const EditBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(title, content);
        const blog = {
            blog_id: localStorage.getItem("blog_id"),
            title: title,
            content: content,
        };
        axios.post("http://localhost:5000/blogs/edit_blog", blog).then((res) => {
            console.log(res.data);
            window.location = "/blog";
        });
    }

    const myStyle={
        textSection:{
            textAlign:"center",
        },
        experienceSection:{
            width: "720px",
            height: "400px",
         },
         experienceSection2:{
            width: "900px",
            height: "40px",
         },
         buttonSection: {
            align:"center",
            padding:"5px 30px",
            color:"blueViolet",
            float:"right",
        },
    }
    return (
        <div class="col-lg-12 bg-light">
             <NavbarHomepage />
                <br/ >
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <label><b>Title: </b></label>
                    <br/>
                    <input
                        type="text" 
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={myStyle.experienceSection2}
                    />
                </div>
                <br />
                <br />
                <div className="form-group">
                    <label><b>Content:</b> </label>
                    <br/>
                    <textarea
                        type="text"
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={myStyle.experienceSection}
                    />
                </div>
                <br />
                <br />
                <div className="form-group" style={myStyle.buttonSection}>
                    
                    <input type="submit" value="Update Blog" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    );
        
}

export default EditBlog;