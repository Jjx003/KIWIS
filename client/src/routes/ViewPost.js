import React from 'react';
import '../css/App.css';
import axios from 'axios'
import Failure from '../components/Failure'
//import {withRouter} from 'react-router-dom';
class ViewPost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            postid: props.id,
            userid: "",
            title: "",
            tags: [],
            datetime: "",
            content: "",
            karma: 0,
            firstName: "",
            lastName: "",
            responses: [],
            failed: false,
        }
    }
    
    componentDidMount(){
        axios({
			method: 'get',
			url: 'http://localhost:9000/posts/' + this.props.id.toString(),
		  }).then((results) => {
            this.setState({
                title: results.data.title,
                tags: results.data.tag_ids,
                datetime: results.data.date_time,
                karma: results.data.karma,
                responses: results.data.responses,
                content: results.data.content,
                userid: results.data.user_id,
                loaded: true,
                failed: false,
            })
          }).catch((error) => {
            console.log(error);
            this.setState({failed:true})
          }).then(() => {
            axios({
                method: 'get',
                url: 'http://localhost:9000/users/allUsers',
              })
              .then((response) => { 
                if(response.status == 200){
                    if(response.data[this.state.userid] != undefined){
                        this.setState({firstName: response.data[this.state.userid].firstName});
                        this.setState({lastName: response.data[this.state.userid].lastName});
                    }  
                }
              })
              .catch((error) => {
                console.log(error);
            })
          })
    }
    
    render() {
        if (this.state.loaded) {
            return (
                <div>
                    <h1> {this.state.postid || "post id null"} </h1>
                    <h1> {this.state.title || "title null"} </h1>
                    <h1> {this.state.tags || "tags null"} </h1>
                    <h1> {this.state.datetime || "time null"} </h1>
                    <h1> {this.state.content || "cotent null"} </h1>
                    <h1> {this.state.karma} </h1>
                    <h1> {this.state.responses || "response null"} </h1>
                    <h1> {this.state.userid || "user null"} </h1>
                    <h1> {this.state.firstName || "user null"} </h1>
                    <h1> {this.state.lastName || "user null"} </h1>
                </div>
            )
        } else if (!this.state.loaded && !this.state.failed) {
            return <div> Loading </div>
        } else {
            return <Failure/>
        }
    }
}

export default ViewPost;