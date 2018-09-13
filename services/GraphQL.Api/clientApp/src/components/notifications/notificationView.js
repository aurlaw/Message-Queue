import React from 'react';

import withNotification from './withNotification'

import './notificationView.css';

function convertToDate(str) {
    return new Date(str);
}

function formatDate(str) {
    let d = convertToDate(str);
    if(d !== null) {
        return d.toLocaleString('en-US');
    }
    return '';

}


//.toLocaleString('en-US')
const NotificationView = (props) => (
    <React.Fragment>
    {props.error && <div className="notif-view-error">Error :(. {props.error}</div>}
    {props.notification.message !== null && <div className="notif-view">
        {props.notification.message} - {formatDate(props.notification.created)}
    </div>}
    </React.Fragment>
);

export default withNotification(NotificationView, true);


// export const NotificationView = (props) => (
//     <div className="notif-view">VIEW</div>
// );


/*

const NotificationButton = (props) => (
    <button className="btn" onClick={e => {
        e.preventDefault();
        props.updateNotification("test message", new Date().toISOString());
    }}>Test Notification</button>
);

export default withNotification(NotificationButton, false);
*/