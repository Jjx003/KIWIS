import React from 'react';
import {Dropdown} from "semantic-ui-react"
import { useContext } from 'react';
import '../css/App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { AuthContext, UpdateContext } from "../auth/Auth"
import { withRouter } from 'react-router-dom';

const tags = [
    {
      key: 'Machine Learning',
      text: 'Machine Learning',
      value: 'Machine Learning'
    },
    {
        key: 'Python',
        text: 'Python',
        value: 'Python'
    }
]


class CreatePost extends React.Component {

    state = {tags_selected : []};

    sendPost = (event) => {
        event.preventDefault();
        const {title, content, tag_ids} = event.target.elements;
        axios({
			method: 'post',
			url: 'http://localhost:9000/post/CreatePost',
			data: {
                title: title.value,
                tag_ids: this.state.tag_selected,
                content: content.value,
			}
          })

          .then((response) => {
			if (response.data.success) {
                // Wait until update processes before redirecting
                alert("Post was successfully created!");
                // Redirect to home page
				this.props.history.replace('/');
			} else {
				alert("Post was not created. Try again.");
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });

    }

    getTags = (event, {value}) => {
        console.log(value);
        let tags_selected = event.target.textContent;
        console.log(tags_selected);
    }

    render() {

        


        return (
        <div className="createPost-container">
            <form onSubmit={this.sendPost}>
            <h1> hey </h1>
                <label>
                    Title
                    <input name="title" placeholder="Post Title" />
                </label>
                <label>
                    Post Content
                    <input name="content" placeholder="Post Content" />
                </label>
                <Dropdown fluid multiple selection text="tags" options={tags} onChange={this.getTags}/>


                <button type="Publish Post"> Publish Post </button>
            </form>
        </div>
        
        );
    }
}


export default withRouter(CreatePost);