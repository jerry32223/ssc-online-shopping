import { GET_ERRORS } from "../actions";

export const getErrors = (errors) => {
  // console.log(errors);

  return { type: GET_ERRORS, payload: errors };
};
