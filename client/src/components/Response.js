import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from "semantic-ui-react";
import "../css/Forum.css"
import axios from 'axios';

class Response extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstPoster: this.props.firstPoster,
            name: this.props.name,
            datetime: this.props.datetime,
            karma: this.props.karma,
            content: this.props.content,
            endorsed: this.props.endorsed,
            response_id: 'fadfag3gw' //update this!!!
        };
    }

    render() {
        const handleUpvote = () => {
            axios({
                method: 'post',
                url: 'http://localhost:9000/responses/upvote',
                data: {
                    response_id: this.state.response_id, //Put this in!!!
                }
            }).then((response) => {
                this.setState({removed: true});
            });
        }

        const handleEndorse = () => {
            axios({
                method: 'post',
                url: 'http://localhost:9000/responses/endorse',
                data: {
                    response_id: this.state.response_id, //Put this in!!!
                }
            }).then((response) => {
                this.setState({removed: true});
            });
        }

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
                        {this.state.endorsed ? <Icon name="star" color={"yellow"} size={"big"} /> : <div />}
                    </div>
                    {this.state.firstPoster ? <div><button className={"button"} onClick={handleEndorse}>Endorse</button></div> : <div></div>}
                    <div className={"rKarma"}>
                        <h1><button className={"button"} onClick={handleUpvote}>Upvote</button>{"   + " + this.state.karma}</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Response);