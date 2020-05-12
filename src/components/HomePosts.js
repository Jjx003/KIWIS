import {db, searchClient} from '../db/index';
import React from 'react';
import '../css/index.css'
import '../css/HomePosts.css'
import Navbar from './Navbar';
import {
    InstantSearch,
    Hits
} from 'react-instantsearch-dom';
import PostCards from './PostCards';

class HomePosts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            textSearch: false
        };
        
        this.updateStateDisp = this.updateStateDisp.bind(this);
    }

    componentWillMount() {
        //i dont think this should this be here
        this.firebaseRef = db.database().ref('UXD14').child('Posts');
        this.firebaseRef.on('value', postSnapshot => {
            let posts = [];
            postSnapshot.forEach(postId => {
                let post = postId.val();
                post.key = postId.key;
                post.visible = true;    //make everything visible first
                posts.unshift(post);    //push to front of array so new items shown first
            });
            this.setState({ posts });
        });
    }

    componentWillUnmount() {
        //this.firebaseRef.off();
    }

    //searching through posts state
    searchTags(value, keyList) {
        return this.state.posts.forEach(post => {
            post.tags.forEach(tag => {
                if(value.includes(tag)){
                    console.log(post.title);
                    keyList.push(post.title);
                }
            })
        })
    }

    //updates and queris every time tag is removed or added
    updateStateDisp(value) {
        let keyList = []
        this.searchTags(value, keyList);

        if(this.state.posts){
            this.setState( state => {
                state.posts.map(
                    post => {
                        if(value.length === 0){
                            Object.assign(post, {visible: true});
                        }
                        else if(keyList.includes(post.title)){
                            Object.assign(post, {visible: true});
                        }
                        else
                            Object.assign(post, {visible:false});
                        }
                )}
            )
            this.forceUpdate();
        }
        
    }
    
    setTextSearchState = () => {
        this.setState({
            textSearch: true
        });
    }

    resetTextSearchState = () => {
        this.setState({
            textSearch: false
        });
    }
    render() {
        return (
            <div>
                <InstantSearch indexName='UXD14' searchClient={searchClient}>
                    <Navbar updateForumDisp={this.updateStateDisp} setTextSearch={this.setTextSearchState} 
                    resetTextSearch={this.resetTextSearchState}/>     
                    <PostContainer  posts={this.state.posts} textSearch={this.state.textSearch}/>
                </InstantSearch>
            </div>
        )
    } 
}

function PostContainer(props){
    if(props.textSearch){
        //could add visible here for search
        return <Hits className="posts-container" hitComponent={Hit}/>;
    }
    else {
        return <TagSearchPosts posts={props.posts}/>;
    }
}

function TagSearchPosts(props){
    return (
        <div className="posts-container">
        {props.posts.map( (item, i) =>{
            if(item.visible)
                return  <PostCards key={i} postID={item.postID} userID={item.userID} title={item.title}
                tags={item.tags} datetime={item.datetime} karma={item.karma} 
                content={item.content} firstName={item.firstName} lastName={item.lastName}/>
        })}
        </div>
    );
}

// no submit button
// tags take priority in search
// searching while tags are selected will search through only the posts with tags
function Hit(props) {
    return (
        <div>
            <PostCards key={0} postID={props.hit.postID} userID={props.hit.userID} title={props.hit.title}
                tags={props.hit.tags} datetime={props.hit.datetime} karma={props.hit.karma} 
                content={props.hit.content} firstName={props.hit.firstName} lastName={props.hit.lastName}/>
        </div>
    );
}

export default HomePosts;
