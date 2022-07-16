import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';

export default class MyBlogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 0,
            blogs: [],
        }
        
    }

    componentDidMount() {
        // fetch('http://localhost:5000/blogs/my_blogs')
        //     .then((res) => res.json())
        //     .then((json) => {
        //         //console.log(JSON.stringify(json));
        //         this.setState({
        //             blogs: this.state.blogs.concat(json),
        //         });
        //     })
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                //console.log(JSON.stringify(json));
                console.log(json.user_id);
                this.setState({
                    user_id: json.user_id,
                });
                console.log(this.state.user_id);
                const id={
                    user_id: this.state.user_id,
                }
                console.log(id.user_id);
                axios.post('http://localhost:5000/blogs/my_blogs',id) 
                    .then(res => {
                        console.log(res.data);
                        this.setState({
                            blogs: res.data,
                        });
                    })
            })
            
    }

    getMyBlogs(){
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
                <NavbarHomepage />
                <br />
                {this.getMyBlogs()}
            </div>
        )
    }
}