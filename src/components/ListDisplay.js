import {db,dbRef} from '../db/index';
import React from 'react';
import { List } from 'semantic-ui-react';
import * as firebase from 'firebase';

class ListDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };

        this.firebaseRef = dbRef;
        this.firebaseRef.on('value', postSnapshot => {
            let posts = [];
            postSnapshot.forEach(postId => {
                let post = postId.val();
                post['.key'] = postId.key;
                console.log(postId.key);
                console.log(post);
                posts.push(post);
            });
            this.setState({ posts });
        });
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    render() {
        return (
            <List divided>
                {this.state.posts.map(post =>
                    <List.Item key={post.title}>
                        <List.Content>
                            <List.Header>Title: {post.title}</List.Header>
                            <List.Header>Content: {post.content}</List.Header>
                            <List.Header>Tags: {post.tag_ids.map((tag) => <List.Item>{tag}</List.Item>)}</List.Header>
                        </List.Content>
                    </List.Item>)

                }

            </List>
        )
    }

}

export default ListDisplay;