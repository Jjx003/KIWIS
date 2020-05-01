import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react'
import "../css/App.css"
class ViewPosts extends Component
{
    state = {
        post_id: 0,
        post_from: "Gary Gillespie",
        up_votes: 0,
        tags: ["A", "B", "C"],
        title: "Random Title",
        content: "Random Post: iofhasdio po dsois siaodh oisadaoi ope hiao hupodgup wi iasohd oia lios ghoasi"
    };

    constructor(props)
    {
        super(props);
        //request info from firebase based on response_id
    }
    
    handleUpVote = () => {
        this.setState(({ up_votes }) => ({
            up_votes: up_votes + 1
          }));
    };

    render()
    {
        return (
            <div className = "view_posts">
                <div className= "view_post_title"> {this.state.title} </div>
                <div className = "view_post_tags"> TAGS </div>
                <div className= "view_post_id"> #{this.state.post_id} </div>
                    
                <div className= "view_post_owner"> {this.state.post_from} </div>

                <div className = "view_post_content"> 
                    {this.state.content}
                </div>
                <div className = "view_post_rate">
                    <Button as='div' labelPosition='right'>
                        <Button onClick = {this.handleUpVote}>
                            Up-Vote!
                        </Button>
                        <Label as='a' basic>
                            {this.state.up_votes}
                        </Label>
                    </Button>
                    <Button> Jump to best response! </Button>
                </div>
            </div>
        );
    }
}

export default ViewPosts;