import React, {Component} from 'react';
import db from '../db/index.js';
import { Button } from 'semantic-ui-react';
import '../css/App.css';

class Posts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_id: 0,
            post_id: 0,
            title: '',
            tag_ids: [],
            date_time: '',
            content: '',
            karma: 0,
            response_ids: []
        };

        this.firebaseRef = db.database().ref("Posts");

    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    pushToFirebase(event) {
        const {user_id, post_id, title, tag_ids, date_time, content, karma, response_ids} = this.state;
        event.preventDefault();
        this.firebaseRef.child(title).set({user_id: this.state.user_id, post_id: this.state.post_id, title: this.state.title, tag_ids: this.state.tag_ids, 
                                           date_time: this.state.date_time, content: this.state.content, karma: this.state.karma, response_ids: this.state.response_ids});
        this.setState({user_id: 0, post_id: 0, title: '', tag_ids: [], date_time: '', content: '', karma: 0, response_ids: []});
    }

    render() {
        return(

            <div>
                <label>User ID</label>
                <input onChange= {e => this.setState({user_id : e.target.value})} />
                <br />
                <label>Post_ID</label>
                <input onChange= {e => this.setState({post_id : e.target.value})} />
                <br />
                <label>Title</label>
                <input onChange= {e => this.setState({title : e.target.value})} />
                <br />
                <label>Tag IDs</label>
                <input onChange= {e => this.setState({tag_ids : e.target.value})} />
                <br />
                <label>Date and Time</label>
                <input onChange= {e => this.setState({date_time : e.target.value})} />
                <br />
                <label>Content</label>
                <input onChange= {e => this.setState({content : e.target.value})} />
                <br />
                <label>Karma</label>
                <input onChange= {e => this.setState({karma : e.target.value})} />
                <br />
                <label>Response IDs</label>
                <input onChange= {e => this.setState({response_ids : e.target.value})} />
                <br />
                <button onClick={this.pushToFirebase.bind(this)}>Push to firebase</button>
            </div>
        );
    }

}

export default Posts;
