import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/* import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer'; */

const BlogList = (props) => {
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  /*   const dispatch = useDispatch(); */

  /* const like = (blog) => {
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
  }; */

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle} className='blog'>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
