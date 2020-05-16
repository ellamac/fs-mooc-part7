import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
  };

  return <div style={style}>{notification.message}</div>;
};

export default connect((state) => ({ notification: state.notification }))(
  Notification
);
