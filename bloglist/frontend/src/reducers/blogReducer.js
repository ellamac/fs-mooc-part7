import blogService from '../services/blogs';

const byLikes = (b1, b2) => b2.likes - b1.likes;

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data.sort(byLikes);
    case 'LIKE':
      const liked = action.data;
      return state.map((b) => (b.id === liked.id ? liked : b)).sort(byLikes);
    case 'CREATE':
      return [...state, action.data];
    case 'REMOVE':
      return state.filter((blog) => blog.id !== action.blog.id);
    default:
      return state;
  }
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const data = await blogService.create(newBlog);
    dispatch({
      type: 'CREATE',
      data,
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll();
    dispatch({
      type: 'INIT',
      data,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const toLike = { ...blog, likes: blog.likes + 1, user: blog.user };
    const data = await blogService.update(toLike);
    dispatch({
      type: 'LIKE',
      data,
    });
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (ok) {
      await blogService.remove(blog.id);
      dispatch({
        type: 'REMOVE',
        blog,
      });
    }
  };
};

export default reducer;
