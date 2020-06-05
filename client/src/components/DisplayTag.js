import React from "react";
import "../css/DisplayTags.css"
import axios from 'axios';

class DisplayTag extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            removed: false,
            tag_id: this.props.tag_id
        };
    }

    render() {
        const handleRemove = () => {
            if (window.confirm("Removing " + this.state.tag_id)) {
                axios({
                    method: 'post',
                    url: 'https://kiwi-test-app.herokuapp.com/tags/remove',
                    data: {
                        tagName: this.state.tag_id
                    }
                }).then((response) => {
                    this.setState({ removed: true });
                });
            }
        }

        if (this.state.removed) {
            return (
                <div className="tagButtonDT">
                    <div className="removed"> removed </div>
                </div>);
        }
        return (
            <div>
                <button onClick={handleRemove} className="tagButtonDT"> {this.state.tag_id} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; x</button>
            </div>
        );
    }
}

export default DisplayTag;