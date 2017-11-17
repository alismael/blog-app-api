import axios from "axios";

export function login(username, password) {
  return function (dispatch) {
    dispatch({ type: "USER_LOGIN" });

    axios.post("/api/user/login", { 'username': username, 'password': password })
      .then((response) => {
        dispatch({ type: "USER_LOGIN_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "USER_LOGIN_REJECTED", payload: 'Wrong username or password!' })
      })
  }
}