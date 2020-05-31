import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
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
        // this.props.history.push("/login");
    }


    render() {
        return (
            <div className="title_block">
                <div className={"kiwiLogo"}>
                    <Link to={"/"}>
                        <button className={"invisibleButton"}>
                            <img src={logo} height={'40px'} alt={"KIWI"} />
                        </button>
                    </Link>
                </div>

                <div className={"vert-line"}>
                    <p>|</p>
                </div>

                <div className={"title-text"}>
                    <p>{this.state.title}</p>
                </div>

                <div className={"settings"}>
                    <Link to={'/settings'}>
                        <Icon link name="settings" size={"big"} color='grey' inverted />
                    </Link>
                </div>
                <div className={"logoutButton"}>
                    <Link to="/login">
                        <button className={"invisibleButton"} onClick={this.handleSignOut}><Icon link name="sign out" size={"big"} color='grey' inverted /></button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default TitleBar;