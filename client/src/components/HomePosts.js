import { searchClient } from '../db/index';
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
import { withRouter } from 'react-router-dom';

class HomePosts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            users: {},
            textSearch: false,
            updated: false,
            company: "empty",
            forumEmpty: false
        };

        this.updateTagSearch = this.updateTagSearch.bind(this);

    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:9000/users/company',
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ company: response.data })
                }
            })
            .catch((error) => {
                console.log(error);
            })

        axios({
            method: 'get',
            url: 'http://localhost:9000/users/allUsers',
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ users: response.data });
                }
            })
            .catch((error) => {
                console.log(error);
            })

        axios({
            method: 'get',
            url: 'http://localhost:9000/posts/',
        })
        .then((response) => { 
            if (response.data.success) { 
                this.setState({posts: response.data.posts});
            }
        })
        .catch((error) => {
            console.log(error);
        }).then(() => {
            if(this.state.posts === undefined || this.state.posts.length==0){
                this.setState({forumEmpty: true});
            }
            else {
                this.setState({forumEmpty: false});
            }
        })
    }

    //searching through posts state
    searchTags(value, keyList) {
        return this.state.posts.forEach(post => {
            if (post.tag_ids !== undefined) {
                post.tag_ids.forEach(tag => {
                    if (value.includes(tag)) {
                        keyList.push(post.key);
                    }
                })
            }
        })
    }

    //updates and queries every time tag is removed or added
    updateTagSearch(value) {
        let keyList = []
        this.searchTags(value, keyList);
        if (this.state.posts) {
            this.setState(state => {
                state.posts.forEach(
                    post => {
                        if (value.length === 0) {
                            post.visible = true;
                        }
                        else if (keyList.includes(post.key)) {
                            post.visible = true;
                            //console.log(post);
                        }
                        else
                            post.visible = false;
                    }
                )
            }
            )
            this.setState({ updated: !this.state.updated });
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
                <InstantSearch indexName={this.state.company} searchClient={searchClient}>
                    <Navbar updateForumDisp={this.updateTagSearch} setTextSearch={this.setTextSearchState}
                        resetTextSearch={this.resetTextSearchState} />
                    <PostContainer posts={this.state.posts} users={this.state.users} 
                        forumEmpty={this.state.forumEmpty} textSearch={this.state.textSearch} />
                </InstantSearch>
            </div>
        )
    }
}

//component for the post container
function PostContainer(props) {
    if (props.textSearch) {
        return (
            <Results props={props}>
                <Hits className="posts-container" hitComponent={({ hit }) => <TextSearchPosts hit={hit} users={props.users} />} />
            </Results>);
    }
    else {
        return <TagSearchPosts posts={props.posts} users={props.users} forumEmpty={props.forumEmpty}/>;
    }
}

//component for tag searching
function TagSearchPosts(props) {
    const getName = (userid) => {
        let name = "Deleted User";
        if (props.users !== undefined && props.users[userid] !== undefined) {
            name = props.users[userid].firstName + " " + props.users[userid].lastName;

        }
        return name;
    }
    if(props.forumEmpty){
        return <div className="posts-container">
            <div className="no-results-msg">
            <p>Welcome to the company's KIWI forum! Please start by creating a post.</p>
            <RedirectButton props={props}/>
            </div>
        </div>
    }
    else { 
        return (
            <div className="posts-container">
                {props.posts.map((item, i) => {
                    if (item.visible)
                        return <PostCards key={i} post_id={item.key} user_id={item.user_id} title={item.title}
                            tag_ids={item.tag_ids} date_time={item.date_time} karma={item.karma}
                            content={item.content} responses={item.responses} name={getName(item.user_id)} />

                    else return <div key={i}></div>;
                })}
            </div>
        );
    }
}

//component for text searching
function TextSearchPosts({ hit, users }) {
    const getName = (userid) => {
        let name = "no_user";
        if (users !== undefined && users[userid] !== undefined) {
            name = users[userid].firstName + " " + users[userid].lastName;

        }
        return name;
    }

    return (
        <div>
            <PostCards post_id={hit.objectID} user_id={hit.user_id} title={hit.title}
                tag_ids={hit.tag_ids} date_time={hit.date_time} karma={hit.karma}
                content={hit.content} responses={hit.responses} name={getName(hit.user_id)} />
        </div >
    );
}

const RedirectButton = withRouter((props) => {
    const redirect = () => {
        props.history.push('/createPost');
    }
    return <button className="create-post-button" onClick={redirect}>Create Post</button>
})

//component is displayed then there are no results from algolia
const Results = connectStateResults(
    ({ searchState, searchResults, children }, props) =>
        searchResults && searchResults.nbHits !== 0 ? (
            children) : (
                <div className="posts-container">
                    <div className="no-results-msg"><p>No results have been found for "{searchState.query}"</p> <br />
                        <RedirectButton props={props} />
                    </div>
                </div>)
);

export default HomePosts;
