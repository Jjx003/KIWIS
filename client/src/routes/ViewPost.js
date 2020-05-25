import React from 'react';
import '../css/Home.css';
import '../css/App.css';
import OriginalPoster from "../components/OriginalPoster";
import { withRouter } from 'react-router-dom';
import Response from "../components/Response";
import Failure from '../components/Failure'
import axios from 'axios'
import TitleBar from "../components/TitleBar";

class ViewPost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            postID: props.id,
            userID: "",
            users: {},
            title: "Post Not Found",
            tags: [],
            datetime: "",
            content: "",
            karma: 0,
            name: "User Not Found",
            responses: [],
            failed: false,
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:9000/posts/' + this.props.id.toString(),
        }).then((results) => {
            console.log(results.data);
            this.setState({
                title: results.data.posts.title,
                tags: results.data.posts.tag_ids,
                datetime: results.data.posts.date_time,
                karma: results.data.posts.karma,
                responses: results.data.responses,
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
        const { postID, title, tags, datetime, content, karma, name, responses, loaded, failed } = this.state;

        if (this.state.loaded) {
            // Stole method from HomePosts.js
            const getName = (userid) => {
                let name = "no_user";
                if (this.state.users !== undefined && this.state.users[userid] !== undefined) {
                    name = this.state.users[userid].firstName + " " + this.state.users[userid].lastName;

                }
                return name;
            }

            var responseArr = []
            if (responses) {
                responseArr = Object.values(responses)
                console.log(responseArr)
            }
            var mapped = responseArr.map(obj => <Response datetime={obj.datetime} content={obj.content} karma={obj.karma} name={getName(this.state.userID)} />)

            return (
                <div className={"container"}>
                    <div>
                        <TitleBar title="Post" />
                        <div className="posts-container">
                            <OriginalPoster firstPoster={false} postID={this.state.postID} userID={this.state.userID} title={this.state.title}
                                tags={this.state.tags} datetime={this.state.datetime} karma={this.state.karma}
                                content={this.state.content} name={getName(this.state.userID)} />
                            {mapped}
                            <button className={"makeReply"}>Reply</button>
                        </div>
                    </div>
                </div>
            );
            // TODO: MAP RESPONSES
        } else if (!loaded && !failed) {
            return (<div> <TitleBar title="Post" /> <div className="posts-container"> Loading... </div> </div>)
        } else {
            return <Failure />
        }
    }
}

export default ViewPost;
