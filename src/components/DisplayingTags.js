import React from 'react';
import "../css/DisplayingTags.css";
import {Label} from "semantic-ui-react";


class DisplayingTags extends React.Component {
    render() {
        return(
            <div className="tag-display">
                <Label as='a' color='purple'>
                    Java
                </Label>
                <Label as='a' color='purple'>
                    c
                </Label>
                <Label as='a' color='purple'>
                    c++
                </Label>
                <Label as='a' color='purple'>
                    runtime error
                </Label>
                <Label as='a' color='purple'>
                    command line
                </Label>
                <Label as='a' color='purple'>
                    Print
                </Label>
                <Label as='a' color='purple'>
                    Test
                </Label>
                <Label as='a' color='purple'>
                    Javascript
                </Label>
                <Label as='a' color='purple'>
                    Vim
                </Label>
                <Label as='a' color='purple'>
                    Python
                </Label>
                <Label as='a' color='purple'>
                    Starter Code
                </Label>
                <Label as='a' color='purple'>
                    Github
                </Label>
            </div>
        );
    }
}

export default DisplayingTags;