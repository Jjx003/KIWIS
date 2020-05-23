import React, { useCallBack } from "react";
import { Segment, Divider, Checkbox } from "semantic-ui-react";
import TitleBar from "../components/TitleBar"
import "../css/settings.css";
import { Link } from "react-router-dom";
import axios from 'axios'


class Settings extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
            user_email: "",
            admin: false
        };

        axios({
            method: 'post',
            url: 'http://localhost:9000/users/getUserEmail'
          }).then((response) => {
            this.setState({user_email: response.data.userEmail});
        });

        axios({
            method: 'post',
            url: 'http://localhost:9000/users/isUserAdmin'
          }).then((response) => {
              console.log(response);
            this.setState({admin: response.data.admin});
        });
    }

    render(){
        if(this.state.admin){

            return(
                <div>
                    <TitleBar title="Settings" />
                    <div className = "setting">            
                        <div className = "settingsWrap">
                            <Segment basic textAlign='center'>
                                <div className = "settings-item">                         
                                    <input className="textBox" name="email" type="email" placeholder= {"   " + this.state.user_email}/>
                                </div>
                                <div className = "settings-item">                         
                                    <input className="textBox" name="password" type="password" placeholder="  randomPassword"/>
                                </div>
                                <div className = "settings-item"> 
                                    <Checkbox toggle label={{ children: 'Email Notification' }}/>
                                </div>
                                <div className = "settings-item"> 
                                    <Checkbox toggle label={{ children: 'Browser Notification' }}/>
                                </div>
                                <div className = "settings-item">
                                    <button className= "buttonz"> Submit </button>
                                </div>
                                
                                <div className="instructions"> Click here to change specialization. This affects your default tags.  </div>

                                <div className = "settings-item">  
                                    <Link to='/userTags'>
                                        <button className= "buttonz">  Specialization</button>
                                    </Link>     
                                </div>
                                <div className = "settings-item">                 
                                    <button className= "buttonz"> Sign Out </button>
                                </div>

                                <Divider horizontal> Admins Only </Divider>

                                <div className = "settings-item"> 
                                    <Link to="/adminPage">
                                        <button className= "buttonz" onClick={this.redirectAdmin}> Manage Forum </button>
                                    </Link>
                                </div>
                            </Segment>
                        </div>
                        <div className="endText">
                            <p1>
                                © All Rights Reserved. KIWI by Symps.
                            </p1>
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            return(
            <div>
                <TitleBar title="Settings" />
                <div className = "setting">            
                    <div className = "settingsWrap">
                        <Segment basic textAlign='center'>
                            <div className = "settings-item">                         
                                <input className="textBox" name="email" type="email" placeholder= {"   " + this.state.user_email}/>
                            </div>
                            <div className = "settings-item">                         
                                <input className="textBox" name="password" type="password" placeholder="  randomPassword"/>
                            </div>
                            <div className = "settings-item"> 
                                <Checkbox toggle label={{ children: 'Email Notification' }}/>
                            </div>
                            <div className = "settings-item"> 
                                <Checkbox toggle label={{ children: 'Browser Notification' }}/>
                            </div>
                            <div className = "settings-item">
                                <button className= "buttonz"> Submit </button>
                            </div>
                            
                            <div className="instructions"> Click here to change specialization. This affects your default tags.  </div>

                            <div className = "settings-item">  
                                <Link to='/userTags'>
                                    <button className= "buttonz">  Specialization</button>
                                </Link>     
                            </div>
                            <div className = "settings-item">                 
                                <button className= "buttonz"> Sign Out </button>
                            </div>
                        </Segment>
                        </div>
                        <div className="endText">
                            <p1>
                                © All Rights Reserved. KIWI by Symps.
                            </p1>
                        </div>
                    </div>
                </div>)
        }
    }
};

export default Settings;