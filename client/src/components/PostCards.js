import React from 'react';
import "../css/PostCards.css";
import {withRouter} from 'react-router-dom';
import DisplayingTags from "./DisplayingTags";

const tStyle = {
    fontSize: '1.5vw',
};

const dStyle = {
    fontSize: '1vw',
};

class PostCards extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        const {history} = this.props;
        history.push({      //change to replace and add back button
            pathname: '/viewPost/' + this.props.post_id.toString(),
        });
    }

    render() {
        return (
            <div onClick={this.handleClick.bind(this)} className="post-cards">
                <div className={"PostTitle"}>
                    <h1 style={tStyle}> {this.props.title} </h1>
                </div>
                <div className={"Poster"}>
                    <h3 style={dStyle}> {"Created by: " + this.props.name} </h3>
                </div>
                <div className="PostTags">
                    <DisplayingTags tags={this.props.tag_ids}/>
                </div>
                <div className={"PostDate"}>
                    <h3 style={dStyle}> {"Date Created: " + this.props.date_time} </h3>
                </div>
            </div>
        );
    }
}

export default withRouter(PostCards);