import axios from "axios";

export function fetchBlogs() {
  return function(dispatch) {
    dispatch({type: "FETCH_BLOGS"});

    axios.get("/api/blog")
      .then((response) => {
        dispatch({type: "FETCH_BLOGS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_BLOGS_REJECTED", payload: err})
      })
  }
}

export function addBlog(id, text) {
  return {
    type: 'ADD_BLOG',
    payload: {
      id,
      text,
    },
  }
}

export function updateBlog(id, text) {
  return {
    type: 'UPDATE_BLOG',
    payload: {
      id,
      text,
    },
  }
}

export function deleteBlog(id) {
  return { type: 'DELETE_BLOG', payload: id}
}
