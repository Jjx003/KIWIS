import React from 'react';
import "../css/Forum.css"
import '../css/App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { AuthContext, UpdateContext } from "../auth/Auth"
import { withRouter } from 'react-router-dom';
import {Icon} from "semantic-ui-react";


class AddResponse extends React.Component {



    addResponse = (event) => {

        event.preventDefault();
        const {responseText} = event.target.elements;
        axios.defaults.withCredentials = true;
        axios({
			method: 'POST',
			url: 'http://localhost:9000/response/AddResponse',
			data: {
                post_id: this.props.postID,
                content: responseText.value,
            },
            withCredentials: true
          })

          .then((response) => {
			if (response.data.success) {
                // Wait until update processes before redirecting
                // Redirect to home page
				// this.props.history.refresh(this.props.postID);
			} else {
				alert("Response was not created. Try again.");
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
    }



    render() {
        return (
            <form onSubmit={this.addResponse}>
        <div className="AddResponse-submission">
            {/*<form onSubmit={this.addResponse}>*/}
            {/*    <label>*/}
            {/*        Post*/}
            {/*        <input name="post_id" placeholder="Post_ID" />*/}
            {/*    </label>*/}
            {/*    <label>*/}
            {/*        Response Content*/}
            {/*        <input name="content" placeholder="Response Content" />*/}
            {/*    </label>*/}
            {/*    <button type="Submit Response"> Submit Response </button>*/}
            {/*</form>*/}
            {/*<form onSubmit={this.pullResponse}>*/}
            {/*    <label>*/}
            {/*        Post_ID*/}
            {/*        <input name = "post_id1" placeholder = "POST_ID" />*/}
            {/*    </label>*/}
            {/*    <button type="Pull response"> Pull responses</button>*/}
            {/*</form>*/}
            {/*nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn*/}
            <div className={"writingReply"}>
                <div className={"leftSide"}>
                    <div className={"rPoster"}>
                        <h2 className={"responder"}>{"Gary" + ": "}</h2>
                    </div>
                    <div>
                        <button className={"button"}>Post Response</button>
                    </div>
                </div>

                <textarea name={"responseText"} placeholder={"Write your response here."}/>
            </div>
        </div>
                </form>
        );

    }

}


export default withRouter(AddResponse);
