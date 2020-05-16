import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TopNavBar, Text, StyledLink } from '../styledComponents';

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
    <TopNavBar>
      <StyledLink white to='/blogs'>
        blogs
      </StyledLink>
      <StyledLink white to='/users'>
        users
      </StyledLink>
      <Text white>{user.name} is logged in</Text>
      <Button bg={'white'} small onClick={handleLogout}>
        log out
      </Button>
    </TopNavBar>
  );
};

export default TopNavigation;
