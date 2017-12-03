import { service } from './../../Service/Service';

export function login(username: string, password: string) {
  return function (dispatch: (action: object) => void ) {
    dispatch({ type: "USER_LOGIN" });
    service.login({ 'username': username, 'password': password })
      .then((response) => {
        dispatch({ type: "USER_LOGIN_FULFILLED", payload: response.data })
      })
      .catch((_) => {
        dispatch({ type: "USER_LOGIN_REJECTED", payload: 'Wrong username or password!' })
      })
  }
}