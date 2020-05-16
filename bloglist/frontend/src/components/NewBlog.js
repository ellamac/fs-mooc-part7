import React, { useState } from 'react';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const NewBlog = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleNewBlog = async (event) => {
    event.preventDefault();

    const blogToCreate = {
      title,
      author,
      url,
    };
    setTitle('');
    setAuthor('');
    setUrl('');
    props.createBlog(blogToCreate);
    props.setNotification(
      `new blog '${blogToCreate.title}' created`,
      'success',
      5
    );
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          author
          <input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          title
          <input
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create'>create</button>
      </form>
    </div>
  );
};
export default connect(null, { createBlog, setNotification })(NewBlog);
