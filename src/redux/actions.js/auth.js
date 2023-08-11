import axios from "axios";
import * as types from "../constants";
import { toast } from "react-hot-toast";
import { clearErrors, getErrors } from "./errors";
const AUTH_URL = "http://api.virtualvault.lol/api/user";
// REGISTER USER
export const registerUser = (payload) => async (dispatch) => {
  const {
    firstname,
    lastname,
    email,
    password,
    role,
    contactNumber,
    shippingAddress,
  } = payload;
  await dispatch({
    type: types.LOADING,
  });
  try {
    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // body
    const body = JSON.stringify({
      firstname,
      lastname,
      email,
      password,
      role,
      contactNumber,
      shippingAddress,
    });
    const response = await axios.post(`${AUTH_URL}/signup`, body, config);
    const data = await response.data;

    if (data) {
      dispatch({
        type: types.REGISTER_USER_SUCCESS,
        payload: data,
      });
      toast.success(data.message);
      dispatch(clearErrors());
    }
  } catch (error) {
    console.log(error);
    dispatch(getErrors(error.response.data.message, types.REGISTER_USER_FAIL));
    toast.error(error.response.data.message);
  }
};
// user login
export const userLogin = (payload) => async (dispatch) => {
  const { email, password } = payload;
  try {
    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // request body
    const body = JSON.stringify({
      email,
      password,
    });

    // const response = await axios.post(`${AUTH_URL}/signin`, body);
    const response = await axios.post(`${AUTH_URL}/login`, body, config);
    const data = await response.data;
    const token = await data.data.token;
    console.log(data);
    if (data) {
      dispatch({
        type: types.LOGIN_USER_SUCCESS,
        payload: data,
      });
      // store token to local storage
      localStorage.setItem("userToken", token);
      toast.success("Welcome successfully logged in");
      dispatch(clearErrors());
    }
  } catch (error) {
    console.log(error);
    await dispatch(
      getErrors(error.response.data.message, types.LOGIN_USER_FAIL)
    );
    toast.error(error.response.data.error);
  }
};
// Authentication using the stored token
export const authToken = () => {
  // Get token from localStorage
  const token = localStorage.getItem("userToken");
  // Headers
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  // if token exist ,add authorizarion

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

// auth user
export const userProfile = () => async (dispatch) => {
  try {
    const response = await axios.get(`${AUTH_URL}/profile`, authToken());
    const data = await response.data;
    // console.log("data is", data);
    if (data) {
      dispatch({
        type: types.AUTH_USER,
        payload: data,
      });
      console.log("action current user is", data);
    }
  } catch (error) {
    console.log(error);
  }
};

// user logout
export const userLogout = () => (dispatch) => {
  try {
    localStorage.removeItem("userToken");
    dispatch({
      type: types.LOGOUT_SUCCESS,
    });
    toast.success("You are now logged out.");
  } catch (error) {
    console.log(error);
  }
};
