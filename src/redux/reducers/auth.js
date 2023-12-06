import * as types from "../constants";
const initialState = {
  isAuthenticated: !!localStorage.getItem("userToken"),
  loading: false,
  user: {},
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case types.AUTH_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
