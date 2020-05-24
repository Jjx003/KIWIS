import React from 'react';
import "../css/PostCards.css";
import {withRouter} from 'react-router-dom';
import DisplayingTags from "./DisplayingTags";
import axios from 'axios';

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
            });
        }

        return(
            <div onClick={this.redirectToPostpage.bind(this)} className="post-cards">
                <h1 onClick={this.redirectToPostpage.bind(this)} className="PostTitle"> {this.props.title} </h1>
                <div className="PostTags">
                    <DisplayingTags tags={this.props.tag_ids}/>
                </div>

                <h3 className="Poster"> {"Created by: " + this.props.name} </h3> 
                <h3 className="PostDate"> {"Date Created: " + this.props.date_time} </h3>
            
            </div>
        );
    }
}

export default withRouter(PostCards);