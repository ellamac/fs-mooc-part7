import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ own }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const id = useParams().id;
  const blog = useSelector((state) => {
    return state.blogs.find((b) => b.id === id);
  });
  const user = useSelector((state) => {
    return state.user;
  });

  if (!blog) {
    return <Redirect to='/' />;
  }

  const handleLike = () => {
    try {
      dispatch(likeBlog(blog));
      dispatch(setNotification(`you liked '${blog.title}'`, 'success', 5));
    } catch (e) {
      console.log('error', e);
      dispatch(
        setNotification(
          `something went wrong when liking blog ${blog.title}`,
          'error',
          5
        )
      );
    }
  };

  const handleComment = () => {
    try {
      dispatch(commentBlog(blog, comment));
      setComment('');
      dispatch(
        setNotification(
          `you added comment '${comment}' to blog '${blog.title}'`,
          'success',
          5
        )
      );
    } catch (e) {
      console.log('error', e);
      dispatch(
        setNotification(
          `something went wrong when commenting blog ${blog.title}`,
          'error',
          5
        )
      );
    }
  };

  const handleRemove = () => {
    try {
      dispatch(removeBlog(blog));
      dispatch(setNotification(`you removed '${blog.title}'`, 'success', 5));
    } catch (e) {
      dispatch(
        setNotification(`removing '${blog.title}' didn't succeed`, 'error', 5)
      );
    }
  };

  const style = { fontStyle: 'italic' };
  return (
    <div>
      <h2>
        <span style={style}>
          {blog.title}
          {` `}
        </span>
        <span>{blog.author}</span>
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={() => handleLike()}>Like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {user.username === blog.user.username ? (
        <button onClick={() => handleRemove()}>Remove blog</button>
      ) : null}
      <h3>comments</h3>
      <div>
        {' '}
        <input
          id='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={() => handleComment()}>add comment</button>
      </div>
      {blog.comments ? (
        blog.comments.map((c, i) => <li key={i}>{c}</li>)
      ) : (
        <></>
      )}
    </div>
  );
};

export default Blog;
