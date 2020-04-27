import React, {Component} from 'react';
import db from '../db/index'

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: 0,
            post_id: 1,
            title: "post's title",
            tag_ids: [],
            date_time: "post's date/time",
            content: "post's content",
            karma: 2,
            response_ids: []

        };

        this.firebaseRef = db.database().ref("Posts");

    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    pushToFirebase(event) {
        const {title, content} = this.state;
        event.preventDefault();
        this.firebaseRef.child(title).set({title: this.state.title, content: this.state.content});
        this.setState({title: '', content: ''});
    }

    render() {
        return(

            <div>
                <label>Title</label>
                <input onChange= {e => this.setState({title : e.target.value})} />
                <br />
                <label>Content</label>
                <input onChange= {e => this.setState({content : e.target.value})} />
                <br />
                <button onClick={this.pushToFirebase.bind(this)}>Publish</button>
            </div>
        );
    }

}

export default Posts;
