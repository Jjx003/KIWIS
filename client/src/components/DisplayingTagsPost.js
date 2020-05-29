import React from 'react';
import { Label } from "semantic-ui-react";


class DisplayingTagsPost extends React.Component {
    render() {
        let {tags} = this.props;
        if(tags === undefined){
            tags = [];
        }
        return (
            <div className="tag-display">
                {tags.map((item, i) =>
                    <Label key={i} color='purple' size='big'>
                        {item}
                    </Label>
                )}
            </div>
        );
    }
}

export default DisplayingTagsPost;