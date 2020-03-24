const INITIAL_STATE = {
  cart: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GETCART_SUCCESS":
      return {
        ...state,
        cart: action.payload
      };
    case "GETCART_FAIL":
      return INITIAL_STATE;
    case "LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};
