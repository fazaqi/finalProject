const INITAL_STATE = {
  id: "",
  username: "",
  email: "",
  roleId: 0,
  error: "",
  login: false,
  loading: true
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        ...action.payload,
        login: true,
        error: "",
        loading: false
      };
    case "LOGIN_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "LOADING":
      return { ...state, loading: true, error: "" };
    case "LOADING_DONE":
      return { ...state, loading: false, error: "" };
    case "CLEAR_ERROR":
      return { ...state, error: "" };
    case "LOGOUT":
      return INITAL_STATE;
    default:
      return state;
  }
};
