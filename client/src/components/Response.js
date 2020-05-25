import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from "semantic-ui-react";
import "../css/Forum.css"

class Response extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstPoster: this.props.firstPoster,
            name: this.props.name,
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
                        <h2 className={"responder"}>{this.state.name + ": "}</h2>
                    </div>
                    <div className={"rDate"}>
                        <h3>{"Created on: "}{"\n"}{this.state.datetime}</h3>
                    </div>
                </div>
                <div className={"middleContent"}>
                    <div className={"rContent"}>
                        <p className={"text-content"}>{this.state.content}</p>
                    </div>
                </div>
                <div className={"rightSide"}>
                    <div className={"rStar"}>
                        <Icon name="star outline" color={"green"} size={"big"} />
                    </div>
                    {this.state.firstPoster ? <div><button className={"button"}>Endorse</button></div> : <div></div>}
                    <div className={"rKarma"}>
                        <h1><button className={"button"}>Upvote</button>{"   + " + this.state.karma}</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Response);