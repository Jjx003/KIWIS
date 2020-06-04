import React from "react";
import "../css/AdminPage.css"
import TitleBar from "../components/TitleBar";
import UserTab from "../components/UserTab";
import MetadataTagTab from "../components/MetadataTagTab";
import MetadataUserTab from "../components/MetadataUserTab";
import TagTab from "../components/TagTab";
import { Tab } from 'semantic-ui-react'
import axios from 'axios';


class AdminPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true
        }
    }

    // check to see if user is signed up
    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:9000/users/isUserAdmin',
            withCredentials: true
        })
            .then((response) => {
                if (!response.data.admin) {
                    this.props.history.push('/');
                }
                else {
                    this.setState({isLoading:false});
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }



    render() {
        if (this.state.isLoading) {
            return <h1> Loading... </h1>
        }
        var panes = [
            { menuItem: 'Users', render: () => <UserTab /> },
            { menuItem: 'Tags', render: () => <TagTab /> },
            { menuItem: 'Metadata - Tags', render: () => <MetadataTagTab /> },
            { menuItem: 'Metadata - Users', render: () => <MetadataUserTab /> }
        ];

        return (
            <div>
                <TitleBar title="Manage Forum" />
                <Tab panes={panes} />
                <div className="endText">
                    <p>
                        © All Rights Reserved. KIWI by Symps.
                    </p>
                </div>
            </div>);
    }

}

export default AdminPage;