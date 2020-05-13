import react from "react";

class DisplayUser extends react.Component{
    constructor(props){
        super(props);

        this.state = {
            user_id: props.user_id,
            user_email: props.user_email
        };
    }

    render(){
        var pending = (this.state.user_id == null) ? true : false;

        if(pending){
            return(
                <div>
                    <div> status: pending </div>
                    <div> {this.state.user_email} </div>
                </div> 
            );
        }
        else{
            return(
                <div>
                    <div> {getUserName(this.state.user_id)} </div>
                    <div> {getUserEmail(this.state.user_id)} </div>
                    <div> {this.state.user_id} </div>
                    <button> X </button> 
                </div>
            );
        }
    }
}

export default DisplayUser;