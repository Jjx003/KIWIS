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
            title: "",
            tags: [],
            datetime: "",
            content: "",
            karma: 0,
            firstName: "",
            lastName: "",
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
                responses: results.data.posts.responses,
                content: results.data.posts.content,
                userID: results.data.posts.user_id,
                loaded: true,
                failed: false,
            })
        }).catch((error) => {
            console.log(error);
            this.setState({ failed: true })
        }).then(() => {
            axios({
                method: 'post',
                data: {
                    userid: this.state.userID
                },
                url: 'http://localhost:9000/users/singleUser',
            })
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data !== undefined) {
                            this.setState({ firstName: response.data.firstName });
                            this.setState({ lastName: response.data.lastName });
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }

    render() {
        // TODO: add user info!
        const { postID, title, tags, datetime, content, karma, loaded, failed } = this.state;

        if (this.state.loaded) {
            return (
                <div className={"container"}>
                    <div>
                        <TitleBar title="Post" />
                        <div className="posts-container">
                            <OriginalPoster firstPoster={false} postID={this.state.postID} userID={this.state.userID} title={this.state.title}
                                tags={this.state.tags} datetime={this.state.datetime} karma={this.state.karma}
                                content={this.state.content} firstName={this.state.firstName} lastName={this.state.lastName} />
                            <Response firstPoster={false} userID={this.state.userID} datetime={this.state.datetime} karma={this.state.karma}
                                content={this.state.content} firstName={this.state.firstName} lastName={this.state.lastName} />
                            <button className={"makeReply"}>Reply</button>
                        </div>
                    </div>
                </div>
            );
            // TODO: MAP RESPONSES
        } else if (!loaded && !failed) {
            return (<div> Loading... </div>)
        } else {
            return <Failure />
        }
    }
}

export default ViewPost;
