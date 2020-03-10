const INITAL_STATE = {
  id: "",
  username: "",
  password: "",
  email: "",
  // nama: "",
  roleId: 0,
  login: false,
  error: ""
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload, login: true, error: "" };
    case "LOGIN_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: "" };
    case "LOGOUT":
      return INITAL_STATE;
    default:
      return state;
  }
};
