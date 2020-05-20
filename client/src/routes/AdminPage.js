import React from "react";
import DisplayUser from "../components/DisplayUser"
import DisplayTag from "../components/DisplayTag"
import { Tab } from 'semantic-ui-react'
//import users from '../dummy_data/dummy_users.json'
//import tags from '../dummy_data/dummy_tags.json'
import "../css/AdminPage.css"
import Navbar from "../components/Navbar";
import axios from 'axios';

class AdminPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            company_id: this.props.forumName,
            userList: {},
            tagList: {}
        };

        
    }
    componentWillMount()
    {
        axios({
            method: 'get',
            url: 'http://localhost:9000/tags/all',
            data: {
              forumName: this.state.forumName
            }
          }).then((data) => {
            console.log(data);
            this.setState({tagList: data});
        });

        axios({
            method: 'get',
            url: 'http://localhost:9000/users/all',
            data: {
              forumName: this.state.forumName
            }
          }).then((data) => {
            this.setState({userList: data.toJSON()});
        });

        //this.setState({userList: Object.keys(users)});
        //this.setState({tagList: Object.keys(tags)});
        //Object.keys(this.state.userList).map(x => {return <li> <DisplayUser x/> </li>;})} 
        //{Object.keys(this.state.tagList).map(x => {return <li> <DisplayTag x/> </li>;})} 
        //{this.state.userList.map(x => {return<li> <DisplayUser x/> </li>;})}
        //{this.state.tagList.map(x => {return<li> <DisplayTag x/> </li>;})}
    }

    render(){
        /*var panes = [
        { menuItem: 'Users', render: () => 
            <Tab.Pane className="adminPageAP"> 
                <div className="tagUserListAP"> 
                    {this.state.userList.map(x => {return<div className="userItemAP"> <DisplayUser user_id={x} /> </div>;})}
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
                    {this.state.tagList.map(x => {return<div> <DisplayTag tag_id={x}/> </div>;})}
                </div> 
                <div className="addTagAP"> 
                    <div className="tagPromptAP">Add tag name </div>
                        <input className="inputBoxAP" name="tag name" type="tag name" placeholder="  tag name" />
                        <button> + </button>
                </div>
            </Tab.Pane> 
            },
    ];*/
    //<Tab panes={panes} />

        return(
            <div>
                <Navbar />
                <div className="endText">
                    <p1>
                        © All Rights Reserved. KIWI by Symps.
                    </p1>
                </div>
            </div>);
    }

}

export default AdminPage;