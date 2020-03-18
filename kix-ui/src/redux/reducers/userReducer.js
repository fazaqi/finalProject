const INITAL_STATE = {
  // nama: "",
  // alamat: "",
  // email: "",
  // jeniskelamin: "",
  // nomorhp: "",
  loading: true,
  error: ""
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case "GETDATA_SUCCESS":
      return { ...state, ...action.payload, loading: false, error: "" };
    case "GETDATA_FAIL":
      return { ...state, error: "GAGAL" };
    case "LOADING_USER":
      return { ...state, loading: true };
    case "LOGOUT":
      return INITAL_STATE;
    default:
      return state;
  }
};
