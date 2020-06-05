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
        this.endorsedRef = React.createRef()

        this.state = {
            endorsedID: null,
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
            responseObjs: [],
            responseText: [],
            responseIDs: [],
            failed: false,
        }
    }

    responseHTML = (obj, index, postEndorsed, responseIDs) => {
        return (<Response key={index}
            myRef={obj.endorsed ? this.endorsedRef : null}
            firstPoster={this.state.createdPost}
            datetime={obj.datetime}
            content={obj.content}
            karma={obj.karma}
            endorsed={obj.endorsed}
            name={this.getName(obj.user_id)}
            isPostEndorsed={postEndorsed}
            postEndorse={this.postEndorse.bind(this)}
            postUnendorse={this.postUnendorse.bind(this)}
            responseID={responseIDs[index]}
            userUpvoted={obj.userUpvoted} />)
    }

    getName = (userid) => {
        let name = "Deleted User";
        if (this.state.users !== undefined && this.state.users[userid] !== undefined) {
            name = this.state.users[userid].firstName + " " + this.state.users[userid].lastName;

        }
        return name;
    }

    upvotedMerge = (arr1, arr2) => {
        for (var key in arr2) {
            arr1[key].userUpvoted = arr2[key]
        }
        return arr1
    }

    refreshForNewResponse = () => { this.refreshResponse(this.state.endorsedID) }

    refreshResponse = (postEndorsed) => {
        this.endorsedRef = React.createRef()
        axios({
            method: 'get',
            url: 'https://kiwi-test-app.herokuapp.com/posts/' + this.props.id.toString(),
        }).then((results) => {
            // do this to convince javascript that responses is an array
            var responses = [], responseIDs = [], responseText = []
            responses = this.upvotedMerge(results.data.responses, results.data.responseBools)
            if (responses) { // now convinced that it is an array...
                responseText = Object.values(responses)
                responseIDs = Object.keys(responses)

                // update variables! offset is how many we already have, latest response is all the responses we've now read
                this.latestResponse = responses.length

                // update the state to have the new response objects
                this.setState({
                    responseText: responseText,
                    responseIDs: responseIDs,
                    responseObjs: responseText.map((obj, i) => this.responseHTML(obj, i, postEndorsed, responseIDs))
                })
            }
        }).catch((error) => { console.log(error); this.setState({ failed: true }) })
    }

    postEndorse = (id) => {
        this.refreshResponse(id)
        this.setState({
            endorsedID: id
        })
    }

    postUnendorse = () => {
        this.refreshResponse(null)
        this.setState({
            endorsedID: null
        })
    }

    componentDidMount() {
        // TODO: THESE CAN BE ASYNC AS LONG AS BOTH ARE RETRIEVED BEFORE RENDER
        axios({
            method: 'get',
            url: 'https://kiwi-test-app.herokuapp.com/posts/' + this.props.id.toString(),
        }).then((results) => {
            console.log(results.data);
            var responses = []
            responses = this.upvotedMerge(results.data.responses, results.data.responseBools)
            var responseText = [], responseIDs = []
            if (responses) {
                responseText = Object.values(responses)
                responseIDs = Object.keys(responses)
            }
            console.log(responseText)
            this.setState({
                createdPost: results.data.createdPost,
                title: results.data.posts.title,
                tags: results.data.posts.tag_ids,
                datetime: results.data.posts.date_time,
                karma: results.data.posts.karma,
                responseText: responseText,
                responseIDs: responseIDs,
                content: results.data.posts.content,
                userID: results.data.posts.user_id,
                loaded: false,
                failed: false,
            })

        })
            .then(() => {
                axios({
                    method: 'get',
                    url: 'https://kiwi-test-app.herokuapp.com/users/allUsers',
                })
                    .then((response) => {
                        if (response.status === 200) {
                            this.setState({ users: response.data });
                        }
                    })
                    .then(() => {
                        // get endorsed response, assuming only one in backend which will be enforced by frontend
                        for (var i = 0; i < this.state.responseText.length; ++i) {
                            if (this.state.responseText[i].endorsed === true) {
                                this.setState({
                                    endorsedID: this.state.responseIDs[i]
                                })
                                break;
                            }
                        }

                        this.latestResponse = this.state.responseText.length

                        this.setState({
                            responseObjs: this.state.responseText.map((obj, i) => this.responseHTML(obj, i, this.state.endorsedID, this.state.responseIDs)),
                            OP: this.getName(this.state.userID),
                            loaded: true
                        })
                    }).catch((error) => {
                        console.log(error);
                        this.setState({ failed: true })
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({ failed: true })
                    })
            })

    }

    scrollEndorsed = () => {
        if (this.endorsedRef.current) {
            this.endorsedRef.current.scrollIntoView({
                behavior: 'smooth'
            })
            console.log("scrolling to")
            console.log(this.endorsedRef)
            console.log(this.endorsedRef.current.offsetTop)
        } else {
            console.log("nothing to scroll to")
        }
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
                                content={content} name={OP} scrollEndorsed={this.scrollEndorsed.bind(this)} hasEndorsed={this.state.endorsedID} />
                            <a className={"content-link"} href="#responseAdding"><button className={"renderResponse"}>Reply</button></a>
                            {responseObjs}
                            <div id={"responseAdding"}>
                                <AddResponse postID={postID} responseUpdate={this.refreshForNewResponse.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div >
            );
        } else if (!loaded && !failed) {
            return (<div> <TitleBar title="Post" /> <div className="posts-container"> Loading... </div> </div>)
        } else {
            return <Failure />
        }
    }
}

export default ViewPost;
