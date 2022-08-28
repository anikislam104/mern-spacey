import axios from "axios";
import React from "react";
import AdminNavbar from "./adminNavbar";
import "./styles.css";

const UserSearch = () => {
    const [userlist, setUserlist] = React.useState([]);
    const [search_string, setSearch_string] = React.useState("");

    React.useEffect(() => {

    }, []);

    return (
        <div>
            <AdminNavbar />    
            <h1>User Search</h1>
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-top p-3">
        <form className="container-fluid">
          <div class="input-group">
            <input
              className="form-control mr-sm-2"
              type="search"
              name="search"
              placeholder="Search"
              onChange={(e) => setSearch_string(e.target.value)}
              
            />
            <br />
            <button
              type="button"
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={() => {
                    document.getElementById('list').style.display = "block";
                    const data={
                        search_string:search_string
                    }
                    axios.post("http://localhost:5000/users/get_recommended_users",data)
                    .then(res=>{
                        setUserlist(res.data);

                    })
                }}
            >
              Search
            </button>
          </div>
        </form>
      </nav>
      <div id="list" style={{ display:"none"  }}>
        {userlist.map((user) => (
            <div>
                <button class="button"  onClick={
                  ()=>{
                      localStorage.setItem("clicked_user_id",user._id);
                      window.location="/user_profile_admin";
                  }
                } ><h1>{user.firstName} {user.lastName}</h1></button>
                <br></br>
                <br></br>
            </div>
        ))}
      </div>
        </div>
        )
}

export default UserSearch;