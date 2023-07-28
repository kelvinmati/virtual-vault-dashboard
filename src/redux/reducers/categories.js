import * as types from "../constants";

const initialState = {
  categories: [],
  category: [],
  loading: false,
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case types.ADD_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
      };
    case types.GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
