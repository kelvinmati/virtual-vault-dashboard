import axios from "axios";
import * as types from "../constants";
import { toast } from "react-hot-toast";
import { addCategoryFail, clearErrors, getErrors } from "./errors";
import { authToken } from "./auth";

const CATEGORY_URL = "http://api.virtualvault.lol/api/categorie";
// const CATEGORY_URL = "http://localhost:7000/api/categories";

// add new category
export const addCategory = (payload) => async (dispatch) => {
  const { parentId, name, description } = payload;
  dispatch({
    type: types.LOADING,
  });
  try {
    // headers
    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, description, parentId });
    const response = await axios.post(`${CATEGORY_URL}`, body, authToken());
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.ADD_CATEGORY_SUCCESS,
        payload: data,
      });
      toast.success(data.message);
      dispatch(getAllCategories());
      dispatch(clearErrors());
    }
  } catch (error) {
    console.log(error);
    dispatch(getErrors(error.response.data.error, types.ADD_CATEGORY_FAIL));
    dispatch(addCategoryFail());
    toast.error(error.response.data.error);
  }
};

// get all categories
export const getAllCategories = () => async (dispatch) => {
  dispatch({
    type: types.LOADING,
  });
  try {
    const response = await axios.get(`${CATEGORY_URL}`);
    const data = await response.data;

    if (data) {
      dispatch({
        type: types.GET_ALL_CATEGORIES,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// get top-most categories
export const getTopMostCategories = () => async (dispatch) => {
  dispatch({
    type: types.LOADING,
  });
  try {
    const response = await axios.get(`${CATEGORY_URL}/top-most`);
    const data = await response.data;

    if (data) {
      dispatch({
        type: types.GET_TOP_MOST_CATEGORIES,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesByparentId = (parentId) => async (dispatch) => {
  dispatch({
    type: types.LOADING,
  });
  try {
    const response = await axios.get(`${CATEGORY_URL}/parent/${parentId}`);
    const data = await response.data;

    if (data) {
      dispatch({
        type: types.GET_CATEGORIES_BY_PARENT_ID,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
