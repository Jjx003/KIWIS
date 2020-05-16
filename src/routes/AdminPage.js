import React from "react";
import DisplayUser from "../components/DisplayUser"
import DisplayTag from "../components/DisplayTag"
import { Tab } from 'semantic-ui-react'
import users from './dummy_users.json'
import tags from './dummy_tags.json'
import "../css/AdminPage.css"
import navBar from "../components/navBar"

class AdminPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            company_id: this.props.forumName,
            userList: {},
            tagList: {}
        };

        /*axios({
            method: 'get',
            url: 'http://localhost:9000/tags/all',
            data: {
              forumName: this.state.forumName
            }
          }).then((data) => {
            this.setState({userList: data.toJSON()});
        });

        axios({
            method: 'get',
            url: 'http://localhost:9000/users/all',
            data: {
              forumName: this.state.forumName
            }
          }).then((data) => {
            this.setState({tagList: data.toJSON()});
        });*/
    }
    componentWillMount()
    {
        this.setState({userList: Object.keys(users)});
        this.setState({tagList: Object.keys(tags)});
        //Object.keys(this.state.userList).map(x => {return <li> <DisplayUser x/> </li>;})} 
        //{Object.keys(this.state.tagList).map(x => {return <li> <DisplayTag x/> </li>;})} 
        //{this.state.userList.map(x => {return<li> <DisplayUser x/> </li>;})}
        //{this.state.tagList.map(x => {return<li> <DisplayTag x/> </li>;})}
    }

    render(){
        var panes = [
        { menuItem: 'Users', render: () => 
            <Tab.Pane className="adminPage"> 
                <div className="tagUserList"> 
                    {this.state.userList.map(x => {return<div className="userItem"> <DisplayUser user_id={x} /> </div>;})}
                    <div className="userItem">
                        <div className="addEmployee"> 
                            <div className="invitePrompt">Add Employee Email </div>
                            <input className="inputBox" name="email" type="email" placeholder="  email" />
                        <button> + </button>
                        </div>
                    </div>
                </div> 
            </Tab.Pane> },
        { menuItem: 'Tags', render: () => 
            <Tab.Pane className="adminPage" > 
                <ul className="tagUserList"> 
                    {this.state.tagList.map(x => {return<li> <DisplayTag tag_id={x}/> </li>;})}
                </ul> 
                <div> Add specialization </div>
                <input className="inputBox" name="tag" type="tag" placeholder="  tag" />
                <button> + </button>
            </Tab.Pane> },
    ];
        return(
            <div>
                <navBar />
                <Tab panes={panes} />
            </div>);
    }

}

export default AdminPage;