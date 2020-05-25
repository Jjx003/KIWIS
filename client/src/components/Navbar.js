import React from 'react';
import {Link} from 'react-router-dom';
import { Menu, Dropdown, Image, Icon, Grid } from 'semantic-ui-react';
import logo from '../images/logo_white.png';
import {
    SearchBox
} from 'react-instantsearch-dom';
import '../css/index.css'
import axios from 'axios';
import firebase from '../auth/firebase';
import Cookies from 'universal-cookie';
import {withRouter} from 'react-router-dom';

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
                    console.log(x);
                    this.setState({forum_tags:[...this.state.forum_tags, { key: x, text: x, value: x }]});
                }

                var tags_string = window.localStorage.getItem('tags');
                
                console.log("string: " + tags_string);

                var tags_array = JSON.parse(tags_string);
                console.log("array: " + tags_array);

                for (var key in tags_array) {
                    if (tags_array.hasOwnProperty(key)) {
                        //this.setState({default_tags:[...this.state.default_tags, { key: tags_array[key], text: tags_array[key], value: tags_array[key] }]});
                        //this.setState({tags : [...this.state.tags, { key: tags_array[key], text: tags_array[key], value: tags_array[key] }]});
                        this.setState({tags : [ 
                            //{ key: tags_array[key], text: tags_array[key], value: tags_array[key] }
                            {key: "Machine Learning"}
                        ]});
                        //console.log(key + " -> " + p[key]);
                    }
                }
                this.setState({got_specializations : true});

                //this.props.updateForumDisp(this.state.tags); 

			} else {
				console.log("bad");
			}
		  })
		  .catch((error) => {
			console.log(error);
          });
    }

    //called when the tag dropdown changes
    handleChange = (e, {value}) => {
        this.setState({tags : value}, ()=>{
        console.log(this.state.tags);});
        this.props.updateForumDisp(value);     
    }

    //called when the search box changes
    setTextSearch = (event => { 
        this.setState({value: event.target.value}, () => {
            if(this.state.value.length === 0){
                this.setState({searching: false});
                this.props.resetTextSearch();
            }
            else if(!this.state.searching){
                this.setState({searching: true});
                this.props.setTextSearch();
            }
        });
    });

    render() {
        if(!this.state.got_specializations) {
            return <h1>loading</h1>
        }
        return (
            <div>
                <Menu secondary size='massive' color='olive' inverted className="navbar">
                    <Menu.Item name='KIWI'>
                        <Link to='/'>
                            <Image link fluid size='tiny' src={logo} />
                        </Link>
                        
                    </Menu.Item>
                    

                    <Menu.Item fitted style={{ flexGrow: 2 }}>
                        <Grid verticalAlign="middle" style={{ flexGrow: 2 }} columns={2}>
                            <Grid.Row>
                                <Grid.Column>
                                    <SearchBox searchAsYouType={true} 
                                        onChange={this.setTextSearch}
                                        translations={{
                                            placeholder: "What's your question?",
                                        }} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Dropdown fluid multiple selection placeholder='Tags'
                                        loading = {(!this.state.got_specializations) ? true : false}
                                        defaultValue = {this.state.tags}
                                        onChange={this.handleChange}
                                        options={[...this.state.forum_tags]} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Menu.Item>

                    <Menu.Item onClick={this.handleSignOut} name='sign-out'>
                        Sign Out
                    </Menu.Item>

                    <Menu.Item name='options'>
                        <Link to='/settings'>
                            <Icon link name="settings"/>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}


export default withRouter(Navbar);
