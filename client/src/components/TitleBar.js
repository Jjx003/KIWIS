import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Icon } from 'semantic-ui-react';
import logo from '../images/logo_white.png';
import firebase from '../auth/firebase';
import Cookies from 'universal-cookie';
import '../css/TitleBar.css';


class TitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title
        }
    }

    handleSignOut = () => {
        firebase.auth().signOut();

        // removing cookie
        const cookies = new Cookies();
        cookies.remove('auth');

        // redirect to home page
        //this.props.history.push("/login");
    }

    render() {
        return (
            <div className="title_block">
                <div className={"kiwiLogo"}>
                    <img src={logo} height={'40px'} />
                </div>

                <div className={"vert-line"}>
                    <p>|</p>
                </div>

                <div className={"title"}>
                    <p>{this.state.title}</p>
                </div>

                <div className={"settings"}>
                    <Icon name="settings" size={"big"} color='grey' inverted />
                </div>
                <div className={"logoutButton"}>
                    <button className={"signoutButton"} onClick={this.handleSignOut}><Icon name="sign out" size={"big"} color='grey' inverted /></button>
                </div>
            </div>
        );
    }

    // render() {
    //     return (
    //         <div>
    //             <Menu secondary size='massive' color='olive' inverted className="navbar">
    //                 <Menu.Item name='KIWI'>
    //                     <Link to='/'>
    //                         <Image link fluid size='tiny' src={logo} />
    //                     </Link>

    //                 </Menu.Item>
    //                 <Menu.Item bold fitted style={{ fontSize: '28px' }}>
    //                         |
    //                 </Menu.Item>

    //                 <Menu.Item centered fitted style={{ flexGrow: 2, fontSize: '32px' }}>
    //                         {this.state.title}
    //                 </Menu.Item>

    //                 <Link style={{marginTop: "4px"}} to="/login">
    //                     <Menu.Item onClick={this.handleSignOut} name='sign-out'>
    //                         Sign Out
    //                     </Menu.Item>
    //                 </Link>

    //                 <Menu.Item name='options'>
    //                     <Link to='/settings'>
    //                         <Icon link name="settings"/>
    //                     </Link>
    //                 </Menu.Item>
    //             </Menu>
    //         </div>
    //     );
    // }
}

export default TitleBar;