import React from "react";
import users from '../dummy_data/dummy_users.json'
import "../css/DisplayUser.css"
import { Icon } from "semantic-ui-react"

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
                <div className="displayUserBarDU">
                    <div className="first_nameDU"> {users[this.state.user_id]["First_Name"]} </div>
                    <div className="last_nameDU"> {users[this.state.user_id]["Last_Name"]} </div>
                    <div className="emailDU"> {users[this.state.user_id]["Email"]} </div>
                    <div className="user_idDU"> {this.state.user_id} </div>
                    <button> 
                        {users[this.state.user_id]["admin"] ? 
                        <Icon fitted color="yellow" name="star"/> : 
                        <Icon fitted color="yellow" name="star outline"/>}
                     </button>
                    <button> X </button> 
                </div>
            );
        }
    }
}

export default DisplayUser;