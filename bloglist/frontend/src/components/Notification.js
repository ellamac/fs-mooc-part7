import React from 'react';
import { connect } from 'react-redux';
import { TopNotification } from '../styledComponents';

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return (
    <TopNotification primaryColor={notification.type}>
      {notification.message}
    </TopNotification>
  );
};

export default connect((state) => ({ notification: state.notification }))(
  Notification
);
