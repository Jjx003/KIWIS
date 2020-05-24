import DisplayUser from "../components/DisplayUser"
import { Tab, Icon } from 'semantic-ui-react'
import React from "react";
import axios from 'axios';

class MetadataTagTab extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tagList: {},

        };  
    }

    componentWillMount(){
        axios({
            method: 'get',
            url: 'http://localhost:9000/tags/getTags'
          }).then((response) => {
            this.setState({tagList: response.data});
        });
    }

    render(){
        const {tagList} = this.state;

        return (
            <Tab.Pane className="adminPageAP" >
                <h1 style={{textAlign: "center"}}> Tag Meta Data </h1>
                <div className="tagListAP">  
                    {this.state.loading_tag ? 
                    <div> 
                        <Icon loading name='spinner' /> loading 
                    </div> 
                    : 
                    Object.keys(tagList).map((key, i) => {return <div> {key} </div>;})};
                    
                </div> 
            </Tab.Pane> 
        );
    }
}


export default MetadataTagTab;