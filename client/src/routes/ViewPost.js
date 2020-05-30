import React from 'react';
import '../css/Home.css';
import '../css/App.css';
import OriginalPoster from "../components/OriginalPoster";
import Response from "../components/Response";
import Failure from '../components/Failure'
import axios from 'axios'
import TitleBar from "../components/TitleBar";
import AddResponse from "../components/AddResponse";

class ViewPost extends React.Component {

    constructor(props) {
        super(props);

        this.latestResponse = 0;
        this.lockResponse = false;

        this.state = {
            createdPost: false,
            loaded: false,
            postID: props.id,
            userID: "",
            users: {},
            title: "Post Not Found",
            tags: [],
            datetime: "",
            content: "",
            OP: "",
            karma: 0,
            responseIDs: [],
            responseObjs: [],
            failed: false,
        }
    }

    getName = (userid) => {
        let name = "User Not Found";
        if (this.state.users !== undefined && this.state.users[userid] !== undefined) {
            name = this.state.users[userid].firstName + " " + this.state.users[userid].lastName;

        }
        return name;
    }

    componentDidMount() {
        // TODO: THESE CAN BE ASYNC AS LONG AS BOTH ARE RETRIEVED BEFORE RENDER
        axios({
            method: 'get',
            url: 'http://localhost:9000/posts/' + this.props.id.toString(),
        }).then((results) => {
            console.log(results.data);
            this.setState({
                createdPost: results.data.createdPost,
                title: results.data.posts.title,
                tags: results.data.posts.tag_ids,
                datetime: results.data.posts.date_time,
                karma: results.data.posts.karma,
                responseIDs: results.data.responses,
                content: results.data.posts.content,
                userID: results.data.posts.user_id,
                loaded: false,
                failed: false,
            })
        }).catch((error) => {
            console.log(error);
            this.setState({ failed: true })
        }).then(() => {
            axios({
                method: 'get',
                url: 'http://localhost:9000/users/allUsers',
            })
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({ users: response.data });
                        console.log(response.data)
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ failed: true })
                }).then(() => {
                    var responseText = [];
                    if (this.state.responseIDs) {
                        responseText = Object.values(this.state.responseIDs)
                    }

                    this.latestResponse = responseText.length

                    this.setState({
                        responseObjs: responseText.map((obj, i) => <Response key={i} firstPoster={this.state.createdPost} datetime={obj.datetime} content={obj.content} karma={obj.karma} endorsed={obj.endorsed} name={this.getName(obj.user_id)} />),
                        OP: this.getName(this.state.userID),
                        loaded: true
                    })
                })
        })

    }



    refreshResponse = () => {
        /* NOTE: PROBABLY MUCH BETTER WAY TO DO THIS! */
        while (this.lockResponse) { }

        this.lockResponse = true

        axios({
            method: 'get',
            url: 'http://localhost:9000/posts/' + this.props.id.toString(),
        }).then((results) => {
            // do this to convince javascript that responses is an array
            var responses = []
            responses = results.data.responses
            if (responses) { // now convinced that it is an array...
                responses = Object.values(responses)
                // cut it to the responses we haven't seen yet
                var newResponses = responses.slice(this.latestResponse)

                // update variables! offset is how many we already have, latest response is all the responses we've now read
                var offset = this.latestResponse
                this.latestResponse = responses.length

                // update the state to have the new response objects
                this.setState({
                    responseObjs: this.state.responseObjs.concat(newResponses.map((obj, i) => <Response key={offset + i} firstPoster={this.state.createdPost} datetime={obj.datetime} content={obj.content} karma={obj.karma} endorsed={obj.endorsed} name={this.getName(obj.user_id)} />))
                })

                // we're done, unlock the method
                this.lockResponse = false
            } else {
                console.log("no new responses")
                this.lockResponse = false
            }
        }).catch((error) => {
            console.log(error);
            this.setState({ failed: true })
        })
    }

    render() {
        const { createdPost, postID, userID, title, tags, datetime, content, karma, responseObjs, loaded, failed, OP } = this.state;

        if (this.state.loaded) {
            return (
                <div className={"container"}>
                    <div>
                        <TitleBar title="Post" />
                        <div className="posts-container">
                            <OriginalPoster firstPoster={createdPost} postID={postID} userID={userID} title={title}
                                tags={tags} datetime={datetime} karma={karma}
                                content={content} name={OP} />
                            {responseObjs}
                            <AddResponse postID={postID} responseUpdate={this.refreshResponse.bind(this)} />
                        </div>
                    </div>
                </div>
            );
        } else if (!loaded && !failed) {
            return (<div> <TitleBar title="Post" /> <div className="posts-container"> Loading... </div> </div>)
        } else {
            return <Failure />
        }
    }
}

export default ViewPost;
