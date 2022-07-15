import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
// import FileBase64 from 'react-file-base64';


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
        
        const formData = new FormData();
        formData.append('user_id', this.state.user_id);
        formData.append('content', this.state.content);
        formData.append('title', this.state.title);
        formData.append('time_created', this.state.time_created);
        formData.append('like_count', this.state.like_count);
        formData.append('image', this.state.image);

        console.log(formData);

        axios.post('http://localhost:5000/blogs/writeBlog', formData)
            .then(res => console.log(res.data));

        window.location = '/blog';
    }

    render(){
        const myStyle= {
            buttonSection:{
             padding: "10px 40px",
             fontSize: "20px",
             borderRadius: "10px",
             backgroundColor: "BlueViolet",
             color: "white",
             position:"center",
            },
     
            inputSection:{
              padding : "10px 10px",
            },

            experienceSection:{
               width: "720px",
               height: "400px",
            },
     
          }
           return (
              
              <div className="maincontainer">
                <NavbarHomepage />
               <div class="container-fluid">
                   <div class="row no-gutter">
                      
                       
                       <div class="col-md-12 bg-light">
                           <div class="login d-flex align-items-center py-5">
                              
                               <div class="container">
                                   <div class="row align-items-center">
                                     
                                     <div class="col-lg-3">
     
                                     </div>
     
                                     <div class="col-lg-7">

                                       <form onSubmit={this.onSubmit} encType="multipart/form-data">
                                               <div class="form-group sm-3">
                                               <label>Title: </label>
                                                   <input id="inputTitle" type="text" placeholder=""  required="" autofocus="" value={this.state.title} onChange={this.onChangeTitle} class="form-control border-0 shadow-sm px-4" />
                                               </div>
                                               <br/>
                                               <div class="form-group sm-3">
                                                   <label>Experience: </label>
                                                   <textarea id="inputContent" type="text" placeholder="" required="" value={this.state.content} onChange={this.onChangeContent} class="form-control  border-0 shadow-sm px-4 text-primary" style={myStyle.experienceSection} />
                                               </div>
                                               {/* <br/>
                                               <div class="form-group sm-3">
                                                   <label>Picture: </label>
                                                   <input id="inputPicture" type="file" placeholder="" required="" onChange={this.onChangeImage} class="form-control  border-0 shadow-sm px-4 " />
                                                    <FileBase64 className="form-control  border-0 shadow-sm px-4 " multiple={true} onDone={this.onChangeImage} /> 
                                               </div> */}
                                               <br/>
                                               <div class="form-group sm-3">
                                                  <div class="custom-file sm-3">
                                                    <input type="file" filename="image" class="custom-file-input form-control  border-0 shadow-sm px-4" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={this.onChangeImage} />
                                                  </div>
                                               </div>
                                               <br/>
                                               <div className="form-group">
        
                                                    <input type="submit" value="Post" className="btn btn-primary" style={myStyle.buttonSection} />
                                               </div>
                                               

                                        </form>
                                     </div>
                                     
                                     <div class="col-lg-2">
     
                                     </div>
     
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
             </div>
             
       )
        }
    }