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
    },
    {
        key: 'help-needed',
        text: 'help-needed',
        value: 'help-needed'
      },
      {
          key: 'announcement',
          text: 'announcement',
          value: 'announcement'
      },
      {
        key: 'events',
        text: 'events',
        value: 'events'
      },
      {
          key: 'lost and found',
          text: 'lost and found',
          value: 'lost and found'
      },
      {
        key: 'C++',
        text: 'C++',
        value: 'C++'
      },
      {
          key: 'React',
          text: 'React',
          value: 'React'
      }
]


class CreatePost extends React.Component {

    state = {tags_selected : []};

    sendPost = (event) => {
        event.preventDefault();
        // should tag_ids be in line below
        const {title, content, tag_ids} = event.target.elements;
        axios.defaults.withCredentials = true;
        axios({
			    method: 'post',
			    url: 'http://localhost:9000/post/CreatePost',
			    data: {
                title: title.value,
                tag_ids: this.state.tags_selected,
                content: content.value,
            },
            withCredentials: true
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

        if(value.length > 5) {
            alert("Too many tags selected");
            return;
        } else {
            // tags_selected is value of array
            this.setState({tags_selected: value});
        }

    }

    render() {
        return (
        <div className="createPost-container">
            <form onSubmit={this.sendPost}>
            <h1> Post </h1>
                <label>
                    Title
                    <input name="title" placeholder="Post Title" />
                </label>
                <label>
                    Content
                    <input name="content" placeholder="Post Content" />
                </label>
                <Dropdown fluid multiple selection text="tags" options={tags} onChange={this.getTags} value={this.state.tags_selected}/>
                <button type="Publish Post"> Publish Post </button>
            </form>
        </div>
        );

    }

}


export default withRouter(CreatePost);