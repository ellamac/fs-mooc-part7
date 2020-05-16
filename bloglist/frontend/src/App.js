import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BlogList from './components/BlogList';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import NewBlog from './components/NewBlog';

import loginService from './services/login';
import storage from './utils/storage';

import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = React.createRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const user = storage.loadUser();
    setUser(user);
  }, []);

  const notifyWith = (message, type) => {
    dispatch(setNotification(message, type, 5));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUsername('');
      setPassword('');
      setUser(user);
      notifyWith(`${user.name} welcome back!`, 'success');
      storage.saveUser(user);
    } catch (exception) {
      notifyWith('wrong username/password', 'error');
    }
  };

  const handleLogout = () => {
    setUser(null);
    storage.logoutUser();
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
      <BlogList user={user.username} />
    </div>
  );
};

export default App;
