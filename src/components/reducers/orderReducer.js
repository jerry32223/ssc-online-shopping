import { GET_ORDER, GET_ORDERS } from "../actions";

const initialState = {
  orders: [],
  order: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: payload,
      };
    case GET_ORDER:
      return {
        ...state,
        order: state.orders.filter(
          (item) => parseInt(item.id) === parseInt(payload)
        )[0],
      };
    default:
      return state;
  }
}
