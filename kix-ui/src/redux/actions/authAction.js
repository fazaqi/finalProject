import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";

export const loginAct = (username, password) => {
  return async dispatch => {
    try {
      const res = await Axios.get(
        `${APIURL}user/login?username=${username}&password=${password}`
      );
      if (res.data.length === 0) {
        return dispatch({ type: "LOGIN_ERROR", payload: "Server Error" });
      }
      dispatch({ type: "LOADING" });
      localStorage.setItem("kix", res.data[0].id);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data[0]
      });
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR", payload: "Server Error" });
    }
  };
};

export const logoutAct = () => {
  return async dispatch => {
    localStorage.removeItem("kix");
    await dispatch({ type: "LOGOUT" });
    dispatch({ type: "LOADING_DONE" });
  };
};

export const clearError = () => {
  return {
    type: "CLEAR_ERROR"
  };
};

// export const getDataUser = userData => {
//   return {
//     type: "LOGIN_SUCCESS",
//     payload: userData
//   };
// };

// export const getUser = () => {
//   return async dispatch => {
//     try {
//       dispatch({ type: "LOADING" });
//       const id = localStorage.getItem("kix");
//       if (!id) {
//         return dispatch({ type: "LOADING_DONE" });
//       }
//       const res = await Axios.get(`${APIURL}user/login/${id}`);
//       // console.log(res.data[0]);
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data[0] });
//     } catch (error) {
//       dispatch({ type: "LOADING_DONE" });
//     }
//   };
// };
