import {db,dbRef} from '../db/index';
import React from 'react';
import { List } from 'semantic-ui-react';
import * as firebase from 'firebase';
import '../css/index.css'
import Navbar from './Navbar';

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
                post.visible = true;    //make everything visible first
                posts.push(post);
            });
            this.setState({ posts });
        });

        this.updateStateDisp = this.updateStateDisp.bind(this);
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    //should be in the db file
    searchTags(value, keyList){
        return this.firebaseRef.once('value', postSnapshot => {
            let posts = [];
            postSnapshot.forEach(postId => {
                postId.val().tag_ids.forEach( tag => {
                    if(value.includes(tag)){
                        keyList.push(postId.key);
                    }
                });
            })
        });
    }

    //updates and queris every time tag is removed or added
    updateStateDisp(value) {
        let keyList = []
        this.searchTags(value,keyList);
        //console.log(keyList);
        if(this.state.posts){
            this.setState( prev => {
                posts:  prev.posts.map(
                    post => {
                        {
                        if(value.length == 0){
                            Object.assign(post, {visible: true});
                        }
                        else if(keyList.includes(post['.key'])){
                            Object.assign(post, {visible: true});
                            console.log(post);}
                        else
                            Object.assign(post, {visible:false});
                        
                        }}
                )}
            )
            this.forceUpdate();     //this is big no no
        }
    }
    
    render() {
        return (
            <div>
            <Navbar updateForumDisp={this.updateStateDisp}/>
            <List divided>
                {this.state.posts.map(post => {
                    if(post.visible)   
                        return <List.Item key={post.title}>
                            <List.Content>
                                <List.Header>Title: {post.title}</List.Header>
                                <List.Header>Content: {post.content}</List.Header>
                                <List.Header>Tags: {
                                        post.tag_ids.map((tag) => <List.Item>{tag}</List.Item>)}
                                </List.Header>
                            </List.Content>
                        </List.Item>
                    })   
                }

            </List>
            </div>
        )
    }

}

export default ListDisplay;