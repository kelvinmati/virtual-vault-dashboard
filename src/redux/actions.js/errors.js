import * as types from "../constants";
export const getErrors = (msg, typeId) => {
  return {
    type: types.GET_ERRORS,
    payload: {
      msg,
      typeId,
    },
  };
};

export const clearErrors = () => {
  return {
    type: types.CLEAR_ERRORS,
  };
};
// add category fail
export const addCategoryFail = () => {
  return {
    type: types.ADD_CATEGORY_FAIL,
  };
};
// register user fail
export const registerUserFail = () => {
  return {
    type: types.REGISTER_USER_FAIL,
  };
};
// login user fail
export const loginUserFail = () => {
  return {
    type: types.LOGIN_USER_FAIL,
  };
};
