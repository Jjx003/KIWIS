import React from 'react';
import "../css/DisplayingTags.css";
import {Label} from "semantic-ui-react";


class DisplayingTags extends React.Component {
    render() {
        let {tags} = this.props;
        if(tags === undefined){
            tags = [];
        }
        return(
            <div className="tag-display">
                {tags.map((item, i) => 
                    <Label key={i} color='purple'> 
                        {item}
                    </Label>
                )}
            </div>
        );
    }
}

export default DisplayingTags;