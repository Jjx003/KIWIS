import {db,dbRef, updateAlgolia, searchClient} from '../db/index';
import React from 'react';
import { List } from 'semantic-ui-react';
import '../css/index.css'
import Navbar from './Navbar';
import Posts from '../components/Posts.js'
import {
    InstantSearch,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
    ClearRefinements,
    RefinementList,
    Configure, } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';

class ListDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };

        //should be in db file
        this.firebaseRef = dbRef;
        this.firebaseRef.on('value', postSnapshot => {
            let posts = [];
            postSnapshot.forEach(postId => {
                let post = postId.val();
                post['.key'] = postId.key;
                console.log(postId.key);
                console.log(post);
                post.visible = true;    //make everything visible first
                posts.unshift(post);    //push to front of array so new items shown first
            });
            this.setState({ posts });
        });

        this.updateStateDisp = this.updateStateDisp.bind(this);
    }
    
    componentWillMount() {
        //updateAlgolia();
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
                    if(value.includes(tag)){    //add in order of matching tags
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
            this.forceUpdate();     //this is big no no needs to fix
        }
    }
    
    render() {
        return (
            <div>
            <InstantSearch indexName='test' searchClient={searchClient}>
            <Navbar updateForumDisp={this.updateStateDisp}/>
            <div className='left'> 
            <Posts/>
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
            <div className='right'>
                <SearchBox searchAsYouType={true}   //need to incorporate searchbox into navbar
                    translations={{
                    placeholder: "What's your question?",
                    }}/>
                <p>Need to implement this within search in navbar</p>
                <h5>Results</h5>
                <Hits hitComponent={Hit}/>
            </div>
            </InstantSearch>
            </div>
        )
    }

}

function Hit(props) {
    return (
      <div> 
          <div className="hit-name">
            title: <Highlight attribute="title" hit={props.hit} tagName="mark"/> &ensp;
            content: <Highlight attribute="content" hit={props.hit} tagName="mark"/>
          </div>
      </div>
    );
}

Hit.propTypes = {
    hit: PropTypes.object.isRequired,
  };

export default ListDisplay;