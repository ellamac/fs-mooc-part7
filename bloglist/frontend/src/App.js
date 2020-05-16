import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BlogList from './components/BlogList';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import NewBlog from './components/NewBlog';
import UserList from './components/UserList';
import User from './components/User';
import Blog from './components/Blog';
import TopNavigation from './components/TopNavigation';
import { Button, Title, Input, Text, Form } from './styledComponents';

import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { initializeUser, loginUser } from './reducers/loginReducer';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => {
    return state.user;
  });

  const blogFormRef = React.createRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  const notifyWith = (message, type) => {
    dispatch(setNotification(message, type, 5));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser({ username, password }));
      setUsername('');
      setPassword('');
      notifyWith(`Welcome back!`, 'success');
    } catch (exception) {
      notifyWith('wrong username/password', 'error');
    }
  };

  /*   const handleLogout = () => {
    dispatch(logoutUser());
  }; */

  if (!user) {
    return (
      <div>
        <Title sub={2}>login to application</Title>

        <Notification notification={'PLACEHOLDER'} />

        <Form onSubmit={handleLogin}>
          <Text>
            username
            <Input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Text>
          <Text>
            password
            <Input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Text>
          <Button id='login'>login</Button>
        </Form>
      </div>
    );
  }

  return (
    <div>
      <TopNavigation />
      <Title>blog app</Title>

      <Notification notification={'PLACHOLDER'} />

      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/'>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <NewBlog />
          </Togglable>
          <BlogList />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
