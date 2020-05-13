import React from 'react';
import "../css/HomePosts.css";
import PostCards from "./PostCards";
import {withRouter} from 'react-router-dom';
import data from '../dummy_data/dummy_posts.js';


class HomePosts extends React.Component {
    render() {
        
        return(
            <div className="posts-container">    
                {data.map( (item, i) => 
                <PostCards key={i} postID={item.postID} userID={item.userID} title={item.title}
                    tags={item.tags} datetime={item.datetime} karma={item.karma} 
                    content={item.content} firstName={item.firstName} lastName={item.lastName}
                    responses={item.responses}/>
                )}
                
            </div>
        );
    }
}

export default withRouter(HomePosts);