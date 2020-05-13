import React from 'react';
<<<<<<< HEAD
import '../css/App.css';
import {db, getTags} from '../db/index.js';
import { Dropdown } from 'semantic-ui-react'

/*
=======
import db from '../db/index.js';
import "../css/usertags.css";
import test from "../css/test.json";
import { Link } from 'react-router-dom';


>>>>>>> 87af1ff9df836fcc872f9c3c148f244613fb20a3
class UserTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company_name: 'bruh',
            user_name: '',
            tag_name: 'k',
            info: {}
        };

<<<<<<< HEAD
=======
    }
    
    resetTags() {

    }

    componentWillMount() {
        db.getAllTags('bruh').then((data) => {
            this.setState({info: data.toJSON()});
            console.log(this.state.info);
        });
      }

>>>>>>> 87af1ff9df836fcc872f9c3c148f244613fb20a3
    render() {
        const {info} = this.state;
        const tags = Object.keys(info).map(x => { return { key: x, text: x, value: x } });

        return(
            <div className="mainTagsPage">
                <div className="mainContainer"> 
                    <div className="tagListBox">
                        { Object.keys(info).map((key, i) => ( 
                                <button className='tagButton' onClick={console.log(key)}>{key}</button>
                        ))}
                    </div>
                    <div>
                        <form>
                            <div className="buttons">
                                <button className="button1" type="change">Add</button>
                            </div>
                            <input onChange= {e=> this.setState({company_name: e.target.value})} />
                            <input onChange= {e=> this.setState({tag_name: e.target.value})} />
                            <button onClick={db.removeSpecialization(this.state.company_name, this.state.tag_name)} className="button1" type="change">REMOVE</button>
                        </form>

                    </div>
                    <div className="doneButtons">
                        <button onClick={resetTags} className="resetButton">Reset Specializations</button>
                        <Link to="/">
                            <button className="completeButton"> Complete Specializations</button>
                        </Link>
                    </div>
                </div>
                <div className="endText">
                    <p1>
                        © All Rights Reserved. KIWI by Symps.
                    </p1>
                </div>
            </div>
        )
    }
}
   

export default UserTags;
*/
