import styled, { keyframes, css, props } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  padding: 20px;
  width: 90%;
  max-width: 500px;
  height: 100%;
`;

const red = '#f22613';
const blue = '#00ffff';
const titleFont = `'Lucida Console', monospace`;
const textFont = `Courier, monospace`;

const plainText = css`
  font-family: ${textFont};
  font-size: 1em;
  text-decoration: none;
`;

const Titles = styled.p`
  font-family: 'Lucida Console', monospace;
  text-shadow: -0.08em 0 0 ${red}, 0.08em 0 0 ${blue};
`;

export const Button = styled.button`
  background: ${(props) => (props.bg === 'white' ? 'white' : 'black')};
  color: ${(props) => (props.bg === 'white' ? 'black' : 'white')};
  ${plainText}
  margin: ${(props) => (props.small ? '0 10px' : '10px 5px')};
  padding: ${(props) => (props.small ? '1px 3px' : '.4em')};
  border: none;
  font-size: ${(props) => (props.small ? '.9em' : '1em')};
  &:hover {
    box-shadow: -0.2em -0.2em ${red}, 0.2em 0.2em ${blue};
  }
  &:focus {
    box-shadow: -0.2em -0.2em ${red}, 0.2em 0.2em ${blue};
    outline: none;
  }
`;

export const Title = styled.p`
  font-family: ${titleFont};
  text-shadow: ${(props) =>
    props.sub === 3 ? 'none' : `-0.08em 0 0 ${red}, 0.08em 0 0 ${blue}`};
  font-size: ${(props) =>
    props.sub === 3 ? '1.3em' : props.sub === 2 ? '1.5em' : '2em'};
`;

export const Text = styled.div`
  ${plainText}
  color: ${(props) => (props.white ? 'white' : 'black')}
`;

export const Italic = styled.span`
  font-style: italic;
`;

export const StyledLink = styled(Link)`
  ${plainText}
  color: ${(props) => (props.white ? 'white' : `black`)};
  text-decoration: underline ${red};
  margin-right: 5px;
  &:hover,&:focus {
    background-color: ${red};
    color: white;
  };
`;

export const StyledA = styled.a`
${plainText}
color: ${(props) => (props.white ? 'white' : `black`)};
text-decoration: underline ${red};
&:hover,&:focus {
  background-color: ${red};
  color: white;

};
`;

export const ListItem = styled.li`
  ${plainText}
  list-style-type: ${(props) => (props.listType ? props.listType : "'\\270E'")};
  margin: 5px;
`;

export const Input = styled.input`
  ${plainText}
  border: 1px solid black;
  margin: 5px;
  padding: 3px;
  &:focus {
    box-shadow: -0.2em -0.2em ${red}, 0.2em 0.2em ${blue};
    outline: none;
    border: 1px solid transparent;
  }
`;

export const Form = styled.form`
  padding: 10px;
`;

export const StyledBlogList = styled.div`
  padding: 10px;
  border: 1px solid black;
  &:hover,
  & > *:hover {
    background-color: ${red};
    color: white;
  }
`;

export const TopNavBar = styled.div`
  background-color: black;
  display: flex;
  padding: 5px;
  flex-wrap: wrap;
  align-content; space-around;
`;

export const TopNotification = styled.div`
  ${plainText}
  padding: 10px;
  box-shadow: ${(props) =>
    props.primaryColor === 'red'
      ? `0.2em 0.2em ${red}`
      : `0.2em 0.2em ${blue}`};
  border: ${(props) =>
    props.primaryColor === 'red' ? `2px solid ${red}` : `2px solid ${blue}`};
`;
