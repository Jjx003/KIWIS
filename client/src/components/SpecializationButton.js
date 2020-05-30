import React from "react";
import "../css/usertags.css"
import axios from 'axios';

class SpecializationButton extends React.Component{
    constructor(props){
        super(props);

        // takes in what tag we print and a list of user info and the class 
        this.state = {
            thisTag: this.props.tag,
            user_info: this.props.user_tags,
            tagButton: 'tagButton'
        };
        
        this.updateButton();
    }

    updateButton = () => {
        if(this.state.user_info.hasOwnProperty(this.state.thisTag) && this.state.tagButton == 'tagButton') {
            this.setState({tagButton: 'tagButton2'});
        }
     }

    // adds a specialization
    addSpecialization = (thisTag) => {
        // this tag is what we are removing
        var currTag = thisTag;

        axios.defaults.withCredentials = true;
        axios({
			method: 'post',
            url: 'http://localhost:9000/users/addSpecialization',
            data: {
                tag: currTag
            },
            withCredentials: true
          })
          // print statements
          .then((response) => {
			if (response.data.success) {
                // Wait until update processes before redirecting
                console.log("Tag was successfully added!");
                this.state.user_info[thisTag] = thisTag;
			} else {
				console.log("Tag was not added");
            }
		  })
		  .catch((error) => {
			console.log(error);
          });
    }


    // removes a specialization from a user
    removeSpecialization = (thisTag) => {
        // this tag is what we are removing
        var currTag = thisTag;

        axios.defaults.withCredentials = true;
        axios({
			method: 'post',
            url: 'http://localhost:9000/users/removeSpecialization',
            data: {
                tag: currTag
            },
            withCredentials: true
          })
          // gets the response and prints console.
          .then((response) => {
			if (response.data.success) {
                // Wait until update processes before redirecting
                console.log("Tag was successfully removed!");
                delete this.state.user_info[thisTag];
			} else {
				console.log("Tag was not added");
            }
		  })
		  .catch((error) => {
			console.log(error);
          });
    }


    render(){
        const {tagButton} = this.state;
        const {user_info} = this.state;
        this.updateButton();

        // method to change what is currently on page
        const handleToggle = () => {
            if(user_info.hasOwnProperty(this.state.thisTag)) {
                this.removeSpecialization(this.state.thisTag);
                this.setState({tagButton: 'tagButton'});
            }
            else {
                this.addSpecialization(this.state.thisTag);
                this.setState({tagButton: 'tagButton2'});
            }
        }
        
        // just prints one button with the styling
        return (
            <button onClick={handleToggle} className={tagButton}>{this.state.thisTag}</button>
        );
    
    }
}

export default SpecializationButton;