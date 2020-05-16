import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Blog from './Blog';

import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogList = (props) => {
  const blogs = useSelector((state) => {
    return state.blogs;
  });
  const user = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();

  const like = (blog) => {
    dispatch(likeBlog(blog));
    dispatch(setNotification(`you voted '${blog.title}'`, 'success', 5));
  };

  const remove = (blog) => {
    try {
      dispatch(removeBlog(blog));
      dispatch(setNotification(`you removed '${blog.title}'`, 'success', 5));
    } catch (e) {
      dispatch(
        setNotification(`removing '${blog.title}' didn't succeed`, 'error', 5)
      );
    }
  };

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Blog
            blog={blog}
            handleLike={like}
            handleRemove={remove}
            own={user.username === blog.user.username}
          />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
