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
            exists: false
        };

    }



    // adds a specialization
    addSpecialization = (thisTag) => {
        // this tag is what we are removing
        var currTag = thisTag;
        if (this.state.user_info == '' ) {
            var newJSON = {};
        } else {
            var newJSON = this.state.user_info;
        }
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
                console.log("successfully added");

                newJSON[thisTag] = thisTag;
                this.setState({user_info: newJSON});
                this.setState({exists: true});
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
        if (this.state.user_info == '' ) {
            var newJSON = {};
        } else {
            var newJSON = this.state.user_info;
        }
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
                delete newJSON[thisTag];

                this.setState({user_info: newJSON});
                this.setState({exists: false});
			} else {
				console.log("Tag was not added");
            }
		  })
		  .catch((error) => {
			console.log(error);
          });
    }




    render(){
        const {user_info} = this.state;
        const {thisTag} = this.state;

        var tagButton = 'tagButton';
        if(user_info.hasOwnProperty(thisTag)) {
            tagButton = 'tagButton2';
        }

        // method to change what is currently on page
        const handleToggle = () => {
            if(user_info.hasOwnProperty(thisTag)) {
                this.removeSpecialization(thisTag);
            }
            else {
                this.addSpecialization(thisTag);
            }
        }
        
        // just prints one button with the styling
        return (
            <button onClick={handleToggle} className={tagButton}>{thisTag}</button>
        );
    
    }
}

export default SpecializationButton;