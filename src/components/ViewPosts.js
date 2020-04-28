import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react'

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
            <div>
                {this.state.title}
                {this.state.post_from}
                {this.state.post_id}

                <div style = {{ fontWeight: this.state.endorsed ? "bold": "normal"}}> 
                    {this.state.content}
                </div>
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
        );
    }
}

export default ViewPosts;