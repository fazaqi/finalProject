import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";

export const getUser = () => {
  return async dispatch => {
    try {
      dispatch({ type: "LOADING" });
      const id = localStorage.getItem("kix");
      if (!id) {
        return dispatch({ type: "LOADING_DONE" });
      }
      const res = await Axios.get(`${APIURL}user/login/${id}`);
      // console.log(res.data[0]);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data[0] });
    } catch (error) {
      dispatch({ type: "LOADING_DONE" });
    }
  };
};

// export const getDetailUser = (id, role) => {
//   return async dispatch => {
//     try {
//       dispatch({ type: "LOADING_USER" });
//       const res = await Axios.post(`${APIURL}manage/getuser`, { id, role });
//       // console.log(res);
//       dispatch({ type: "GETDATA_SUCCESS", payload: res.data[0] });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const getDetail = data => {
  return {
    type: "GETDATA_SUCCESS",
    payload: data
  };
};

export const updateUser = (id, data) => {
  return async dispatch => {
    try {
      const res = await Axios.put(`${APIURL}manage/updateuser/${id}`, data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateToko = (id, data) => {
  return async dispatch => {
    try {
      const res = await Axios.put(`${APIURL}manage/updatetoko/${id}`, data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
};
