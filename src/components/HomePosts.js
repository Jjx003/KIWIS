import React from 'react';
import "../css/HomePosts.css";
import PostCards from "./PostCards";

class HomePosts extends React.Component {
    render() {
        return(
            <div className="posts-container">
                <PostCards />
                <PostCards />
            </div>
        );
    }
}

export default HomePosts;