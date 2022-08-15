import axios from "axios";
import React from "react";
import { useState } from "react";

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

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <label>Title: </label>
                    <input
                        type="text" 
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <br />
                <br />
                <div className="form-group">
                    <label>Content: </label>
                    <textarea
                        type="text"
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <br />
                <br />
                <div className="form-group">
                    <input type="submit" value="Update Blog" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
        
}

export default EditBlog;