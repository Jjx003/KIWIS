import React from "react";
import DisplayUser from "../components/DisplayUser"
import DisplayUser from "../components/DisplayTag"
import { Tab } from 'semantic-ui-react'

class AdminPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            company_id = this.props.company_id
        };
    }

    listUsers = Object.keys(users).map(x => {<li> <DisplayUser x/> </li>}) //use company id
    listTags = Object.keys(tags).map(x => { <li> <DisplayTag x/> </li>}) //use company id

    panes = [
        { menuItem: 'Users', render: () => 
            <Tab.Pane> 
                <ul> 
                    {listUsers} 
                </ul> 
                <div> Add Employee Email </div>
                <input className="inputBox" name="email" type="email" placeholder="  email" />
                <button> + </button>
            </Tab.Pane> },
        { menuItem: 'Tags', render: () => 
            <Tab.Pane> 
                <ul> 
                    {listTags} 
                </ul> 
                <div> Add specialization </div>
                <input className="inputBox" name="tag" type="tag" placeholder="  tag" />
                <button> + </button>
            </Tab.Pane> },
    ];

    render(){
        return(<Tab panes={panes} />);
    }

}

export default AdminPage;