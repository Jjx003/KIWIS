import React from 'react';
import "../css/PostCards.css";
import DisplayingTags from "./DisplayingTags";

class PostCards extends React.Component {
    render() {
        return(
            <div className="post-cards">
                <h1 className="PostTitle">Testing, Question goes here, need help, hello world program is giving IndexOutOfBounds error!
                    I swear I didn't forget the semicolons this time :((fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    f</h1>
                <div className="PostTags">
                    <DisplayingTags />
                </div>
                <h3 className="Poster">Created by: Luis Arroyo</h3>
                <h3 className="PostDate">Post Date: 05/06/2020</h3>
            </div>
        );
    }
}

export default PostCards;