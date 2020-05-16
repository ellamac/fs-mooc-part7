import loginService from '../services/login';
import storage from '../utils/storage';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.user;
    case 'LOGIN':
      storage.saveUser(action.user);
      return action.user;
    case 'LOGOUT':
      storage.logoutUser();
      return null;
    default:
      return state;
  }
};

export const initializeUser = () => {
  return async (dispatch) => {
    const user = storage.loadUser();
    dispatch({
      type: 'INIT_USER',
      user,
    });
  };
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    dispatch({
      type: 'LOGIN',
      user,
    });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export default reducer;
