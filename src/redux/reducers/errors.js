import * as types from "../constants";

const initialState = {
  msg: {},
  typeId: null,
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ERRORS:
      return {
        msg: action.payload.msg,
        typeId: action.payload.typeId,
      };
    case types.CLEAR_ERRORS:
      return {
        msg: {},
        typeId: null,
      };
    default:
      return state;
  }
}
