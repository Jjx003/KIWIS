import React from "react";
//import users from '../dummy_data/dummy_users.json'
import "../css/DisplayUser.css"
import { Icon } from "semantic-ui-react"
import axios from 'axios';

class DisplayUser extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            removed: false,
            pending: false,
            forumName: props.forumName,
            user_id: props.user_id,
            first_name: props.first_name,
            last_name: props.last_name,
            email: props.email,
            admin: props.admin
        };
    }

    render(){
        var pending = (this.state.user_id == null) ? true : false;
        
        const handleAdmin = () => {
            axios({
                method: 'post',
                url: 'http://localhost:9000/users/toggleAdmin',
                data: {
                  forumName: this.state.forumName,
                  userID: this.state.user_id
                }
              }).then((response) => {
                this.setState({admin: !this.state.admin});
            });
        }

        const handleRemove = () => {
            if(window.confirm("Removing" + " " + this.state.first_name + " " + this.state.last_name))
            {
                axios({
                    method: 'post',
                    url: 'http://localhost:9000/users/remove',
                    data: {
                    forumName: this.state.forumName,
                    userID: this.state.user_id
                    }
                }).then((response) => {
                    this.setState({removed: true});
                });
            }
        }

        if(this.state.removed){
            return(
            <div className="displayUserBarDU"> 
                <div className="removed"> removed </div>
             </div>);
        }

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
                    <div className="first_nameDU"> {this.state.first_name} </div>
                    <div className="last_nameDU"> {this.state.last_name} </div>
                    <div className="emailDU"> {this.state.email} </div>
                    <div className="user_idDU"> {this.state.user_id} </div>
                    <div className="buttonsDU">
                        <button onClick={handleAdmin}> 
                            {this.state.admin ? 
                            <Icon fitted color="yellow" name="star"/> : 
                            <Icon fitted color="yellow" name="star outline"/>}
                        </button>
                    <button onClick={handleRemove}> X </button> 
                    </div>
                </div>
            );
        }
    }
}

export default DisplayUser;