import React from 'react';
import {withRouter} from 'react-router-dom';
import "../css/Forum.css"

class Response extends React.Component {

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
        return(
            <div className={"response-post"}>
                <h2 className={"responder"}>{this.state.firstName + " " + this.state.lastName + ": "}</h2>
                <p className={"text-content"}>{this.state.content}</p>
                <div className={"datetime"}>
                    <h3>{"Created on: " + this.state.datetime}</h3>
                </div>
            </div>
        );
    }
}

export default withRouter(Response);