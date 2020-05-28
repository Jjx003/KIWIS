import React from "react";
import "../css/AdminPage.css"
import TitleBar from "../components/TitleBar";
import UserTab from "../components/UserTab";
import MetadataTagTab from "../components/MetadataTagTab";
import MetadataUserTab from "../components/MetadataUserTab";
import TagTab from "../components/TagTab";
import { Tab } from 'semantic-ui-react'


class AdminPage extends React.Component{
    render(){
        var panes = [
            { menuItem: 'Users', render: () => <UserTab />},
            { menuItem: 'Tags', render: () => <TagTab />},
            { menuItem: 'Metadata - Tags', render: () => <MetadataTagTab  />},
            { menuItem: 'Metadata - Users', render: () => <MetadataUserTab />}
        ];

        return(
            <div>
                <TitleBar title="Manage Forum" />
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