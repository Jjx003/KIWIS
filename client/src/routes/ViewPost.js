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
            title: "",
            tags: [],
            datetime: "",
            content: "",
            karma: 0,
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
                title: results.title,
                tags: results.data.tag_ids,
                datetime: results.data.date_time,
                karma: results.data.karma,
                responses: results.data.responses,
                content: results.data.content,
                loaded: true,
                failed: false,
            })
          }).catch((error) => {
            console.log(error);
            this.setState({failed:true})
          })
    }
    
    render() {
        console.log(this.props.id)
        console.log("OGOAOOAO")
        if (this.state.loaded) {
            return (
                <div>
                    <h1> {this.state.postid || "post id null"} </h1>
                    <h1> {this.state.title || "title null"} </h1>
                    <h1> {this.state.tags || "tags null"} </h1>
                    <h1> {this.state.datetime || "time null"} </h1>
                    <h1> {this.state.content || "cotent null"} </h1>
                    <h1> {this.state.karma || "Karma null"} </h1>
                    <h1> {this.state.responses || "response null"} </h1>
                    
                </div>
            )
        } else if (!this.state.loaded && !this.state.failed) {
            return <div> Loading </div>
        } else {
            return <Failure/>
        }

        //if (this.props.location.state === undefined) {
        //    return <h1> 404: No Post Selected </h1>;
        //}
        //const {postID, firstName, lastName, title, tags, datetime, content, karma, responses} = this.props.location.state;
        /*
        return (
            <div className='App'>
            <h1> {postID || "post id null"} </h1>
            <h1> {firstName || "first name null"} </h1> 
            <h1> {lastName || "last name null"} </h1>
            <h1> {title || "title null"} </h1>
            <h1> {tags || "tags null"} </h1>
            <h1> {datetime || "time null"} </h1>
            <h1> {content || "cotent null"} </h1>
            <h1> {karma || "Karma null"} </h1>
            <h1> {responses || "response null"} </h1>
          </div>
          */
          /*
            "userID": "dumbo jumbo",
            "title": "What's 2+2?",
            "tags": ["math", "dumbass"],
            "Datetime": "May 6, 2020",
            "Content": "I've been up for days trying to solve this pls help :(",
            "Karma" : "1000000"
            
        ); */
    }
}

//export default withRouter(ViewPost);
export default ViewPost;