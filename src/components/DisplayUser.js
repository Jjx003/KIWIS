import React from "react";
import users from '../routes/dummy_users.json'
import "../css/DisplayUser.css"

class DisplayUser extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user_id: props.user_id,
            user_email: props.user_email
        };
    }

    render(){
        var pending = (this.state.user_id == null) ? true : false;

        if(pending){
            return(
                <div>
                    <div> status: pending </div>
                    <div> {this.state.user_email} </div>
                </div> 
            );
        }
        else{
            return(
                <div className="displayUserBar">
                    <div className="first_name"> {users[this.state.user_id]["First_Name"]} </div>
                    <div className="last_name"> {users[this.state.user_id]["Last_Name"]} </div>
                    <div className="email"> {users[this.state.user_id]["Email"]} </div>
                    <div className="user_id"> {this.state.user_id} </div>
                    <button> X </button> 
                </div>
            );
        }
    }
}

export default DisplayUser;