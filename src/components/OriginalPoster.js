import React from 'react';
import "../css/PostCards.css";
import {withRouter} from 'react-router-dom';
import "../css/Forum.css"
import DisplayingTags from "./DisplayingTags";

class OriginalPoster extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postID: this.props.postID,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            title: this.props.title,
            tags: this.props.tags,
            datetime: this.props.datetime,
            karma: this.props.karma,
            content: this.props.content
        };
    }

    render() {
        return (
            <div className={"original-post"}>
                <div className={"header"}>
                    <h1 className={"title"}>{this.state.title}</h1>
                </div>
                <div className={"postInfo"}>
                    <h2 className={"postID"}>{this.state.postID}</h2>
                    <h2>{"Posted by: " + this.state.firstName + " " + this.state.lastName}</h2>
                </div>
                <div className={"content"}>
                    <p className={"text-content"}>{this.state.content}</p>
                </div>
                <div className={"datetime"}>
                    <h3 className={"createdDate"}>{"Created on: " + this.state.datetime}</h3>
                    <h1 className={"karma"}>{"+ " + this.state.karma}</h1>
                </div>
                <div className={"tagList"}>
                    <h1 className={"tags"}>{this.state.tags}</h1>
                </div>
            </div>
        );
    }
}

export default withRouter(OriginalPoster);