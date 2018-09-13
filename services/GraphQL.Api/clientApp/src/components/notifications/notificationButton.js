import React from 'react';

import withNotification from './withNotification'


const NotificationButton = (props) => (
    <button {...props} onClick={e => {
        e.preventDefault();
        props.updateNotification("test message", new Date().toISOString());
    }}>Test Notification</button>
);

export default withNotification(NotificationButton, false);