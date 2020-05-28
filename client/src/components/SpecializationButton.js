import React from "react";
import "../css/usertags.css"
import axios from 'axios';

class SpecializationButton extends React.Component{
    constructor(props){
        super(props);

        // takes in what tag we print and a list of user info and the class 
        this.state = {
            thisTag: this.props.tag,
            user_info: {},
            theClass: 'tagButton'
        };

        // updates to see if the user has the tag
        this.getUserInfo();
          
    }

    // gets the current information on what tags user has
    getUserInfo = () => {
        // gets the user tags list
        axios.defaults.withCredentials = true;
        axios({
            method: 'get',
            url: 'http://localhost:9000/users/userTags',
            withCredentials: true,
        })
        .then((response) => { 
            // rechecks if the user has the tag 
            if (response !== undefined) { 
                // updates user
                this.setState({user_info: response.data});   
                if(response.data.hasOwnProperty(this.state.thisTag)) {
                    this.setState({theClass: 'tagButton2'});
                }
            } else {
                console.log("error with tags.");
            }
        })
        .catch((error) => {
            console.log(error);
        });
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
                // Redirect to home page
				this.props.history.replace('/');
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
                console.log("Tag was successfully added!");
                // Redirect to home page
				this.props.history.replace('/');
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

        // method to change what is currently on page
        const handleToggle = () => {
            this.getUserInfo();
            if(user_info.hasOwnProperty(this.state.thisTag)) {
                this.removeSpecialization(this.state.thisTag);
                this.setState({theClass: 'tagButton'});
            }
            else {
                this.addSpecialization(this.state.thisTag);
                this.setState({theClass: 'tagButton2'});
            }
        }
        
        // just prints one button with the styling
        return (
            <button onClick={handleToggle} className={this.state.theClass}>{this.state.thisTag}</button>
        );
    
    }
}

export default SpecializationButton;