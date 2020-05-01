import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react'
import "../css/App.css"
class ViewResponse extends Component
{
    state = {
        response_id: 0,
        response_from: "Gary Gillespie",
        up_votes: 0,
        endorsed: false,
        content: "Random Response: iofhasdio po dsois siaodh oisadaoi ope hiao hupodgup wi iasohd oia lios ghoasi"
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

    handleEndorse = () => {
        this.setState(({ endorsed }) => ({
            endorsed: !endorsed
          }));

    };

    render()
    {
        return (
            <div className = "view_response">
                <div className = "responder"> {this.state.response_from} </div>
                <div className= "responder_tags" > tags </div>
                <div className = "view_response_rate">
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
                </div>
                <br></br>
                <br></br>

                <div className = "view_response_content" style = {{ fontWeight: this.state.endorsed ? "bold": "normal"}}> 
                    {this.state.content}
                </div>
            </div>
        );
    }
}

export default ViewResponse;