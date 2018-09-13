import React from 'react';
import {HubConnectionBuilder} from '@aspnet/signalr';

import withNotification from './withNotification'


//TODO

/*
const signalR = require("@aspnet/signalr");
 
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .build();
 
connection.on("send", data => {
    console.log(data);
});
 
connection.start()
    .then(() => connection.invoke("send", "Hello"));


class NotificationService extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        
    }

}


const NotificationButton = (props) => (
    <button {...props} onClick={e => {
        e.preventDefault();
        props.updateNotification("test message", new Date().toISOString());
    }}>Test Notification</button>
);

export default withNotification(NotificationButton, false);


*/