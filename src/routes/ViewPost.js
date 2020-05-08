import React from 'react';
import {withRouter} from 'react-router-dom';

class ViewPost extends React.Component {
    render() {

        if (this.props.location.state === undefined) {
            return <h1> 404: No Post Selected </h1>;
        }
        const {postID, firstName, lastName, title, tags, datetime, content, karma} = this.props.location.state;
        return (
            <div>
            <h1> {postID || "null"} </h1>
            <h1> {firstName || "null"} </h1> 
            <h1> {lastName || "null"} </h1>
            <h1> {title || "null"} </h1>
            <h1> {tags || "null"} </h1>
            <h1> {datetime || "null"} </h1>
            <h1> {content || "null"} </h1>
            <h1> {karma || "null"} </h1>
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