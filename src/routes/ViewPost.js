import React from 'react';
import Navbar from '../components/Navbar';
import '../css/Home.css';
import OriginalPoster from "../components/OriginalPoster";
import HomePosts from "../components/HomePosts";
import {withRouter}from 'react-router-dom';
import data from "../dummy_data/dummy_posts";
import PostCards from "../components/PostCards";
import Response from "../components/Response";

class ViewPost extends React.Component {
    render() {

        if (this.props.location.state === undefined) {
            return <h1> 404: No Post Selected </h1>;
        }
        const {postID, userID, firstName, lastName, title, tags, datetime, content, karma} = this.props.location.state;
        return (
            <div className={"container"}>
                <div>
                    <Navbar />
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
                    <OriginalPoster postID={postID} userID={userID} title={title}
                                   tags={tags} datetime={datetime} karma={karma}
                                   content={content} firstName={firstName} lastName={lastName}/>
                                   <Response userID={userID} datetime={datetime} karma={karma}
                                             content={content} firstName={firstName} lastName={lastName}/>
                    </div>
                </div>
          </div>


          /*
            "userID": "dumbo jumbo",
            "title": "What's 2+2?",
            "tags": ["math", "dumbass"],
            "Datetime": "May 6, 2020",
            "Content": "I've been up for days trying to solve this pls help :(",
            "Karma" : "1000000"
            */
        );
    }
}

export default withRouter(ViewPost);