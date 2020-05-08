import React from 'react';
import "../css/PostCards.css";
import {withRouter} from 'react-router-dom';
import DisplayingTags from "./DisplayingTags";


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
<<<<<<< HEAD
                <h1 className="PostTitle"> {this.props.postID} </h1>
                <h1 className="PostTitle"> {this.props.firstName} </h1> 
                <h1 className="PostTitle"> {this.props.lastName} </h1>
                <h1 className="PostTitle"> {this.props.title} </h1>
                <h1 className="PostTitle"> {this.props.tags} </h1>
                <h1 className="PostTitle"> {this.props.datetime} </h1>
                <button onClick={this.redirectToPostpage.bind(this)}> Button </button>
=======
                <h1 className="PostTitle">Testing, Question goes here, need help, hello world program is giving IndexOutOfBounds error!
                    I swear I didn't forget the semicolons this time :((fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    f</h1>
                <div className="PostTags">
                    <DisplayingTags />
                </div>
                <h3 className="Poster">Created by: Luis Arroyo</h3>
                <h3 className="PostDate">Post Date: 05/06/2020</h3>
>>>>>>> 42b621e3d7eafff9d339b88022f53bf4f0a787f8
            </div>
        );
    }
}

export default withRouter(PostCards);