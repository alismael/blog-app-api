import { service } from './../../Service/Service';
import {
  FETCH_BLOGS,
  FETCH_BLOGS_REJECTED,
  FETCH_BLOGS_FULFILLED,
  ADD_BLOG,
  DELETE_BLOG,
  EDIT_BLOG
} from '../constants/ActionTypes';

export function fetchBlogs() {
  return function(dispatch: any) {
    dispatch({type: FETCH_BLOGS});

    service.fetchBlogs()
      .then((response) => {
        dispatch({type: FETCH_BLOGS_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: FETCH_BLOGS_REJECTED, payload: err})
      })
  }
}

export function addBlog(title: string, description: string) {
  return {
    type: ADD_BLOG,
    payload: {
      title,
      description,
    },
  }
}

export function updateBlog(id: string,title: string, description: string) {
  return {
    type: EDIT_BLOG,
    payload: {
      id,
      title,
      description
    },
  }
}

export function deleteBlog(id: string) {
  return { 
    type: DELETE_BLOG,
    payload: id
  }
}
