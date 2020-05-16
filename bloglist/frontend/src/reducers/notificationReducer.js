const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.content, type: action.notificationType };
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

let timeoutId;

export const setNotification = (content, notificationType, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content,
      notificationType,
    });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      });
    }, time * 1000);
  };
};

export const clearNotification = (id) => ({ type: 'CLEAR_NOTIFICATION' });

export default reducer;
