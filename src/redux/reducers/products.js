import * as types from "../constants";

const initialState = {
  products: [],
  product: {},

  loading: false,
  search_results: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case types.PRODUCTS_SEARCH_RESULTS:
      return {
        ...state,
        search_results: action.payload,
        loading: false,
      };
    case types.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case types.GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
