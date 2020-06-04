import DisplayUser from "../components/DisplayUser"
import { Tab, Icon } from 'semantic-ui-react'
import React from "react";
import axios from 'axios';

class UserTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading_user: true,
            userList: ["loading"],
            users: { "loading": true }
        };
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:9000/users/all'
        }).then((response) => {
            this.setState({ users: response.data })
            this.setState({
                userList: Object.keys(response.data),
                loading_user: false
            });
        });
    }

    render() {
        const handleAddEmployee = (event) => {
            event.preventDefault();
            // should tag_ids be in line below
            const { email } = event.target.elements;
            if (window.confirm("Adding employee with email:  " + email.value)) {
                axios({
                    method: 'post',
                    url: 'http://localhost:9000/inviteUser/',
                    data: {
                        email: email.value
                    }
                })
            }
            event.target.reset();
        }

        return (<Tab.Pane className="adminPageAP">
            <h1 style={{ textAlign: "center" }}> Add and Remove Employees </h1>

            <div className="tagUserListAP">
                {this.state.loading_user ?
                    <div>
                        <Icon loading name='spinner' /> loading...
                    </div> :
                    <div className="ListOfUsers">
                        {this.state.userList.map((x, i) => {
                            return (
                                <DisplayUser key={i} user_id={x}
                                    first_name={this.state.users[x]["firstName"]}
                                    last_name={this.state.users[x]["lastName"]}
                                    email={this.state.users[x]["email"]}
                                    admin={this.state.users[x]["admin"]} />);
                        })}
                    </div>}
                <div>
                    <div className="addEmployeeAP">
                        <div className="invitePromptAP">Add Employee Email </div>
                        <form className="TagForm" onSubmit={handleAddEmployee.bind(this)}>
                            <input className="inputBoxAP" name="email" type="email" placeholder="  email" />
                            <button> + </button>
                        </form>
                    </div>
                </div>
            </div>
        </Tab.Pane>);
    }
}


export default UserTab;