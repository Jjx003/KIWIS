import React, { useCallBack } from "react";
import { Segment, Divider, Checkbox } from "semantic-ui-react";
//import NavBar from "../components/NavBar"
import "../css/settings.css";
import { useHistory } from "react-router-dom";

class Settings extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
            user_id: props.user_id
        };
    }
    
    redirectAdmin = () => {
        var history = useHistory();

        
        history.push("/admin")
    }

    redirectSpecializations = () => {
        var history = useHistory();

        history.push("/specializations")
    }

    render(){
        return(
            <div className = "settings">
                <div className = "settingsWrap">
                    <Segment basic textAlign='center'>
                        <div className = "settings-item">                         
                            <input className="textBox" name="email" type="email" placeholder="  abc.def.com"/>
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
                                <button className= "buttonz" onClick={this.redirectAdmin}> Manage Forum </button>
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