import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';

export default class WriteBlog extends Component {
    constructor(props) {
        super(props);

        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user_id: 0,
            content: "",
            title: "",
            time_created: 0,
            like_count: 0,
            image: null,
        }
        
    }

    componentDidMount() {
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    user_id: json.user_id,
                });
            })
    }

    onChangeContent(e) {
        this.setState({
            content: e.target.value,
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeImage(e) {
        this.setState({
            image: e.target.files[0],
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const blog = {
            user_id: this.state.user_id,
            content: this.state.content,
            title: this.state.title,
            time_created: new Date(),
            like_count: 0,
            image: this.state.image,
        }

        axios.post('http://localhost:5000/blogs/writeBlog', blog)
            .then(res => console.log(res.data));

        window.location = '/blog';
    }

    render(){
        return(
            <div>
                <NavbarHomepage /><br/>
                <form onSubmit={this.onSubmit}>

                <div className="form-group"> 
                    <label>Title: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                        />
                </div>

                <div className="form-group"> 
                    <label>Content: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.content}
                        onChange={this.onChangeContent}
                        />
                </div>

                <div className="form-group"> 
                    <label>Picture: </label>
                    <input  type="file"
                        className="form-control"
                        onChange={this.onChangeImage}
                        />
                </div>
                <br/>
                <div className="form-group">
                    <input type="submit" value="Post" className="btn btn-primary" />
                </div>
                </form>
            </div>
        )
        }
    }