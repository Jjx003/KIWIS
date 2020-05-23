import DisplayUser from "../components/DisplayUser"
import { Tab, Icon } from 'semantic-ui-react'
import React from "react";
import axios from 'axios';

class UserTab extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loading_user: true,
            userList: ["loading"],
            users: {"loading": true}
        };  
    }

    componentWillMount(){
        axios({
            method: 'post',
            url: 'http://localhost:9000/users/all'
          }).then((response) => {
              this.setState({users: response.data})
            this.setState({userList: Object.keys(response.data),
            loading_user: false});
        });
    }

    render(){
        return( <Tab.Pane className="adminPageAP"> 
                <div className="tagUserListAP"> 
                    {this.state.loading_user ? 
                    <div> 
                        <Icon loading name='spinner' /> loading...
                    </div> : 
                    <div className="ListOfUsers">
                        {this.state.userList.map(x => {
                                return(
                                    <DisplayUser user_id={x} 
                                    first_name={this.state.users[x]["firstName"]} 
                                    last_name={this.state.users[x]["lastName"]}
                                    email={this.state.users[x]["email"]} 
                                    admin={this.state.users[x]["admin"]}/> );
                            })}
                    </div>}
                    <div>
                        <div className="addEmployeeAP"> 
                            <div className="invitePromptAP">Add Employee Email </div>
                            <input className="inputBoxAP" name="email" type="email" placeholder="  email" />
                        <button> + </button>
                        </div>
                    </div>
                </div> 
            </Tab.Pane>);
    }
}


export default UserTab;