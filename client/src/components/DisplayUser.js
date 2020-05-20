import React from "react";
//import users from '../dummy_data/dummy_users.json'
import "../css/DisplayUser.css"
import { Icon } from "semantic-ui-react"
import axios from 'axios';

class DisplayUser extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user_id: props.user_id,
            user_email: props.user_email,
            user_list: {}
        };
    }

    componentWillMount()
    {
        axios({
            method: 'get',
            url: 'http://localhost:9000/users/all',
            data: {
              forumName: this.state.forumName
            }
          }).then((data) => {
            this.setState({userList: data.toJSON()});
        });
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
                    <div className="first_nameDU"> {this.state.user_list[this.state.user_id]["First_Name"]} </div>
                    <div className="last_nameDU"> {this.state.user_list[this.state.user_id]["Last_Name"]} </div>
                    <div className="emailDU"> {this.state.user_list[this.state.user_id]["Email"]} </div>
                    <div className="user_idDU"> {this.state.user_id} </div>
                    <button> 
                        {this.state.user_list[this.state.user_id]["admin"] ? 
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