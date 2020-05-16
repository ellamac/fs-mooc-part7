import React, { useState } from 'react';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
import { Button, Input, Text, Title } from '../styledComponents';

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
      <Title sub={3}>create new</Title>
      <form onSubmit={handleNewBlog}>
        <div>
          <Text>
            author
            <Input
              id='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Text>
        </div>
        <div>
          <Text>
            title
            <Input
              id='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Text>
        </div>
        <div>
          <Text>
            url
            <Input
              id='url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </Text>
        </div>
        <Button id='create'>create</Button>
      </form>
    </div>
  );
};
export default connect(null, { createBlog, setNotification })(NewBlog);
