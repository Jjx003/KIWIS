import { Tab, Icon } from 'semantic-ui-react'
import React from "react";
import axios from 'axios';

class MetadataTagTab extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tagList: {},
            loading: true
        };  
    }

    componentWillMount(){
        axios({
            method: 'get',
            url: 'http://localhost:9000/metadata/getTagMetadata'
          }).then((response) => {
            console.log(response)
            if(response.data.success) {
                this.setState({tagList:response.data, loading:false});
            } else {
                this.setState({tagList:{'No Metadata Recorded': 'Requires Posts to Record Data'}, loading:false});
            }
        });
    }

    render(){
        const {tagList} = this.state;

        return (
            <Tab.Pane className="adminPageAP" >
                <h1 style={{textAlign: "center"}}> Tag Meta Data (Occurences of Tags in Posts) </h1>
                <div className="tagListAP">  
                    {this.state.loading ? 
                    <div> 
                        <Icon loading name='spinner' /> loading 
                    </div> 
                    : 
                    Object.keys(tagList).map((key) => {return <div className="MTTbar"> {key}  : {this.state.tagList[key]} </div>})}
                    
                </div> 
            </Tab.Pane> 
        );
    }
}

export default MetadataTagTab;