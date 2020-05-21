import {searchClient, company} from '../db/index';
import React from 'react';
import '../css/index.css'
import '../css/HomePosts.css'
import Navbar from './Navbar';
import {
    InstantSearch,
    Hits,
    connectStateResults
} from 'react-instantsearch-dom';
import PostCards from './PostCards';
import axios from 'axios';
import {db} from '../db/index'

class HomePosts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            textSearch: false,
            updated: false
        };
        
        this.updateTagSearch = this.updateTagSearch.bind(this);
        
    }

    componentDidMount() {

        /*
        this.firebaseRef = db.database().ref(company).child('Posts');
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
        */
       
		axios({
			method: 'get',
			url: 'http://localhost:9000/posts/',
		  })
		  .then((response) => { 
			if (response.data.success) { 
                console.log(response.data);
                for(var key in response.data.posts){
                    this.setState({posts : [...this.state.posts, response.data.posts[key]]});
                }
			} else {
				console.log("bad");
			}
		  })
		  .catch((error) => {
			console.log(error);
          });
    }

    componentWillUnmount() {
        //this.firebaseRef.off();
    }

    //searching through posts state
    searchTags(value, keyList) {
        return this.state.posts.forEach(post => {
            post.tag_ids.forEach(tag => {
                if(value.includes(tag)){
                    keyList.push(post.title);
                }
            })
        })
    }

    //updates and queries every time tag is removed or added
    updateTagSearch(value) {
        let keyList = []
        this.searchTags(value, keyList);

        if(this.state.posts){
            this.setState( state => {
                state.posts.forEach(
                    post => {
                        if(value.length === 0){
                            post.visible = true;
                        }
                        else if(keyList.includes(post.title)){
                            post.visible = true;
                        }
                        else
                            post.visible = false;
                        }
                )}
            )
         this.setState({updated: !this.state.updated});
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
            <div className="container">
                <InstantSearch indexName={company} searchClient={searchClient}>
                    <Navbar updateForumDisp={this.updateTagSearch} setTextSearch={this.setTextSearchState} 
                    resetTextSearch={this.resetTextSearchState}/>     
                    <PostContainer  posts={this.state.posts} textSearch={this.state.textSearch}/>
                </InstantSearch>
            </div>
        )
    } 
}

//component for the post container
function PostContainer(props){
    if(props.textSearch){
        return ( 
        <Results props={props}>
            <Hits className="posts-container" hitComponent={TextSearchPosts}/>
        </Results>);
    }
    else {
        return <TagSearchPosts posts={props.posts}/>;
    }
}

//component for tag searching
function TagSearchPosts(props){
    return (
        <div className="posts-container">
        {props.posts.map( (item, i) => {
            if(item.visible)
                return  <PostCards post_id={item.key} user_id={item.user_id} title={item.title}
                tag_ids={item.tag_ids} date_time={item.date_time} karma={item.karma} 
                content={item.content} responses={item.responses}/>
            else return <div></div>;
        })}
        </div>
    );
}

//component for text searching
function TextSearchPosts(props) {
    return (
        <div>
            <PostCards post_id={props.hit.objectID} user_id={props.hit.user_id} title={props.hit.title}
                tag_ids={props.hit.tag_ids} date_time={props.hit.date_time} karma={props.hit.karma} 
                content={props.hit.content} responses={props.hit.responses}/>
        </div>
    );
}

/* This part is for routing to the Create post pages
const RedirectButton = withRouter((props) => {
    const redirect = () => {
        props.history.push('/createPost');
    }
    return <button onClick={redirect}>Hello</button>
})
*/

//component is displayed then there are no results from algolia
const Results = connectStateResults(
    ({searchState, searchResults, children}, props) =>
      searchResults && searchResults.nbHits !== 0? (
        children):(
        <div className="posts-container">
            <div className="no-results-msg">No results have been found for {searchState.query}
                <button>Create Post</button>
            </div>
        </div>)
);

//<RedirectButton props={props}/>
    
export default HomePosts;
