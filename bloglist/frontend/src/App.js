import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BlogList from './components/BlogList';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import NewBlog from './components/NewBlog';

import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser, loginUser, logoutUser } from './reducers/loginReducer';

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

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={'PLACEHOLDER'} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={'PLACHOLDER'} />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
