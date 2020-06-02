import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from "semantic-ui-react";
import "../css/Forum.css"
import axios from 'axios'

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
            userUpvoted: this.props.userUpvoted,
            responseID: this.props.responseID
        };
    }

    upvoteSwitch = () => {
        if (this.state.userUpvoted === true) { // logic for removing upvote
            axios({
                method: 'post',
                url: 'https://kiwi-test-app.herokuapp.com/response/UndoUpvote',
                data: {
                    response_id: this.state.responseID
                },
                withCredentials: true
            })
                .then((response) => {
                    if (response.data.success) {
                        // Wait until update processes before redirecting
                        this.setState({
                            userUpvoted: false,
                            karma: this.state.karma - 1
                        });
                    } else {
                        alert("Removing upvote was not processed. Try again.");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else { // userUpvoted === false, add upvote
            axios({
                method: 'post',
                url: 'https://kiwi-test-app.herokuapp.com/response/UpvoteResponse',
                data: {
                    response_id: this.state.responseID
                },
                withCredentials: true
            })
                .then((response) => {
                    if (response.data.success) {
                        // Wait until update processes before redirecting
                        this.setState({
                            userUpvoted: true,
                            karma: this.state.karma + 1
                        })
                    } else {
                        alert("Upvote was not processed. Try again.");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    endorseSwitch = () => {
        if (this.state.endorsed === true) { // logic for removing endorsement
            axios({
                method: 'post',
                url: 'https://kiwi-test-app.herokuapp.com/response/undoEndorse',
                data: {
                    response_id: this.state.responseID
                },
                withCredentials: true
            })
                .then((response) => {
                    if (response.data.success) {
                        // Wait until update processes before redirecting
                        this.props.postUnendorse() // change post
                        this.setState({
                            endorsed: false
                        });
                    } else {
                        alert("Removing endorsement was not processed. Try again.");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else { // userUpvoted === false, add upvote
            if (this.props.isPostEndorsed !== null) { // the post is endorsed!
                alert("This post already has an endorsement. Please remove the other endorsement if you wish to endorse this instead.")
            } else { // post not endorsed, we're good
                axios({
                    method: 'post',
                    url: 'https://kiwi-test-app.herokuapp.com/response/EndorseResponse',
                    data: {
                        response_id: this.state.responseID
                    },
                    withCredentials: true
                })
                    .then((response) => {
                        if (response.data.success) {
                            this.props.postEndorse(this.state.responseID)
                            this.setState({
                                endorsed: true
                            })
                            // Wait until update processes before redirecting
                        } else {
                            alert("Endorsement was not processed. Try again.");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }

    render() {
        return (
            <div className={"response-post"} ref={this.props.myRef}>
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
                    {this.state.firstPoster ? <div><button className={"button"} onClick={this.endorseSwitch}>{this.state.endorsed ? "Unendorse" : "Endorse"}</button></div> : <div></div>}
                    <div className={"rKarma"}>
                        <h1><button className={"button"} onClick={this.upvoteSwitch.bind(this)}>{this.state.userUpvoted ? "Remove Upvote" : "Upvote"}</button>{"   + " + this.state.karma}</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Response);