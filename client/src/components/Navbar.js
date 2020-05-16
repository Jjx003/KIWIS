import React from 'react';
import { Menu, Dropdown, Image, Icon, Grid } from 'semantic-ui-react';
import logo from '../images/logo_white.png';
import {
    SearchBox
} from 'react-instantsearch-dom';
import {db, company} from '../db/index';
import '../css/index.css'

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

    componentWillMount(){
        const companyTags = company.concat('/Tags');
        db.database().ref(companyTags).once('value', tagSnapshot => {
            tagSnapshot.forEach(tag => {
                var x = tag.key;
                this.setState({forum_tags:[...this.state.forum_tags, { key: x, text: x, value: x }]});
            });
        });
    }

    handleChange = (e, {value}) => {
        this.setState({tags : value}, ()=>{
        console.log(this.state.tags);});
        this.props.updateForumDisp(value);     
    }

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
