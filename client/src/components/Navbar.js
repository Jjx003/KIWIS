import React from 'react';
import { Dropdown, Icon} from 'semantic-ui-react';
import logo from '../images/logo_white.png';
import '../css/index.css'
import {
    SearchBox
} from 'react-instantsearch-dom';
import axios from 'axios';
import firebase from '../auth/firebase';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';
import '../css/Navbar.css'


const tags = [
    {
      key: 'Machine Learning',
      text: 'Machine Learning',
      value: 'Machine Learning'
    },
    {
        key: 'Python',
        text: 'Python',
        value: 'Python'
    },
    {
        key: 'help-needed',
        text: 'help-needed',
        value: 'help-needed'
      },
      {
          key: 'announcement',
          text: 'announcement',
          value: 'announcement'
      },
      {
        key: 'events',
        text: 'events',
        value: 'events'
      },
      {
          key: 'lost and found',
          text: 'lost and found',
          value: 'lost and found'
      },
      {
        key: 'C++',
        text: 'C++',
        value: 'C++'
      },
      {
          key: 'React',
          text: 'React',
          value: 'React'
      }
]


class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            forum_tags:[],
            default_tags:[],
            value: '',
            searching: false,
            got_specializations: false
        }

    }

    handleSignOut = () => {
        firebase.auth().signOut();

		// removing cookie
		const cookies = new Cookies();
        cookies.remove('auth');
        
        window.localStorage.removeItem('current_tags');
        window.localStorage.removeItem('original_tags');

        // redirect to home page
		this.props.history.push("/login");
    }

    componentDidMount(){
        axios({
			method: 'get',
			url: 'http://localhost:9000/tags/getTags',
		  })
		  .then((response) => { 
			if (response.data.success) { 
                for(var key in response.data.tags){
                    var x = key;
                    this.setState({forum_tags:[...this.state.forum_tags, { key: x, text: x, value: x }]});
                }
                
                if (localStorage.getItem('current_tags') == undefined) {
                    axios.defaults.withCredentials = true;
                    axios({
			            method: 'GET',
			            url: 'http://localhost:9000/users/userTags',
                        withCredentials: true
                    })

                    .then((response) => {
			            if (response.data.success) {
                            var string_tags = JSON.stringify(response.data.tags);
                            var tags_array = JSON.parse(string_tags);

                            for (var key in tags_array) {
                                if (tags_array.hasOwnProperty(key)) {
                                   this.setState({default_tags : [...this.state.default_tags, tags_array[key]]});
                                }
                            }
                            window.localStorage.setItem('current_tags', string_tags);
                            window.localStorage.setItem('original_tags', string_tags);

                            this.props.updateForumDisp(this.state.default_tags);
                            this.setState({got_specializations : true});
                            // Store the tags in local storage
			            } else {
				            alert("Couldn't get the tags of the user");
			            }
                    })
		            .catch((error) => {

                        console.log(error);
                    
                    });
                
			    } else {
                    var string_tags = window.localStorage.getItem('current_tags');
                    console.log(string_tags);
                    var tags_array = JSON.parse(string_tags);

                    for (var key in tags_array) {
                        if (tags_array.hasOwnProperty(key)) {
                            this.setState({default_tags : [...this.state.default_tags, tags_array[key]]});
                        }
                    }

                    this.props.updateForumDisp(this.state.default_tags);
                
                    this.setState({got_specializations : true});
                }
            }
		})
		  .catch((error) => {
			console.log(error);
          });
    }

    resetSpecializations = () => {
        this.setState({got_specializations: false});
        window.localStorage.setItem('current_tags', window.localStorage.getItem('original_tags'));

        console.log(window.localStorage.getItem('current_tags'));
        var string_tags = window.localStorage.getItem('current_tags');
        console.log(string_tags);
        var tags_array = JSON.parse(string_tags);

        this.setState({default_tags: []});
        for (var key in tags_array) {
            if (tags_array.hasOwnProperty(key)) {
                this.setState({default_tags : [...this.state.default_tags, tags_array[key]]});
            }
        }

    
        window.location.reload(true);
        this.setState({got_specializations : true});
        this.props.updateForumDisp(this.state.default_tags);
    }


    //called when the tag dropdown changes
    handleChange = (e, {value}) => {
        this.setState({tags : value}, ()=>{
            console.log(this.state.tags);
        });
        this.props.updateForumDisp(value);

        const cookies = new Cookies();
        cookies.set('tags', JSON.stringify(value));
        window.localStorage.setItem('current_tags', JSON.stringify(value));
    }

    //called when the search box changes
    setTextSearch = (event => {
        this.setState({ value: event.target.value }, () => {
            if (this.state.value.length === 0) {
                this.setState({ searching: false });
                this.props.resetTextSearch();
            } else if (!this.state.searching) {
                this.setState({ searching: true });
                this.props.setTextSearch();
            }
        });
    });



    render() {
        if (!this.state.got_specializations) {
            return <h1> loading navbar... </h1>
        }
        return (
            <div className="navbar_block">
                <div className={"kiwiLogo"}>
                    <button className={"invisibleButton"} onClick={() => {this.props.history.push("/")}}>
                    <img src={logo} height={'40px'} alt={"KIWI"}/>
                    </button>
                </div>
                <div className={"searchBar"}>
                    <SearchBox className={"searching"} searchAsYouType={true}
                        onChange={this.setTextSearch}
                        translations={{
                            placeholder: "What's your question?",
                        }} />
                </div>
                <div className={"tagComponent"}>
                    <Dropdown fluid multiple selection scrolling search placeholder='Tags'
                        onChange={this.handleChange}
                        loading = {(!this.state.got_specializations) ? true : false}
                        defaultValue = {this.state.default_tags}
                        options={[...this.state.forum_tags]} clearable/>
                </div>
                <div>
                    <button onClick={this.resetSpecializations.bind(this)}> reset specializations </button> 
                </div>
                <div className={"settings"}>
                    <button className={"invisibleButton"} onClick={() => {this.props.history.push("/settings")}}>
                    <Icon name="settings" size={"big"} color='grey' inverted />
                    </button>
                </div>
                <div className={"logoutButton"}>
                    <button className={"invisibleButton"} onClick={this.handleSignOut}><Icon name="sign out" size={"big"} color='grey' inverted /></button>
                </div>
            </div>
        );
    }
}

export default withRouter(Navbar);