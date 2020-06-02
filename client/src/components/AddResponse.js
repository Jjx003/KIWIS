import React from 'react';
import "../css/Forum.css"
import '../css/App.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import "../css/AddResponse.css"


class AddResponse extends React.Component {

    addResponse = (event) => {
        event.preventDefault();
        const { responseText } = event.target.elements;
        axios.defaults.withCredentials = true;
        axios({
            method: 'POST',
            url: 'https://kiwi-test-app.herokuapp.com/response/AddResponse',
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
                    this.props.responseUpdate()
                    responseText.value = ""
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
                    <div className={"writingReply"}>
                        <textarea name={"responseText"} className={"responseText"} placeholder={"Write your response here."} />
                        <div className={"postResponse"}>
                            <button className={"button"}>Post Response</button>
                        </div>
                    </div>

                </div>
            </form>
        );
    }
}

export default withRouter(AddResponse);
