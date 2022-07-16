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

    GetRandomNumber (min_num, max_num){
        return Math.floor(Math.random()* (max_num - min_num) + min_num);
    }

    getAllBlogs(){
        const myStyle={
            itemSection:{
                fontWeight: "bold",
            },
            buttonSection1:{
                width:"400px",
                height:"250px",
                fontSize: "20px",
                textAlign: "center",
                borderRadius: "10px",
                backgroundColor: "#008080",
                color: "white",
            },
            buttonSection2:{
                width:"400px",
                height:"250px",
                fontSize: "20px",
                textAlign: "center",
                borderRadius: "10px",
                backgroundColor: "Green",
                color: "white",
            },
            buttonSection3:{
                width:"400px",
                height:"250px",
                fontSize: "20px",
                textAlign: "center",
                borderRadius: "10px",
                backgroundColor: "#004EFF",
                color: "white",
            },
        }

        var separateElements = [];
        var multiElements = this.state.blogs;
        var j=0;
        for(var i = 0; i < multiElements.length; i+=3) {
           var oneRow = [];

           if(this.GetRandomNumber(1,3)===1 && j!==1) { oneRow.push(multiElements.slice(i, i+3).map(item => {
           return <div style={{display: "inline-block"}}>&emsp;<button style={myStyle.buttonSection1}><label style={myStyle.itemSection}>{item.title}</label> <br/>{item.content}</button></div>
           })); j=1; }

           else if(this.GetRandomNumber(1,3)===2 && j!==2) { oneRow.push(multiElements.slice(i, i+3).map(item => {
            return <div style={{display: "inline-block"}}>&emsp;<button style={myStyle.buttonSection2}><label style={myStyle.itemSection}>{item.title}</label> <br/>{item.content}</button></div>
           }));j=2; }

            else{ oneRow.push(multiElements.slice(i, i+3).map(item => {
                return <div style={{display: "inline-block"}}>&emsp;<button style={myStyle.buttonSection3}><label style={myStyle.itemSection}>{item.title}</label> <br/>{item.content}</button></div>
            }));j=3;}
  
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