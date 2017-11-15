import axios from "axios";

export function login(username, password) {
  return function (dispatch) {
    dispatch({ type: "USER_LOGIN" });

    axios.post("/api/user/login", { 'username': username, 'password': password })
      .then((response) => {
        console.log('succ', response)
        dispatch({ type: "USER_LOGIN_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        console.log('err', err)
        dispatch({ type: "USER_LOGIN_REJECTED", payload: err })
      })
  }
}