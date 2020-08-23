import {
  ADD_CART,
  GET_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  SHOW_CART,
  CHECK_OUT,
} from "../actions";
import history from "../history";
import request from "../api/request";
import { getErrors } from "../actions/errorActions";

export const addCart = (data) => {
  console.log("from actions", data);

  return {
    type: ADD_CART,
    payload: data,
  };
};

export const checkOut = (values, token) => async (dispatch) => {
  try {
    let res = await request.post(`api/v1/order/create`, values, {
      headers: { Authorization: `Bear ${token}` },
    });
    if (res.data.code === 0) {
      dispatch({
        type: CHECK_OUT,
      });
      localStorage.removeItem("Bear-cart");
      history.push("/account/success");
    } else {
      const errors = {
        msg: res?.data?.msg,
        status: 401,
      };
      dispatch(getErrors(errors));
    }
  } catch (e) {
    console.log(e);
    const errors = {
      msg: e?.response?.data?.msg,
      status: e?.response?.data?.code,
    };
    dispatch(getErrors(errors));
  }
};

export const showCart = (value) => ({
  type: SHOW_CART,
  payload: value,
});

export const getCart = () => {
  return {
    type: GET_CART,
  };
};

export const remove = (sku) => {
  return {
    type: REMOVE,
    payload: { sku },
  };
};

export const increase = (sku) => {
  return {
    type: INCREASE,
    payload: { sku },
  };
};

export const decrease = (sku, amount) => {
  return {
    type: DECREASE,
    payload: { sku, amount },
  };
};
