import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Title,
  Italic,
  StyledA,
  Text,
  Button,
  ListItem,
  Input,
} from '../styledComponents';

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
      <Title sub={2}>
        <Italic>
          {blog.title}
          {` `}
        </Italic>
        <span>{blog.author}</span>
      </Title>
      <div>
        <StyledA href={blog.url}>{blog.url}</StyledA>
      </div>
      <Text>
        {blog.likes} likes
        <Button onClick={() => handleLike()}>Like</Button>
      </Text>
      <Text>added by {blog.user.name}</Text>
      {user.username === blog.user.username ? (
        <Button onClick={() => handleRemove()}>Remove blog</Button>
      ) : null}
      <Title sub={3}>comments</Title>
      <div>
        {' '}
        <Input
          id='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button onClick={() => handleComment()}>add comment</Button>
      </div>
      {blog.comments ? (
        blog.comments.map((c, i) => <ListItem key={i}>{c}</ListItem>)
      ) : (
        <></>
      )}
    </div>
  );
};

export default Blog;
