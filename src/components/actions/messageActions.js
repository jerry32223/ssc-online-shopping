import { GET_MESSAGES, CREATE_MESSAGE } from "../actions";

export const getMessage = (msg) => {
  return {
    type: GET_MESSAGES,
    payload: msg,
  };
};

export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};
