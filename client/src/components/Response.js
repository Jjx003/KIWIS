import React from 'react';
import {withRouter} from 'react-router-dom';
import {Icon} from "semantic-ui-react";
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
        return (
            <div className={"response-post"}>
                <div className={"leftSide"}>
                    <div className={"rPoster"}>
                        <h2 className={"responder"}>{this.state.firstName + " " + this.state.lastName + ": "}</h2>
                    </div>
                    <div className={"rDate"}>
                        <h3>{"Created on: " }{"\n"}{this.state.datetime}</h3>
                    </div>
                </div>
                <div className={"middleContent"}>
                    <div className={"rContent"}>
                        <p className={"text-content"}>{this.state.content}</p>
                    </div>
                </div>
                <div className={"rightSide"}>
                    <div className={"rStar"}>
                        <Icon name="star outline" color={"green"} size={"big"}/>
                    </div>
                    <div className={"rKarma"}>
                        <h1><button className={"button"}>Upvote</button>{"   + " + this.state.karma}</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Response);