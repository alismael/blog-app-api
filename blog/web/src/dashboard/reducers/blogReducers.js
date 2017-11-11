export default function reducer(state={
    blogs: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_BLOGS": {
        return {...state, fetching: true}
      }
      case "FETCH_BLOGS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_BLOGS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          blogs: action.payload,
        }
      }
      case "ADD_BLOG": {
        return {
          ...state,
          blogs: [...state.blogs, action.payload],
        }
      }
      case "UPDATE_BLOG": {
        const { id, text } = action.payload
        const newBlogs = [...state.blogs]
        const blogToUpdate = newBlogs.findIndex(blog => blog.id === id)
        newBlogs[blogToUpdate] = action.payload;

        return {
          ...state,
          blogs: newBlogs,
        }
      }
      case "DELETE_BLOG": {
        return {
          ...state,
          blogs: state.blogs.filter(blog => blog.id !== action.payload),
        }
      }
    }

    return state
}
