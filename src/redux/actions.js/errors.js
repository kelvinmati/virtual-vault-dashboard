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

// edit category fail
export const editCategoryFail = () => {
  return {
    type: types.EDIT_CATEGORY_FAIL,
  };
};
// login user fail
export const loginUserFail = () => {
  return {
    type: types.LOGIN_USER_FAIL,
  };
};

// create product fail
export const createProductFail = () => {
  return {
    type: types.CREATE_PRODUCT_FAIL,
  };
};
