import React from 'react';
import "../css/PostCards.css";
import {withRouter} from 'react-router-dom';
import DisplayingTags from "./DisplayingTags";

class PostCards extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            buttonClicked: false
        }
        this.redirectToPostpage = this.redirectToPostpage.bind(this);
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
            <div onClick={this.redirectToPostpage} className="post-cards">
                <h1 className="PostTitle"> {this.props.title} </h1>
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