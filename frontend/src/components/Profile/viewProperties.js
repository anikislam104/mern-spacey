import React from "react";
import { useEffect } from "react";
import axios from "axios";
import NavbarHomepage from "../navbar_homepage";

const arr=[];

const ViewProperties = () => {
    const [myProperties, setMyProperties] = React.useState([]);

    useEffect(() => {
        const id=localStorage.getItem("user_id");
        const user={
            user_id:id
        }
        axios.post("http://localhost:5000/users/get_my_properties",user)
            .then(res => {
                console.log(res.data);
                setMyProperties(res.data);
            });
    }, []);
    
 const  getMyProperties=()=>{

        return myProperties.map((myProperty) => {
            return(
                arr.push (
                    <div className="col-md-6">     
                    <div className="card mb-4 box-shadow" style={{width:"330px", height:"300px",backgroundColor:"#e0ffff",textAlign:"center"}}>
                        <br/>
                        <br/>
                        <h1><b>{myProperty.title}</b></h1>
                        <br />
                        <h2>{myProperty.description}</h2>
                        <br />
                        <div style={{textAlign:"center"}}>
                        <button className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" 
                            style={{width:"200px",height:"40px"}} onClick={
                            () => {
                                localStorage.setItem("edit_property_id", myProperty._id);
                                window.location.href = "/editProperty/";
                            }
                        }>Edit property details</button>
                        </div>
                        <br />
                        <div style={{textAlign:"center"}}>
                        <button className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" 
                            style={{width:"200px",height:"40px"}} onClick={
                            () => {
                                if(window.confirm("Do you want to delete this property?")){
                                    const id={
                                        property_id:myProperty._id
                                    }
                                    axios.post("http://localhost:5000/property/delete_property",id)
                                        .then(res => {
                                            console.log(res.data);
                                            window.location="/viewProperties";
                                        })
                                }
                                else{
                                    window.location.reload();
                                }
                            }
                        } >Delete property</button>
                        </div>
                    </div>
                    <br/><br/>
                    </div>
                )
            );
            
        })
    }



    const getArrayElements=()=>{
        let first=-3;
        let second=-2;
        let third=-1;
        
        return arr.map((item)=>{
            first=first+3;
            second=second+3;
            third=third+3;

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

    const clearArrayElements=()=>{
        arr.splice(0, arr.length)
      }  
    

    return(
        <div class="col-lg-12 bg-light">
            {/* {allBlogs} */}
            <NavbarHomepage />
            <br/ >
            <h1 class="display-6" style={{textAlign:"center"}}><b>My Properties</b></h1>
            <br/>
            {getMyProperties()}
            {getArrayElements()}
            {clearArrayElements()}
            
        </div>
    )

}

export default ViewProperties;