import axios from "axios";
import * as types from "../constants";
import toast from "react-hot-toast";
import { clearErrors, createProductFail, getErrors } from "./errors";

const PRODUCTS_URL = "https://api.virtualvault.lol/api/products";
// const PRODUCTS_URL = "http://localhost:7000/api/products";

// get all products
// export const getAllProducts = (page) => async (dispatch) => {
//   await dispatch({
//     type: types.LOADING,
//   });
//   try {
//     const response = await axios.get(`${PRODUCTS_URL}?page=${page}&searchTerm=${searchTerm}}`);
//     const data = response.data;
//     // console.log("res", data);
//     if (data) {
//       dispatch({
//         type: types.GET_ALL_PRODUCTS,
//         payload: data,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getAllProducts = (page) => async (dispatch) => {
  // const { page, searchTerm } = payload;
  await dispatch({
    type: types.LOADING,
  });
  try {
    const response = await axios.get(`${PRODUCTS_URL}?page=${page}`);
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
    unit,
    price,
    currency,
    quantity,
    discount,
    brandId,
    categoryId,
    sizes,
    gallery,
    featured,
  } = payload;
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("sku", sku);
    formData.append("description", description);
    formData.append("weight", weight);
    formData.append("unit", unit);
    formData.append("quantity", quantity);
    formData.append("price", price);
    // formData.append("currency", currency);
    formData.append("discount", discount);
    formData.append("brandId", brandId);
    formData.append("categoryId", categoryId);
    formData.append("sizes", sizes);

    // upload multiple images
    gallery?.map((file) => {
      formData.append(`gallery`, file.originFileObj);
    });

    // upload single image
    featured?.map((file) => {
      formData.append(`featured_image`, file.originFileObj);
    });

    console.log("formData is", formData);
    // dispatch({ type: types.PRODUCT_LOADING });
    const response = await axios.post(`${PRODUCTS_URL}`, formData);
    const data = await response.data;
    if (data) {
      await dispatch({
        type: types.CREATE_PRODUCT_SUCCESS,
        payload: data,
      });
      toast.success(data.message);
      dispatch(getAllProducts());
      dispatch(clearErrors());
    }
  } catch (error) {
    console.log(error);
    dispatch(getErrors(error.response.data.error, types.CREATE_PRODUCT_FAIL));
    dispatch(createProductFail());
    toast.error(error.response.data.message);
  }
};

// get product by id
export const getProductById = (productId) => async (dispatch) => {
  // await dispatch({
  //   type: types.LOADING,
  // });
  try {
    const response = await axios.get(`${PRODUCTS_URL}/${productId}`);
    const data = await response.data;
    // console.log("action data is", data);
    if (data) {
      dispatch({
        type: types.GET_PRODUCT_BY_ID,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
