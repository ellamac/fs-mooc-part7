import React from 'react';

const Notification = ({ message }) => {
  const style = { border: 'solid', borderWidth: '1px', padding: '10px' };
  return <div style={style}>{message}</div>;
};

export default Notification;
