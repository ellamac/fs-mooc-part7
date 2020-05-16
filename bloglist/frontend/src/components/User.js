import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
