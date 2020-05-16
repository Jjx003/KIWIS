import React from "react";


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
                <div> {this.state.tag_id} </div>
                <button> X </button> 
            </div>
        );
    }
}

export default DisplayTag;