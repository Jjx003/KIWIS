import React from 'react';
import '../css/App.css';
import db from '../db/index.js';


class UserTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company_name: '',
            user_name: '',
            tag_name: ''
        };
    }

    changeTag(add, ) {

    }

    render() {
        return(
            <div>
                <form onSubmit>
                    <div className="textField">
                        <input className="textBox" name="tag" type="tag" placeholder="  tag" />
                    </div>
                    <div className="buttons">
                        <button className="button1" type="change">Log In</button>
                    </div>
                </form>
            </div>
        )
    }
}
   

export default UserTags;

