import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";

export const getCart = () => {
  return async dispatch => {
    try {
      dispatch({ type: "LOADING" });
      const id = localStorage.getItem("kix");
      if (!id) {
        return dispatch({ type: "LOADING_DONE" });
      }

      const resCart = await Axios.get(`${APIURL}trans/getcart/${id}`);
      dispatch({
        type: "GETCART_SUCCESS",
        payload: resCart.data.result[0].cart
      });
    } catch (error) {
      dispatch({ type: "GETCART_FAIL" });
      dispatch({ type: "LOADING_DONE" });
    }
  };
};
