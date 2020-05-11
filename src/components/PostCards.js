import React from 'react';
import "../css/PostCards.css";
import {withRouter} from 'react-router-dom';
import DisplayingTags from "./DisplayingTags";


class PostCards extends React.Component {
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
            <div onClick={this.redirectToPostpage.bind(this)} className="post-cards">
                <h1 onClick={this.redirectToPostpage.bind(this)} className="PostTitle"> {this.props.title} </h1>
                <div className="PostTags">
                    <DisplayingTags tags={this.props.tags}/>
                </div>

                <h3 className="Poster"> {"Created by: " + this.props.firstName + " " + this.props.lastName} </h3> 
                <h3 className="PostDate"> {"Date Created: " + this.props.datetime} </h3>
               

                

            </div>
        );
    }
}

export default withRouter(PostCards);