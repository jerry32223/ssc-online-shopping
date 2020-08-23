import { GET_ERRORS } from "../actions";

const initialState = {
    msg: {},
    status: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            // console.log("got errors");

            return {
                msg: action.payload.msg,
                status: action.payload.status,
            };

        default:
            return state;
    }
}
