import { GET_ORDERS, GET_ORDER } from "../actions";
import request from "../api/request";
import { getErrors } from "./errorActions";
import { flatFields, tidyObj } from "../../helpers/tidyDBData";

const tidyOrder = (x) => {
  let temp = flatFields(x.fields);
  let user = flatFields(x.user);
  let orderItems = x.orderItems.map((o) => {
    o.product = flatFields(o.product);
    o.media = o.product.media.split("|")[0];
    o.profileitems = flatFields(o.profileitems);
    let price = parseInt(o.product.price, 10);
    let itemPrice = 0;
    itemPrice = o.profileitems.reduce(
      (p, a) => (a && a?.price ? (p += parseInt(a.price, 10)) : (p += 0)),
      0
    );
    o.price = itemPrice + price;
    let ul = {
      ...o.fields.fields,
      product: o.product,
      media: o.media,
      profileitems: o.profileitems,
      price: o.price,
    };
    return ul;
  });
  return { ...temp, user, orderItems };
};

export const getOrders = (token) => async (dispatch) => {
  const userId = parseInt(JSON.parse(localStorage.getItem("Bear-user")).pk);
  try {
    let res = await request.get(`api/v1/order`, {
      headers: { Authorization: `Bear ${token}` },
    });

    if (res?.data && res.data)
      res.data.data = res.data.data.map((x) => tidyOrder(x));
    dispatch({
      type: GET_ORDERS,
      payload: res.data.data.filter(
        (item) => parseInt(item.user.id) === userId
      ),
    });
  } catch (e) {
    const errors = {
      msg: e?.response?.data?.msg,
      status: e?.response?.data?.code,
    };
    dispatch(getErrors(errors));
    return false;
  }
};

export const getOrder = (order_id) => ({
  type: GET_ORDER,
  payload: order_id,
});
