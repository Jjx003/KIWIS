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
            title: "",
            tags: [],
            datetime: "",
            content: "",
            karma: 0,
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
                title: results.data.title,
                tags: results.data.tag_ids,
                datetime: results.data.date_time,
                karma: results.data.karma,
                responses: results.data.responses,
                content: results.data.content,
                loaded: true,
                failed: false,
            })
        }).catch((error) => {
            console.log(error);
            this.setState({ failed: true })
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
                        {/*<div className={"posts-container"}>*/}
                        {/*    <div>*/}
                        {/*    <h1> {postID || "null"} </h1>*/}
                        {/*    <h1> {firstName || "null"} </h1>*/}
                        {/*    <h1> {lastName || "null"} </h1>*/}
                        {/*    <h1> {title || "null"} </h1>*/}
                        {/*    <h1> {tags || "null"} </h1>*/}
                        {/*    <h1> {datetime || "null"} </h1>*/}
                        {/*    <h1> {content || "null"} </h1>*/}
                        {/*    <h1> {karma || "null"} </h1>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
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
        /*
          "userID": "dumbo jumbo",
          "title": "What's 2+2?",
          "tags": ["math", "dumbass"],
          "Datetime": "May 6, 2020",
          "Content": "I've been up for days trying to solve this pls help :(",
          "Karma" : "1000000"
          */
    }
}

export default withRouter(ViewPost);
