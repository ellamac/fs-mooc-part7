import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { StyledLink, Text, Title } from '../styledComponents';

const UserList = (props) => {
  const users = useSelector((state) => {
    return state.users;
  });

  return (
    <div>
      <Title sub={2}>Users</Title>
      <table>
        <tbody>
          <tr>
            <th />
            <th>
              <Text>blogs created</Text>
            </th>
          </tr>

          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <StyledLink to={`users/${user.id}`}>{user.name}</StyledLink>
              </td>
              <td>
                <Text>{user.blogs.length}</Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
