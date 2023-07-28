import axios from "axios";
import * as types from "../constants";
import { toast } from "react-hot-toast";
import { addCategoryFail, clearErrors, getErrors } from "./errors";

const CATEGORY_URL = "http://localhost:7000/api/category";

// add new category
export const addCategory = (payload) => async (dispatch) => {
  // const { parentId, name, description } = payload;

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

    // const body = JSON.stringify({ name, description, parentId });
    const response = await axios.post(`${CATEGORY_URL}/add`, payload, config);
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
    dispatch(getErrors(error.response.data.message, types.ADD_CATEGORY_FAIL));
    dispatch(addCategoryFail());
    toast.error(error.response.data.message);
  }
};

// get all categories
export const getAllCategories = () => async (dispatch) => {
  dispatch({
    type: types.LOADING,
  });
  try {
    const response = await axios.get(`${CATEGORY_URL}/all`);
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
