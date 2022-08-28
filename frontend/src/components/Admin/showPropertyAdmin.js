import axios from "axios";
import React,{ Component } from "react";
// import NavbarHomepage from "../navbar_homepage";
import AdminNavbar from "./adminNavbar";
var property_id= '';
var host_id= '';
var location='';
var price='';
var description='';
var size='';

const arr=[];

export default class ShowPropertyAdmin extends Component {
    
    constructor(props) {
        super(props);

        this.sendSelectedProperty = this.sendSelectedProperty.bind(this);
        this.showProperties = this.showProperties.bind(this);
        this.setSelectedProperty = this.setSelectedProperty.bind(this);
        this.state = {
            properties: [],
            
        }
        
    }
    //get all properties from the database
    componentDidMount(){
        const id={
            user_id: localStorage.getItem('clicked_user_id'),
        }
        axios.post('http://localhost:5000/property/get_my_property',id)
            .then((res) => {
                this.setState({
                    properties: res.data
                });
            })
    }

    //set state of the selected property
    setSelectedProperty(property){
        console.log(property._id);
        // this.setState({
        //     property_id: property._id,
        //     host_id: property.hostId,
        //     location: property.location,
        //     size: property.size,
        //     price: property.pricePerDay,
        //     description: property.description,
        // });
        property_id = property._id;
        host_id = property.hostId;
        location = property.location;
        size = property.size;
        price = property.pricePerDay;
        description = property.description;
        console.log(property_id);
        localStorage.setItem('selected_property_id', property_id);
        
    }

    //send selected property id to the next page
    sendSelectedProperty(){
        
        // e.preventDefault();
        const selected_property = {
            property_id: property_id,
            host_id: host_id,
            location: location,
            size: size,
            price: price,
            description: description,
        }
        // console.log("id "+id.property);
        axios.post('http://localhost:5000/renting/selected_property',selected_property)
            .then(res => {
                window.location = '/selected_property_admin';
            });

        
    }


    //show all properties  location
    showProperties(){
        const myStyle={
            blogSection:{
                width:"300px",
                height:"250px",
                textAlign:"center",
            },
            buttonSection:{
                margin:"0 auto",
            },
            textSection:{
                fontSize:"23px",    
                display:"flex",
                justifyContent:"center",
                flexDirection:"column",
                alignItems:"center",
                backgroundColor:"rgba(0,0,0,0.3)",
                width:"100%",
                height:"100%",
                color:"white",
            },
        }

        return this.state.properties.map((property) => {
            var image=property.image;
            var path=process.env.PUBLIC_URL+"/images/"+image;

            arr.push(<div className="col-md-4">
            <div className="card mb-4 box-shadow" style={{ width:"300px", height:"250px",textAlign:"center", backgroundImage:`url(${path})` }}>
                <div className="card-body" style={myStyle.textSection}>
                <br/><br/>
                <p className="card-text"><b>{property.title}</b></p>
                <p className="card-text"><b>{property.location}</b></p>
                <font className="text-muted" style={{fontSize:"18px",fontColor:"white"}}><i>&emsp;&emsp;&emsp;&emsp;&emsp;
                            ({property.size} square ft)</i></font>
                    {/* <p className="card-text">{property.location}</p> */}
                    <div className="d-flex justify-content-between align-items-center">
                       
                           < br/> <br/> <br/> <br/>
                        <div className="btn-group" style={myStyle.buttonSection}>
                            
                            <button type="button" className="btn btn-sm btn-outline-secondary" style={{color:"#808080",backgroundColor:"white"}} onClick={
                                () => {
                                    this.setSelectedProperty(property);
                                    this.sendSelectedProperty();
                                }
                            }>View</button>

                        </div>
                        
                        {/* <small className="text-muted">{property.size} square ft</small> */}
                    </div>
                </div>
            </div>
        </div>);

            return(
                <div>
                    
                </div>
            );

        })
    }

    getArrayElements(){
        let first=-3;
        let second=-2;
        let third=-1;
        //let flag1=0;
        //let flag2=0;
        return arr.map((item)=>{
            first=first+3;
            second=second+3;
            third=third+3;
            /*if(second>=arr.length || flag2===1){
                second=-1;
                flag2=1;
            }
            if(first>=arr.length || flag1===1){
                first=-1;
                flag1=1;
            }*/
            return(
                <div class="row align-items-center">

                <div class="col-lg-2">
                    {arr[first]}  
                </div>
                <div class="col-lg-2">

                    </div>
                <div class="col-lg-2">
                    {arr[second]}  
                </div>
                <div class="col-lg-2">

                    </div>
                <div class="col-lg-2">
                    {arr[third]}  
                </div>
                </div>
            );
        })
            
        
    }

    render() {
        return(
            <div class="col-lg-12 bg-light">
                {/* {allBlogs} */}
                <AdminNavbar />
                <br/ >
                {this.showProperties()}
                {this.getArrayElements()}
            </div>
        )
    }

}