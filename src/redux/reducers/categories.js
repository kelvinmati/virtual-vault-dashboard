import * as types from "../constants";

const initialState = {
  categories: [],
  categories_by_category_id: [],
  top_most: [],
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
    case types.GET_TOP_MOST_CATEGORIES:
      return {
        ...state,
        top_most: action.payload,
        loading: false,
      };
    case types.GET_CATEGORIES_BY_PARENT_ID:
      return {
        ...state,
        categories_by_category_id: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
