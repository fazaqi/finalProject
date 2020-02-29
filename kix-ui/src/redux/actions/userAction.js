import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";

export const getDataUser = userData => {
  return {
    type: "LOGIN_SUCCESS",
    payload: userData
  };
};

export const clearError = () => {
  return {
    type: "CLEAR_ERROR"
  };
};

export const userLoginAct = (username, password) => {
  return dispatch => {
    Axios.get(`${APIURL}user/login?username=${username}&password=${password}`)
      .then(res => {
        if (res.data.length) {
          //   console.log(res.data[0]);
          localStorage.setItem("kix", res.data[0].id);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data[0]
          });
        } else {
          console.log("username / password salah");
          dispatch({
            type: "LOGIN_ERROR",
            payload: "Salah Username / Password"
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: "LOGIN_ERROR", payload: "Server Error" });
      });
  };
};

export const logoutAct = () => {
  return {
    type: "LOGOUT"
  };
};
