import axios from "axios";
import * as types from "../constants";
import { toast } from "react-hot-toast";
import {
  addCategoryFail,
  clearErrors,
  editCategoryFail,
  getErrors,
} from "./errors";
import { authToken } from "./auth";
import { get } from "react-hook-form";

const CATEGORY_URL = "https://api.virtualvault.lol/api/categories";
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
      dispatch(getTopMostCategories());
      dispatch(getSubCategories()); 
      dispatch(clearErrors());
    }
  } catch (error) {
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
    dispatch({
      type: types.GET_CATEGORIES_BY_PARENT_ID,
      payload: [], // Set an empty array to indicate no categories
    });
    toast.error(error.response.data.message);
  }
};

// get sub-categories
export const getSubCategories = () => async (dispatch) => {
  dispatch({
    type: types.LOADING,
  });
  try {
    const response = await axios.get(`${CATEGORY_URL}/sub-categories`);
    const data = await response.data;
    console.log("subCategories", data);
    if (data) {
      dispatch({
        type: types.GET_SUB_CATEGORIES,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);

  }
};

// edit category
export const editCategory = (id, payload) => async (dispatch) => {
  const { name, description } = payload;
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

    const body = JSON.stringify({ name, description });
    const response = await axios.put(
      `${CATEGORY_URL}/${id}`,
      body,
      authToken()
    );
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.EDIT_CATEGORY_SUCCESS,
        payload: data,
      });
      toast.success(data.message);
      dispatch(getTopMostCategories());
      dispatch(getSubCategories());

      dispatch(clearErrors());
    }
  } catch (error) {
    console.log(error);

    dispatch(getErrors(error.response.data.message, types.EDIT_CATEGORY_FAIL));
    dispatch(editCategoryFail());
    toast.error(error.response.data.message);
  }
};

// delete category
export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    const response = await axios.delete(`${CATEGORY_URL}/${categoryId}`, authToken())
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.DELETE_CATEGORY_SUCCESS,
        payload: data,
      });
      toast.success(data.message);
      dispatch(getTopMostCategories());
      dispatch(getSubCategories());
      // dispatch(clearErrors());

    }
  } catch (error) {
    console.log(error);
    // dispatch(getErrors(error.response.data.error, types.DELETE_CATEGORY_FAIL));

    toast.error(error.response.data.message);

  }

}