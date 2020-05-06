import React from 'react';
import { Menu, Dropdown, Image, Icon, Grid } from 'semantic-ui-react';
import logo from '../images/logo_white.png';
import tags from '../dummy_data/dummy_tags.json'
import {
    InstantSearch,
    SearchBox,
} from 'react-instantsearch-dom';
import { searchClient } from '../db/index';

import dummy_tags from '../dummy_data/dummy_tags.json'
import {db} from '../db/index';

const options = Object.keys(dummy_tags).map(x => { return { key: x, text: x, value: x } })

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            forum_tags:[]
        }
        db.database().ref('bruh/Tags').on('value', tagSnapshot => {
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

    render() {
        return (
            <div>
                <InstantSearch indexName='test' searchClient={searchClient}></InstantSearch>
                <Menu secondary size='massive' color='olive' inverted className="navbar">
                    <Menu.Item name='KIWI'>
                        <Image fluid size='tiny' src={logo} />
                    </Menu.Item>

                    <Menu.Item fitted style={{ flexGrow: 2 }}>
                        <Grid verticalAlign="middle" style={{ flexGrow: 2 }} columns={2}>
                            <Grid.Row>
                                <Grid.Column>
                                    <SearchBox searchAsYouType={true}
                                        translations={{
                                            placeholder: "What's your question?",
                                        }} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Dropdown fluid multiple selection placeholder='Tags'
                                        onChange={this.handleChange}
                                        options={[...options, ...this.state.forum_tags]} />
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
