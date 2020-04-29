import React, {Component} from 'react';
import db from '../db/index.js';
import { Button } from 'semantic-ui-react';
import '../css/App.css';

class DisplayData extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.firebaseRef = db.database().ref("Posts")
        this.firebaseRef.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['.key'] = childSnapshot.key;
                items.push(item);
            });
            this.setState({items});
        });

    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    render() {
        const records = this.state.items.map(items =>
            <tr key={items.name}>
                <td style={{width: '200px', textAlign: 'center'}}>{items.user_id}</td>
                <td style={{width: '200px', textAlign: 'center'}}>{items.post_id}</td>
                <td style={{width: '200px', textAlign: 'center'}}>{items.title}</td>
                <td style={{width: '200px', textAlign: 'center'}}>{items.tag_ids}</td>
                <td style={{width: '200px', textAlign: 'center'}}>{items.date_time}</td>
                <td style={{width: '200px', textAlign: 'center'}}>{items.content}</td>
                <td style={{width: '200px', textAlign: 'center'}}>{items.karma}</td>
                <td style={{width: '200px', textAlign: 'center'}}>{items.response_ids}</td>
            </tr>
        );

        return (
            <div style={{paddingTop: '20px'}}>
                <table style={{border: '1px solid black'}}>
                    <thead>
                    <tr>
                        <th>Posts's User ID</th>
                        <th>Post's ID</th>
                        <th>Posts's Title</th>
                        <th>Post's Tag IDs</th>
                        <th>Posts's Date and Time</th>
                        <th>Post's Content</th>
                        <th>Posts's Karma</th>
                        <th>Post's Response IDs</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DisplayData;