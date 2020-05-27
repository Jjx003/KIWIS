import React from 'react';
import { Label } from "semantic-ui-react";


class DisplayingTagsPost extends React.Component {
    render() {
        const { tags } = this.props;
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