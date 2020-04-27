import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react'

class ViewResponse extends Component
{
    state = {
        response_id: 0,
        response_from: "Gary Gillespie",
        up_votes: 0,
        endorsed: false,
        content: "Random Response: iofhasdio po dsois siaodh oisadaoi ope hiao hupodgup wi iasohd oia lios ghoasi"
    };

    handleUpVote = () => {
        this.setState(({ up_votes }) => ({
            up_votes: up_votes + 1
          }));

    };

    handleEndorse = () => {
        this.setState(({ endorsed }) => ({
            endorsed: !endorsed
          }));

    };

    render()
    {
        return (
            <div>
                {this.state.response_from}
                <Button as='div' labelPosition='right'>
                    <Button onClick = {this.handleUpVote}>
                        Up-Vote!
                    </Button>
                    <Label as='a' basic>
                        {this.state.up_votes}
                    </Label>
                </Button>
                <Button onClick = {this.handleEndorse}>
                    Endorse
                </Button>
                <div style = {{ fontWeight: this.state.endorsed ? "bold": "normal"}}> 
                    {this.state.content}
                </div>
            </div>
        );
    }
}

export default ViewResponse;