import {
    INCREASE,
    DECREASE,
    REMOVE,
    GET_CART,
    ADD_CART,
    SHOW_CART,
    CHECK_OUT,
} from "../actions";

const initialState = {
    cart: [],
    showCart: false,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CART:
            return state;

        case SHOW_CART:
            return {
                ...state,
                showCart: payload,
            };

        case CHECK_OUT:
            return {
                ...state,
                cart: [],
            };

        case ADD_CART:
            let typeCart = 0;
            state.cart.find((item) =>
                item.sku === payload.sku ? (typeCart = 1) : (typeCart = 0)
            );
            if (typeCart === 1) {
                let tempCart = state.cart.map((item) =>
                    item.sku === payload.sku
                        ? {
                            ...item,
                            amount: parseInt(item.amount) + parseInt(payload.amount),
                        }
                        : { ...item }
                );
                console.log("this is from old reducer", tempCart);
                return { ...state, cart: tempCart, showCart: true };
            } else {
                console.log("this is from new reducer", payload);

                return { ...state, cart: [...state.cart, payload], showCart: true };
            }

        case REMOVE:
            return {
                ...state,
                cart: state.cart.filter((item) => item.sku !== payload.sku),
            };

        case DECREASE:
            let tempCart = [];
            if (payload.amount === 1) {
                tempCart = state.cart.filter((item) => item.sku !== payload.sku);
            } else {
                tempCart = state.cart.map((item) =>
                    item.sku === payload.sku
                        ? { ...item, amount: parseInt(item.amount) - 1 }
                        : { ...item }
                );
            }

            return { ...state, cart: tempCart };

        case INCREASE:
            let tempCart1 = state.cart.map((item) =>
                item.sku === payload.sku
                    ? { ...item, amount: parseInt(item.amount) + 1 }
                    : { ...item }
            );
            return { ...state, cart: tempCart1 };
        default:
            return state;
    }
}
