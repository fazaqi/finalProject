import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";

// export const userSuccess = userdata => {
//   return {
//     type: "LOGIN_SUCCESS",
//     payload: userdata
//   };
// };

// export const userError = () => {
//   return {
//     type: "LOGIN_ERROR",
//     payload: "Salah Username / Password"
//   };
// };

export const getDataUser = id => {
  return dispatch => {
    Axios.get(`${APIURL}user/login/${id}`)
      .then(res => {
        if (res.data.length) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data[0]
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
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
