import { IBlogState } from '../../Service/models'
import { Action } from 'redux-actions';
import {
  FETCH_BLOGS,
  FETCH_BLOGS_REJECTED,
  FETCH_BLOGS_FULFILLED,
  ADD_BLOG,
  DELETE_BLOG,
  EDIT_BLOG
} from '../constants/ActionTypes';

const initialState: IBlogState = {
  blogs: [],
  fetching: false,
  fetched: false,
  error: '',
}

export function reducer(state: IBlogState = initialState, action: Action<any>): IBlogState {

  switch (action.type) {
    case FETCH_BLOGS: {
      return {
        ...state,
        fetching: true
      }
    }
    case FETCH_BLOGS_REJECTED: {
      return {
        ...state, fetching: false,
        error: action.payload
      }
    }
    case FETCH_BLOGS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        blogs: action.payload,
      }
    }
    case ADD_BLOG: {
      return {
        ...state,
        blogs: [
          ...state.blogs,
          action.payload
        ],
      }
    }
    case EDIT_BLOG: {
      return {
        ...state,
        blogs: state.blogs.filter(blog =>
          blog.id === action.payload.id
            ? action.payload
            : blog
        ),
      }
    }
    case DELETE_BLOG: {
      return {
        ...state,
        blogs: state.blogs.filter(blog =>
          blog.id !== action.payload
        ),
      }
    }
  }

  return state
}
