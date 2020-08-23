import {
  GET_PRODUCTS,
  GET_PRODUCT,
  PROFILE_ITEM,
  SEARCH_PRODUCTS,
  CATEGORY_PRODUCTS,
  CATE_SEARCH_PRODUCTS
} from "../actions";

const initialState = {
  products: [],
  product: {},
  profile: [],
  searchProdcuts: [],
  cateSearchProducts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload.data,
        searchProdcuts: payload.data,
      };
    case SEARCH_PRODUCTS:
      let search = payload.toLowerCase();
      const tempProducts = state.searchProdcuts.filter((item) =>
        item.name.toLowerCase().indexOf(search) !== -1 ? true : false
      );
      return {
        ...state,
        products: tempProducts,
      };
    case CATE_SEARCH_PRODUCTS:
      let catesearch = payload.toLowerCase();
      const tempCateProducts = state.cateSearchProducts.filter((item) =>
        item.name.toLowerCase().indexOf(catesearch) !== -1 ? true : false
      );
      return {
        ...state,
        products: tempCateProducts,
      };
    case CATEGORY_PRODUCTS:
      const tempCategory = state.searchProdcuts.filter(
        (item) => parseInt(item.categories) === parseInt(payload)
      );

      return {
        ...state,
        products: tempCategory,
        cateSearchProducts: tempCategory,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload.data,
        profile: payload.data?.profileitem?.reduce(
          (name, key) => [
            ...name,
            {
              id: key.item[0].id,
              item: key.profile,
              name: key.item[0].name,
              price: key.item[0].price,
            },
          ],
          []
        ),
      };
    case PROFILE_ITEM:
      return {
        ...state,
        profile: state.profile.map((item) =>
          item.item === payload.item ? payload : item
        ),
      };
    default:
      return state;
  }
}
