import React from 'react';
import db from '../db/index.js';
import "../css/usertags.css";
import test from "../css/test.json";
import { Link } from 'react-router-dom';


class UserTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company_name: 'bruh',
            user_name: '',
            tag_name: 'k',
            info: {}
        };

    }
    
    resetTags() {

    }

    componentWillMount() {
        db.getAllTags('bruh').then((data) => {
            this.setState({info: data.toJSON()});
            console.log(this.state.info);
        });
      }

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

