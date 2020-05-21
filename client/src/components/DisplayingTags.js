import React from 'react';
import "../css/DisplayingTags.css";
import {Label} from "semantic-ui-react";


class DisplayingTags extends React.Component {
    render() {
        const {tags} = this.props;
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