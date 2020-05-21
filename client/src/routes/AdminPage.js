import React from "react";
import DisplayUser from "../components/DisplayUser"
import DisplayTag from "../components/DisplayTag"
import { Tab, Icon } from 'semantic-ui-react'
//import users from '../dummy_data/dummy_users.json'
//import tags from '../dummy_data/dummy_tags.json'
import "../css/AdminPage.css"
import Navbar from "../components/Navbar";
import axios from 'axios';

class AdminPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loading_user: true,
            loading_tag: true,
            company_id: "bruh",
            userList: ["loading"],
            tagList: ["loading"],
            users: {"loading": true}
        };  
        
        axios({
            method: 'post',
            url: 'http://localhost:9000/tags/all',
            data: {
              forumName: this.state.company_id
            }
          }).then((response) => {
            this.setState({tagList: Object.keys(response.data),
            loading_tag: false});
        });

        axios({
            method: 'post',
            url: 'http://localhost:9000/users/all',
            data: {
              forumName: this.state.company_id
            }
          }).then((response) => {
              this.setState({users: response.data})
            this.setState({userList: Object.keys(response.data),
            loading_user: false});
        });
    }

    render(){
        var panes = [
        { menuItem: 'Users', render: () => 
            <Tab.Pane className="adminPageAP"> 
                <div className="tagUserListAP"> 
                    {this.state.loading_user ? 
                                    <div> 
                                        <Icon loading name='spinner' /> loading 
                                    </div> : 
                                    this.state.userList.map(x => {
                            return <div className="userItemAP"> 
                                <DisplayUser user_id={x} 
                                forumName={this.state.company_id}
                                first_name={this.state.users[x]["firstName"]} 
                                last_name={this.state.users[x]["lastName"]}
                                email={this.state.users[x]["email"]} 
                                admin={this.state.users[x]["admin"]}/> 
                            </div>;
                        })
                    }
                    <div className="userItemAP">
                        <div className="addEmployeeAP"> 
                            <div className="invitePromptAP">Add Employee Email </div>
                            <input className="inputBoxAP" name="email" type="email" placeholder="  email" />
                        <button> + </button>
                        </div>
                    </div>
                </div> 
            </Tab.Pane> },
        { menuItem: 'Tags', render: () => 
            <Tab.Pane className="adminPageAP" > 
                <div className="tagListAP"> 
                    {this.state.loading_tag ? 
                    <div> 
                        <Icon loading name='spinner' /> loading 
                    </div> 
                    : 
                    this.state.tagList.map(x => {return<div> <DisplayTag tag_id={x}/> </div>;})}
                </div> 
                <div className="addTagAP"> 
                    <div className="tagPromptAP">Add tag name </div>
                        <input className="inputBoxAP" name="tag name" type="tag name" placeholder="  tag name" />
                        <button> + </button>
                </div>
            </Tab.Pane> 
            }];

        return(
            <div>
                <Navbar />
                <Tab panes={panes} />
                <div className="endText">
                    
                    <p1>
                        © All Rights Reserved. KIWI by Symps.
                    </p1>
                </div>
            </div>);
    }

}

export default AdminPage;