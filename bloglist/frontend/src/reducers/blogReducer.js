import blogService from '../services/blogs';

const byLikes = (b1, b2) => b2.likes - b1.likes;

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.sort(byLikes);
    case 'COMMENT':
      const commented = action.commentedBlog;
      return state.map((b) => (b.id === commented.id ? commented : b));
    case 'LIKE':
      const liked = action.likedBlog;
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
      type: 'INIT_BLOGS',
      data,
    });
  };
};

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    const data = await blogService.postComment(blog.id, { message: comment });
    const commentedBlog = { ...data, user: blog.user };
    dispatch({
      type: 'COMMENT',
      commentedBlog,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const toLike = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const data = await blogService.update(toLike);
    const likedBlog = { ...data, user: blog.user };
    dispatch({
      type: 'LIKE',
      likedBlog,
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
