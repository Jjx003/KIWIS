import React from 'react';
import logo from '../images/logo_white.png';
import '../css/AltNavbar.css';

class AltNavbar extends React.Component {
    render() {
        return (
            <div className="navbar_block">
                <img src={logo} height={'50px'} />
                <input type='search' size={'100'}/>
            </div>
        );
    }
}

export default AltNavbar;