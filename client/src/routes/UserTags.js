import React from 'react';
import "../css/usertags.css";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';



class UserTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {},
            user_info: {}
        };


        // gets the tag list of the company
        axios.defaults.withCredentials = true;
		axios({
			method: 'post',
			url: 'http://localhost:9000/tags/getTags',
            withCredentials: true,
		  })
		  .then((response) => { 
			if (response != undefined) { 
                this.setState({info: response.data});   

			} else {
				console.log("error with tags.");
			}
		  })
		  .catch((error) => {
			console.log(error);
          });
          

        // gets the user tags list
        axios.defaults.withCredentials = true;
		axios({
			method: 'post',
			url: 'http://localhost:9000/users/userTags',
            withCredentials: true,
		  })
		  .then((response) => { 
              console.log(response.data);
			if (response != undefined) { 
                this.setState({user_info: response.data});   

			} else {
				console.log("error with tags.");
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
    }

    resetTags = (event) => {
        event.preventDefault();
        // should tag_ids be in line below
        axios.defaults.withCredentials = true;
        axios({
			method: 'post',
			url: 'http://localhost:9000/users/removeAllUserTags',
            withCredentials: true
          })

          .then((response) => {
			if (response.data.success) {
                // Wait until update processes before redirecting
                alert("Removed All Tags!");
                // Redirect to home page
			} else {
				console("um functional error?");
			}
		  })
		  .catch((error) => {
			console.log(error);
          });
          
          window.location.reload(false);
    }



    // adds a specialization
    addSpecialization = (event) => {
        // should tag_ids be in line below
        event.preventDefault();
        var currTag = event.target.innerHTML;

        axios.defaults.withCredentials = true;
        axios({
			method: 'post',
            url: 'http://localhost:9000/users/addSpecialization',
            data: {
                tag: currTag
            },
            withCredentials: true
          })

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

          window.location.reload(false);

    }



    // removes a specialization
    removeSpecialization = (event) => {
        // should tag_ids be in line below
        event.preventDefault();
        var currTag = event.target.innerHTML;

        axios.defaults.withCredentials = true;
        axios({
			method: 'post',
            url: 'http://localhost:9000/users/removeSpecialization',
            data: {
                tag: currTag
            },
            withCredentials: true
          })

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
          
          window.location.reload(false);

    }
    


    render() {
        const {info} = this.state;
        const {user_info} = this.state;
        //const tags = Object.keys(info).map(x => { return { key: x, text: x, value: x } });


        return(
            <div>
            <Navbar/>
            <div className="mainTagsPage">
                <div className="mainContainer"> 
                    <h1>
                        Specializations Page
                    </h1>
                    <div className="tagListBox">
                        { Object.keys(info).map((key, i) => { 
                           
                            if(user_info.hasOwnProperty(key)) {
                                return <button onClick={this.removeSpecialization.bind(this)} className='tagButton2'>{key}</button>
                            }
                            else {
                                return <button onClick={this.addSpecialization.bind(this)} className='tagButton'>{key}</button>
                            }
                        })}
                    </div>
                    <div className="doneButtons">
                        <button onClick={this.resetTags} className="resetButton">Reset Specializations</button>
                        <Link to="/">
                            <button className="completeButton"> Complete Specializations</button>
                        </Link>
                    </div>
                </div>
                <div className="endText">
                    <p1>
                        © All Rights Reserved. KIWI by Symps.
                    </p1>
                </div>
            </div>
            </div>
        )
    }
}
   

export default UserTags;

