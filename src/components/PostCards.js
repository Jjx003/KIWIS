import React from 'react';
import "../css/PostCards.css";
import {withRouter} from 'react-router-dom';

class PostCards extends React.Component {
    /*
    this.state = {
        postID: , 
        userID:,
        tags: [],
        karma:,
        responses: [],
        // followerIDs: []
    }*/
    state = {
        buttonClicked: false
    }
    constructor(props) {
        super(props);
    }

    redirectToPostpage() {
        console.log("in here");
        this.setState({buttonClicked: true});
    }

    componentWillUnmount() {
        this.setState({buttonClicked: false});
    }

    render() {
        const {history} = this.props;
        if(this.state.buttonClicked) {
            history.push({
                pathname: '/viewPost', 
                state: {postID: this.props.postID,
                        firstName: this.props.firstName,
                        lastName: this.props.lastName,
                        title: this.props.title, 
                        tags: this.props.tags,
                        datetime: this.props.datetime,
                        karma: this.props.karma,
                        content: this.props.content
                }
            });
        }

    
        return(
            <div className="post-cards">
                <h1 className="PostTitle"> {this.props.postID} </h1>
                <h1 className="PostTitle"> {this.props.firstName} </h1> 
                <h1 className="PostTitle"> {this.props.lastName} </h1>
                <h1 className="PostTitle"> {this.props.title} </h1>
                <h1 className="PostTitle"> {this.props.tags} </h1>
                <h1 className="PostTitle"> {this.props.datetime} </h1>
                <button onClick={this.redirectToPostpage.bind(this)}> Button </button>
            </div>
        );
    }
}

export default withRouter(PostCards);