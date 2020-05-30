import React from 'react';
import '../css/Home.css';
import '../css/App.css';
import OriginalPoster from "../components/OriginalPoster";
import Response from "../components/Response";
import Failure from '../components/Failure'
import axios from 'axios'
import TitleBar from "../components/TitleBar";

class ViewPost extends React.Component {

    constructor(props) {
        super(props);

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
            karma: 0,
            responses: [],
            failed: false,
        }
    }

    upvotedMerge = (arr1, arr2) => {
        for (var key in arr2) {
            arr1[key].userUpvoted = arr2[key]
        }
        return arr1
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
                responses: this.upvotedMerge(results.data.responses, results.data.responseBools),
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
                        this.setState({ loaded: true })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ failed: true })
                })
        })

    }

    render() {
        const { createdPost, postID, userID, title, tags, datetime, content, karma, responses, loaded, failed, users } = this.state;

        if (this.state.loaded) {
            // Stole method from HomePosts.js
            const getName = (userid) => {
                let name = "User Not Found";
                if (users !== undefined && users[userid] !== undefined) {
                    name = users[userid].firstName + " " + users[userid].lastName;

                }
                return name;
            }

            var responseArr = []
            var responseIDs = []
            if (responses) {
                responseArr = Object.values(responses)
                responseIDs = Object.keys(responses)
                console.log(responseArr)
                console.log(responseIDs)
            }
            var mapped = responseArr.map((obj, i) => <Response key={i} responseID={responseIDs[i]} userUpvoted={obj.userUpvoted} firstPoster={createdPost} datetime={obj.datetime} content={obj.content} karma={obj.karma} endorsed={obj.endorsed} name={getName(obj.user_id)} />)
            console.log(mapped)

            return (
                <div className={"container"}>
                    <div>
                        <TitleBar title="Post" />
                        <div className="posts-container">
                            <OriginalPoster firstPoster={createdPost} postID={postID} userID={userID} title={title}
                                tags={tags} datetime={datetime} karma={karma}
                                content={content} name={getName(userID)} />
                            {mapped}
                            <button className={"makeReply"}>Reply</button>
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
