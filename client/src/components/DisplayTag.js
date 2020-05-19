import React from "react";
import "../css/DisplayTags.css"

class DisplayTag extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tag_id: this.props.tag_id
        };
    }

    render(){
        return(
           <div>
                <button className="tagButtonDT"> {this.state.tag_id} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; x</button>
            </div>
        );
    }
}

export default DisplayTag;