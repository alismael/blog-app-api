export default function reducer(state={
    user: null,
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "USER_LOGIN": {
        return {...state, fetching: true}
      }
      case "USER_LOGIN_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "USER_LOGIN_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
          error: null,
        }
      }
    }

    return state
}
