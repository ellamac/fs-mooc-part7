import React from 'react';
import { useSelector } from 'react-redux';
import { StyledLink, Text, StyledBlogList } from '../styledComponents';

const BlogList = (props) => {
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  return (
    <div>
      {blogs.map((blog) => (
        <StyledLink black to={`/blogs/${blog.id}`}>
          <StyledBlogList key={blog.id} className='blog'>
            {blog.title}
          </StyledBlogList>
        </StyledLink>
      ))}
    </div>
  );
};

export default BlogList;
