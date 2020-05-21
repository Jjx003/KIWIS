import React from 'react';
import { Menu, Dropdown, Image, Icon, Grid } from 'semantic-ui-react';
import logo from '../images/logo_white.png';
import {
    SearchBox
} from 'react-instantsearch-dom';
import '../css/index.css'
import axios from 'axios'

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            forum_tags:[],
            value: '',
            searching: false
        }

    }

    componentDidMount(){
        /*
        const companyTags = company.concat('/Tags');
        db.database().ref(companyTags).once('value', tagSnapshot => {
            tagSnapshot.forEach(tag => {
                var x = tag.key;
                this.setState({forum_tags:[...this.state.forum_tags, { key: x, text: x, value: x }]});
            });
        }); */

        axios({
			method: 'get',
			url: 'http://localhost:9000/tags/',
		  })
		  .then((response) => { 
			if (response.data.success) { 
                for(var key in response.data.tags){
                    var x = key;
                    this.setState({forum_tags:[...this.state.forum_tags, { key: x, text: x, value: x }]});
                }
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
        return (
            <div>
                <Menu secondary size='massive' color='olive' inverted className="navbar">
                    <Menu.Item name='KIWI'>
                        <Image fluid size='tiny' src={logo} />
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
                                        onChange={this.handleChange}
                                        options={[...this.state.forum_tags]} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Menu.Item>

                    <Menu.Item name='sign-out'>
                        Sign Out
                    </Menu.Item>

                    <Menu.Item name='options'>
                        <Icon name="settings" />
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}


export default Navbar;
