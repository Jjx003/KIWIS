import React from 'react';
import "../css/PostCreate.css"
import { withRouter } from 'react-router-dom';
import { Dropdown } from "semantic-ui-react"

class PostCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //firstPoster: this.props.firstPoster,
            //postID: this.props.postID,
            //name: this.props.name,
            //title: this.props.title,
            //tags: this.props.tags,
            // datetime: this.props.datetime,
            // karma: this.props.karma,
            // content: this.props.content
        };
    }

    render() {
        return (
            <div className={"post-create"}>
                <input className="titleBox" name="title" placeholder="Post Title" />
                <textarea className="postContent" name="postContent" placeholder="Post Content" />
                <div className={"publish-section"}>
                    <Dropdown fluid multiple selection clearable search scrolling text="tags" options={this.props.dropdownOpt} onChange={this.props.dropdownChange} value={this.props.dropdownVal} />
                    <button type="Publish Post"> Publish Post </button>
                </div>
            </div>
        );
    }
}

export default withRouter(PostCreate);