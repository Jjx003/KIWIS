import React from 'react';
import {Dropdown} from "semantic-ui-react"
import '../css/App.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class CreatePost extends React.Component {

    state = {tags_selected : [], tags: []};

    componentWillMount() {
        axios({
			method: 'get',
			url: 'http://localhost:9000/tags/',
		})
		.then((response) => { 
		    if (response.data.success) { 
                for(var key in response.data.tags){
                    var x = response.data.tags[key].key;
                    this.setState({tags:[...this.state.tags, { key: x, text: x, value: x }]});
                }
			} else {
				console.log("bad");
			}
		})
		.catch((error) => {
		    console.log(error);
        });
    }

    sendPost = (event) => {
        event.preventDefault();
        // should tag_ids be in line below
        const {title, content} = event.target.elements;
        axios.defaults.withCredentials = true;
        axios({
			    method: 'post',
			    url: 'http://localhost:9000/posts/CreatePost',
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
                <Dropdown fluid multiple selection text="tags" options={this.state.tags} onChange={this.getTags} value={this.state.tags_selected}/>
                <button type="Publish Post"> Publish Post </button>
            </form>
        </div>
        );

    }

}


export default withRouter(CreatePost);