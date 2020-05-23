import React from 'react';
import {Link} from 'react-router-dom';
import { Menu, Image, Icon } from 'semantic-ui-react';
import logo from '../images/logo_white.png';


class TitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title
        }
    }
    

    render() {
        return (
            <div>
                <Menu secondary size='massive' color='olive' inverted className="navbar">
                    <Menu.Item name='KIWI'>
                        <Link to='/'>
                            <Image link fluid size='tiny' src={logo} />
                        </Link>
                        
                    </Menu.Item>
                    <Menu.Item bold fitted style={{ fontSize: '28px' }}>
                            |
                    </Menu.Item>

                    <Menu.Item centered fitted style={{ flexGrow: 2, fontSize: '32px' }}>
                            {this.state.title}
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

export default TitleBar;