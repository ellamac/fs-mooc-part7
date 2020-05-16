import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../reducers/loginReducer';

const TopNavigation = (props) => {
  const user = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const style = {
    backgroundColor: 'lightgrey',
    padding: '5px',
  };

  const linkStyle = {
    margin: '0 2px',
  };
  return (
    <div style={style}>
      <Link style={linkStyle} to='/blogs'>
        blogs
      </Link>
      <Link style={linkStyle} to='/users'>
        users
      </Link>
      <span style={linkStyle}>{user.name} is logged in</span>
      <button style={linkStyle} onClick={handleLogout}>
        log out
      </button>
    </div>
  );
};

export default TopNavigation;
