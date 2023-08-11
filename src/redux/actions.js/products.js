import axios from "axios";
import * as types from "../constants";

const PRODUCTS_URL = "http://api.virtualvault.lol/api/product";
// get all products
export const getAllProducts = (page) => async (dispatch) => {
  await dispatch({
    type: types.LOADING,
  });
  try {
    const response = await axios.get(`${PRODUCTS_URL}/all?page=${page}`);
    const data = response.data;
    // console.log("res", data);
    if (data) {
      dispatch({
        type: types.GET_ALL_PRODUCTS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// search product
export const searchProduct = (searchTerm) => async (dispatch) => {
  // await dispatch({
  //   type: types.LOADING,
  // });
  try {
    const response = await axios.get(
      `${PRODUCTS_URL}/products-search/ext?searchTerm=${searchTerm}`
    );
    const data = await response.data;
    // console.log("action data is", data);
    if (data) {
      dispatch({
        type: types.PRODUCTS_SEARCH_RESULTS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// create new product
export const createProduct = (payload) => async (dispatch) => {
  const {
    title,
    sku,
    description,
    weight,
    price,
    quantity,
    discount,
    brandId,
    categoryId,
    fileList,
  } = payload;
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("sku", sku);
    formData.append("description", description);
    formData.append("weight", weight);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("brandId", brandId);
    formData.append("categoryId", categoryId);

    // upload multiple images
    // fileList?.map((file) => {
    //   formData.append(`gallery`, file);
    // });
    // formData.append("gallery", fileList);
    console.log("formData is", formData);
    // dispatch({ type: types.PRODUCT_LOADING });
    const response = await axios.post(`${PRODUCTS_URL}/add`, formData);
    const data = await response.data;
    console.log("action data is", data);
    if (data) {
      await dispatch({
        type: types.CREATE_PRODUCT_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
