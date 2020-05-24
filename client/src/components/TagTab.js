import DisplayTag from "../components/DisplayTag"
import { Tab, Icon } from 'semantic-ui-react'
import React from "react";
import axios from 'axios';

class TagTab extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loading_tag: true,
            tagList: ["loading"],
            currTag: ''
        };  
    }

    componentWillMount(){
        axios({
            method: 'post',
            url: 'http://localhost:9000/tags/getTags'
          }).then((response) => {
            this.setState({tagList: Object.keys(response.data.tags),
            loading_tag: false});
        });
    }

    render(){
        const handleAddTag = (event) =>{
            event.preventDefault();
            // should tag_ids be in line below
            const {tagname} = event.target.elements;
            this.setState({currTag: tagname.value});
            if(window.confirm("Adding specialization:  " + tagname.value))
            {
                axios({
                    method: 'post',
                    url: 'http://localhost:9000/tags/add',
                    data: {
                    tagName: tagname.value
                    }
                }).then(() => {
                    this.state.tagList.push(this.state.currTag);
                    this.setState({tagList: this.state.tagList})
                });
            }
            event.target.reset();
        }

        return(
            <Tab.Pane className="adminPageAP" >
                <h1 style={{textAlign: "center"}}> Add and Remove Specialization </h1>
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
                        <form className="TagForm" onSubmit={handleAddTag.bind(this)}>
                            <input className="inputBoxAP" name="tagname" type="tagname" placeholder="  tag name" />
                            <button> + </button>
                        </form>
                </div>
            </Tab.Pane> );
    }
}

export default TagTab;