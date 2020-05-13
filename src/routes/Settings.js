import React, { useCallBack } from "react";
import { Segment, Divider, Checkbox } from "semantic-ui-react";
//import NavBar from "../components/NavBar"
import "../css/settings.css";

class Settings extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            user_id: props.user_id
        };
    }
    
    redirectAdmin = () => {
        history.push("/Admin")
    }

    redirectSettings = () => {
        history.push("/Specializations")
    }

    render(){
        return(
            <div className = "settings">
                <div className = "settingsWrap">
                    <Segment basic textAlign='center'>
                        <div className = "settings-item">                         
                            <input className="textBox" name="email" type="email" placeholder={this.state.user_id.getEmail()}/>
                        </div>
                        <div className = "settings-item">                         
                            <input className="textBox" name="password" type="password" placeholder={this.state.user_id.getPassword()}/>
                        </div>
                        <div className = "settings-item"> 
                            <Checkbox toggle label={{ children: 'Email Notification' }}/>
                        </div>
                        <div className = "settings-item"> 
                            <Checkbox toggle label={{ children: 'Browser Notification' }}/>
                        </div>
                        <div className = "settings-item">
                            <button className= "buttonz"> Specialization </button>
                        </div>
                        <div className = "settings-item">  
                            <button className= "buttonz"> Submit </button>
                        </div>
                        <div className = "settings-item">                 
                            <button className= "buttonz"> Sign Out </button>
                        </div>

                        <Divider horizontal> Admins Only </Divider>
                            <div className = "settings-item"> 
                                <button className= "buttonz"> Manage Forum </button>
                            </div>
                    </Segment>
                </div>
                <div className="endText">
                    <p1>
                        © All Rights Reserved. KIWI by Symps.
                    </p1>
                </div>
            </div>
        );}
};

export default Settings;