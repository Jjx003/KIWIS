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
}

export default TitleBar;