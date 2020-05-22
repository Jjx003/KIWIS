import React from 'react';
import {Link} from 'react-router-dom';
import { Menu, Input, Dropdown, Image, Icon, Grid } from 'semantic-ui-react';
import logo from '../images/logo_white.png';
import tags from '..//dummy_data/dummy_tags.json'

const options = Object.keys(tags).map(x => { return { key: x, text: x, value: x } });

class Navbar extends React.Component {

    

    render() {
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
                                    <Input fluid placeholder="What's your question?" />
                                </Grid.Column>
                                <Grid.Column>
                                    <Dropdown fluid multiple selection options={options} text='Tags' />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Menu.Item>

                    <Menu.Item name='sign-out'>
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

export default Navbar;