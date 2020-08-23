import {
  GET_PRODUCTS,
  GET_PRODUCT,
  PROFILE_ITEM,
  SEARCH_PRODUCTS,
  CATEGORY_PRODUCTS,
  CATE_SEARCH_PRODUCTS,
} from "../actions";
import request from "../api/request";
import { getErrors } from "./errorActions";
import { flatFields } from "../../helpers/tidyDBData";

const tidyProduct = (x) => {
  let temp = flatFields(x.fields);
  temp.medias = temp.media.split("|");
  let categories = flatFields(x.categories);
  let profileitem = flatFields(x.profileitems);
  let categoriesObj = [...categories];
  categories = categories.map((x) => x.id)[0];
  // parse item
  let keys = [];
  profileitem.forEach((x) => {
    let a = -1 === keys.indexOf(x.profile) ? keys.push(x.profile) : 0;
  });

  let pi = [];
  keys.forEach((k) => {
    let temp = profileitem.filter((x) => x.profile === k);
    // let ta = temp.map(x => {profile: x, 'item': temp})
    pi.push({ profile: k, item: temp });
  });

  return { ...temp, categories, profileitem: pi, categoriesObj };
};

export const searchProducts = (searchValue) => ({
  type: SEARCH_PRODUCTS,
  payload: searchValue,
});

export const cateSearchProducts = (searchValue) => ({
  type: CATE_SEARCH_PRODUCTS,
  payload: searchValue,
});

export const categoryProducts = (category) => ({
  type: CATEGORY_PRODUCTS,
  payload: category,
});

export const getProducts = (token) => async (dispatch) => {
  try {
    let res = await request.get(`api/v1/product`);

    if (res?.data && res.data)
      res.data.data = res.data.data.map((x) => tidyProduct(x));

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    // return false;
    const errors = {
      msg: e?.response?.data?.msg,
      status: e?.response?.data?.code,
    };
    dispatch(getErrors(errors));
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    let res = await request.get(`api/v1/product/${id}`, {
      headers: {
        Authorization: `Bear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im1vZGVsIjoidXNlckFwaS5ta3VzZXIiLCJwayI6MTA5LCJmaWVsZHMiOnsidXNlck5hbWUiOiJqZXJyeSIsImZpcnN0TmFtZSI6ImplcnJ5IiwibGFzdE5hbWUiOiJMaSIsImVtYWlsIjoiamVycnlAbWFyazJ3aW4uY29tIiwicGFzc3dvcmQiOiJjN2VmOWE3NDQzMGE0OGVmNDM2Nzc0YjdiZmZmNTVkNjIyNGJlMDk2IiwidmVyaWZpZWQiOjIsInZjb2RlIjpudWxsLCJ2Y29kZURhdGUiOm51bGwsInppcGNvZGUiOm51bGwsImNpdHkiOm51bGwsInN0YXRlIjpudWxsLCJjb3VudHJ5IjpudWxsLCJhZGRyZXNzMSI6bnVsbCwiYWRkcmVzczIiOm51bGwsInJlZ2lzdGVySVAiOm51bGwsImxhc3RMb2dpbklQIjpudWxsLCJpc1N0YWZmIjp0cnVlLCJpc0FjdGl2ZSI6dHJ1ZSwiaXNEZWxldGVkIjpmYWxzZSwiaXNTdXBlclVzZXIiOmZhbHNlLCJsYXN0TG9naW4iOiIyMDIwLTA2LTE2VDE3OjEwOjA1LjM1NFoiLCJyZWdpc3RlclRpbWUiOiIyMDIwLTA2LTE2VDE3OjEwOjA1LjM1NFoiLCJhY3RpdmF0ZVRpbWUiOm51bGwsInJvbGVzIjpbXX19LCJleHBpcnkiOjYwMDAwfQ.HgXru6cxJnwn3GlWKRsf0qmp2OZ4V70c1he9s2QqvAQ`,
      },
    });

    if (res?.data && res.data) res.data.data = tidyProduct(res.data.data);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    // return false;
    const errors = {
      msg: e?.response?.data?.msg,
      status: e?.response?.data?.code,
    };
    dispatch(getErrors(errors));
  }
};

export const controlProfileItem = (id, item, name, price) => {
  return {
    type: PROFILE_ITEM,
    payload: { id, item, name, price },
  };
};
