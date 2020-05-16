import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { StyledLink, Title, ListItem } from '../styledComponents';

const User = (props) => {
  const id = useParams().id;
  const user = useSelector((state) => {
    return state.users.find((u) => u.id === id);
  });
  if (!user) {
    return null;
  }

  return (
    <div>
      <Title sub={2}>{user.name}</Title>
      <Title sub={3}>added blogs</Title>
      <ul>
        {user.blogs.map((b) => (
          <ListItem listType={"'\\27AD'"} key={b.id}>
            <StyledLink to={`/blogs/${b.id}`}>{b.title}</StyledLink>
          </ListItem>
        ))}
      </ul>
    </div>
  );
};

export default User;
