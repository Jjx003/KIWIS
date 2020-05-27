import React from 'react';
import "../css/PostCards.css";
import { withRouter } from 'react-router-dom';
import "../css/Forum.css"
import DisplayingTagsPost from "./DisplayingTagsPost";

class OriginalPoster extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstPoster: this.props.firstPoster,
            postID: this.props.postID,
            name: this.props.name,
            title: this.props.title,
            tags: this.props.tags,
            datetime: this.props.datetime,
            karma: this.props.karma,
            content: this.props.content
        };
    }

    render() {
        return (
            <div className={"original-post"}>
                <div className={"header"}>
                    <h1 className={"title"} style={{ color: "black" }}>{this.state.title}</h1>
                </div>
                <div className={"postInfo"}>
                    <div>
                        <h2 className={"postID"}>{this.state.postID}</h2>
                    </div>
                    <div className={"postBy"}>
                        <h2>{"Posted by: " + this.state.name}</h2>
                    </div>
                    {this.state.firstPoster ? <div></div> :
                        <span>
                            <button className={"button"}>Follow Post</button>
                        </span>
                    }
                </div>
                <div className={"content"}>
                    <p className={"text-content"}>{this.state.content}</p>
                </div>
                <div className={"bottom-section"}>
                    <div className={"datetime"}>
                        <h3 className={"createdDate"}>{"Created on: " + this.state.datetime}</h3>
                        {this.state.firstPoster ? <h1 className={"karma"}><button className={"button"}>Edit Post</button>{"+ " + this.state.karma}</h1> :
                            <h1 className={"karma"}>
                                <button className={"button"}>View Endorsed</button>
                                <button className={"button"}>Upvote Response</button>
                                {"+ " + this.state.karma}</h1>
                        }
                    </div>
                    <div className={"tagList"}>
                        <DisplayingTagsPost tags={this.state.tags} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(OriginalPoster);