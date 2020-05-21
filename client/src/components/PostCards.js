import React from 'react';
import "../css/PostCards.css";
import {withRouter} from 'react-router-dom';
import DisplayingTags from "./DisplayingTags";


class PostCards extends React.Component {
    state = {
        buttonClicked: false
    }
    
    redirectToPostpage() {
        this.setState({buttonClicked: true});
    }

    componentWillUnmount() {
        this.setState({buttonClicked: false});
    }

    render() {
        const {history} = this.props;
        if(this.state.buttonClicked) {
            history.push({      //change to replace and add back button
                pathname: '/viewPost/'+this.props.post_id.toString(), 
                /*state: {postID: this.props.post_id,
                        firstName: this.props.firstName,
                        lastName: this.props.lastName,
                        title: this.props.title, 
                        tags: this.props.tag_ids,
                        datetime: this.props.date_time,
                        karma: this.props.karma,
                        content: this.props.content,
                        responses: this.props.responses
                }*/
            });
        }

    
        return(
            <div onClick={this.redirectToPostpage.bind(this)} className="post-cards">
                <h1 onClick={this.redirectToPostpage.bind(this)} className="PostTitle"> {this.props.title} </h1>
                <div className="PostTags">
                    <DisplayingTags tags={this.props.tag_ids}/>
                </div>

                <h3 className="Poster"> {"Created by: " + this.props.firstName + " " + this.props.lastName} </h3> 
                <h3 className="PostDate"> {"Date Created: " + this.props.date_time} </h3>
            
            </div>
        );
    }
}

export default withRouter(PostCards);