import axios from "axios";
import * as types from "../constants";

const PRODUCTS_URL = "http://localhost:7000/api/product";
// get all products
export const getAllProducts = (page) => async (dispatch) => {
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
