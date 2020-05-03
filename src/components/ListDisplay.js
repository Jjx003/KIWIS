import db from '../db/index';
import React from 'react';
import { List } from 'semantic-ui-react';


class ListDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };

        this.firebaseRef = db.database().ref("ALGOLIA_TESSTING");
        this.firebaseRef.on('value', postSnapshot => {
            let posts = [];
            postSnapshot.forEach(postId => {
                let post = postId.val();
                post['.key'] = postId.key;
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
                    <List.Item key={post.Title}>
                        <List.Content>
                            <List.Header>{post.Title}</List.Header>
                        </List.Content>
                    </List.Item>)}
                <List.Item>
                    <List.Content>
                        <List.Header>test</List.Header>
                    </List.Content>
                </List.Item>
            </List>
        )
    }

}

export default ListDisplay;