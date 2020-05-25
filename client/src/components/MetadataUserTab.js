import { Tab, Icon } from 'semantic-ui-react'
import React from "react";
import axios from 'axios';

class MetadataUserTab extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            userList: {},
            loading: true,
        };  
    }

    componentWillMount(){
        axios({
            method: 'get',
            url: 'http://localhost:9000/metadata/getUserMetadata'
          }).then((response) => {
              console.log(response)
              if(response.data.success) {
                  this.setState({userList:response.data, loading:false});
              } else {
                  this.setState({userList:{'No Metadata Recorded': 'Requires Posts to Record Data'}, loading:false});
              }
        });
    }

    render(){
        const {userList} = this.state;

        return (
            <Tab.Pane className="adminPageAP" >
                <h1 style={{textAlign: "center"}}> User Meta Data (Frequency of Post by Users) </h1>
                <div className="tagListAP">  
                    {this.state.loading ? 
                    <div> 
                        <Icon loading name='spinner' /> loading 
                    </div> 
                    : 
                    Object.keys(userList).map((key) => {return <div className="MUTbar"> {key} :  {this.state.userList[key]} </div>})}
                    
                </div> 
            </Tab.Pane> 
        );
    }
}

export default MetadataUserTab;